import { useRef, useState, useEffect } from 'react'

function Magnetic({ children, strength = 0.25, className = '' }) {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setEnabled(!mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node || !enabled) return undefined
    let raf = 0

    const onMove = (e) => {
      const rect = node.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setTranslate({ x: x * strength, y: y * strength })
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      setTranslate({ x: 0, y: 0 })
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, strength])

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform motion-reduce:transform-none ${className}`}
      style={{
        transform: enabled ? `translate(${translate.x}px, ${translate.y}px)` : undefined,
        transition: 'transform 0.15s ease-out',
      }}
    >
      {children}
    </span>
  )
}

export default Magnetic
