import { useEffect, useRef, useState } from 'react'

function CursorGlow() {
  const glowRef = useRef(null)
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setEnabled(!mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    const node = glowRef.current
    if (!node) return undefined
    let raf = 0

    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        node.style.opacity = '1'
        node.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 150}px, 0)`
      })
    }
    const onLeave = () => {
      node.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[60] h-[320px] w-[320px] rounded-full opacity-0 transition-opacity duration-300 motion-reduce:transition-none"
    />
  )
}

export default CursorGlow
