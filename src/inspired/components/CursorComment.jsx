import { useEffect, useRef, useState } from 'react'

const TYPE_MS = 24
const TOUCH_LINGER_MS = 2600
const HIDE_MS = 140

/*
 * A cursor that talks back. Anything carrying `data-cursor="…"` gets a small
 * note that types itself out beside the pointer. Keyboard focus gets the same
 * note anchored to the focused element, and touch devices keep it in the
 * bottom-left corner long enough to read.
 */
function CursorComment() {
  const wrapRef = useRef(null)
  const bubbleRef = useRef(null)
  const pos = useRef({ x: -320, y: -320 })
  const target = useRef({ x: -320, y: -320 })
  const raf = useRef(0)
  const active = useRef(null)
  const hideTimer = useRef(0)
  const linger = useRef(0)
  const settle = useRef(0)

  const [bubble, setBubble] = useState({ text: '' })
  const [typed, setTyped] = useState('')
  const [visible, setVisible] = useState(false)
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  // Type the note out, one character at a time.
  useEffect(() => {
    const { text } = bubble
    if (!text) return undefined
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTyped(text.slice(0, index))
      if (index >= text.length) window.clearInterval(timer)
    }, TYPE_MS)
    return () => window.clearInterval(timer)
  }, [bubble])

  useEffect(() => {
    const tick = () => {
      const p = pos.current
      const t = target.current
      p.x += (t.x - p.x) * 0.28
      p.y += (t.y - p.y) * 0.28

      const wrap = wrapRef.current
      const note = bubbleRef.current
      if (wrap) {
        const w = note?.offsetWidth ?? 0
        const h = note?.offsetHeight ?? 0
        const flipX = p.x + 18 + w > window.innerWidth - 8
        const flipY = p.y + 20 + h > window.innerHeight - 8
        const x = flipX ? p.x - 18 - w : p.x + 18
        const y = flipY ? p.y - 20 - h : p.y + 20
        const clampedX = Math.min(Math.max(8, x), Math.max(8, window.innerWidth - w - 8))
        const clampedY = Math.min(Math.max(8, y), Math.max(8, window.innerHeight - h - 8))
        wrap.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`
        if (note) {
          const radii = ['14px', '14px', '14px', '14px']
          radii[flipY ? (flipX ? 2 : 3) : flipX ? 1 : 0] = '2px'
          note.style.borderRadius = radii.join(' ')
        }
      }

      const gap = Math.abs(t.x - p.x) + Math.abs(t.y - p.y)
      const settling = settle.current > 0
      if (settling) settle.current -= 1
      raf.current = gap > 0.4 || settling ? requestAnimationFrame(tick) : 0
    }

    const ensureTick = () => {
      if (!raf.current) raf.current = requestAnimationFrame(tick)
    }

    const show = (node, x, y, { jump = false } = {}) => {
      const text = node?.getAttribute('data-cursor')
      if (!text) return
      window.clearTimeout(hideTimer.current)
      window.clearTimeout(linger.current)
      active.current = node
      setTyped('')
      setBubble({ text })
      setVisible(true)

      target.current = { x, y }
      if (jump) pos.current = { x, y }
      settle.current = 6
      ensureTick()

      if (coarse) {
        linger.current = window.setTimeout(() => {
          active.current = null
          setVisible(false)
        }, TOUCH_LINGER_MS)
      }
    }

    const scheduleHide = (delay = HIDE_MS) => {
      window.clearTimeout(hideTimer.current)
      hideTimer.current = window.setTimeout(() => {
        active.current = null
        setVisible(false)
      }, delay)
    }

    const hideNow = () => {
      window.clearTimeout(hideTimer.current)
      window.clearTimeout(linger.current)
      active.current = null
      setVisible(false)
    }

    const onOver = (event) => {
      const node = event.target instanceof Element ? event.target.closest('[data-cursor]') : null
      if (!node || node === active.current) return
      show(node, event.clientX, event.clientY)
    }

    const onOut = (event) => {
      if (coarse) return
      const node = active.current
      if (!node) return
      if (event.relatedTarget instanceof Element && node.contains(event.relatedTarget)) return
      scheduleHide()
    }

    const onFocusIn = (event) => {
      const node =
        event.target instanceof Element ? event.target.closest('[data-cursor]') : null
      if (!node || node === active.current) return
      const rect = node.getBoundingClientRect()
      const x = Math.min(window.innerWidth - 24, Math.max(24, rect.right))
      const y = Math.min(window.innerHeight - 24, Math.max(24, rect.bottom))
      show(node, x, y, { jump: true })
    }

    const onFocusOut = (event) => {
      if (event.relatedTarget instanceof Element && event.relatedTarget.closest('[data-cursor]')) {
        return
      }
      scheduleHide(80)
    }

    const onMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY }
      ensureTick()
    }

    // The note grows as it types, so re-place it whenever its width changes.
    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(ensureTick)
    if (resizeObserver && bubbleRef.current) resizeObserver.observe(bubbleRef.current)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    window.addEventListener('blur', hideNow)
    window.addEventListener('scroll', hideNow, { passive: true })
    document.documentElement.addEventListener('mouseleave', hideNow)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
      window.removeEventListener('blur', hideNow)
      window.removeEventListener('scroll', hideNow)
      document.documentElement.removeEventListener('mouseleave', hideNow)
      cancelAnimationFrame(raf.current)
      window.clearTimeout(hideTimer.current)
      window.clearTimeout(linger.current)
    }
  }, [coarse])

  if (coarse) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed bottom-5 left-4 z-[80] transition-[opacity,transform] duration-300 ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-90 opacity-0'
        }`}
      >
        <div className="rounded-[16px_16px_16px_2px] border border-border bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
          {typed || ' '}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80]"
    >
      <div
        ref={bubbleRef}
        className={`max-w-[16rem] whitespace-pre-line rounded-[14px_14px_14px_2px] border border-border bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg transition-[opacity,scale] duration-300 ${
          visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        {typed || ' '}
      </div>
    </div>
  )
}

export default CursorComment
