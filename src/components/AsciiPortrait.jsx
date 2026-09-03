import { useRef, useEffect, useState, useCallback } from 'react'
import { imageToAsciiParticles, calculateAsciiSize } from '../utils/asciiPortrait.js'
import { useTheme } from '../contexts/ThemeContext.jsx'
import logo from '../assets/logo.jpeg'

const PORTRAIT_SRC = logo
const memoryCache = {}

function createParticles(rawParticles, isMobile) {
  const fontSize = isMobile ? 5 : 7
  return rawParticles.map((p) => ({
    x: p.x + (Math.random() - 0.5) * 400,
    y: p.y + (Math.random() - 0.5) * 400,
    targetX: p.x,
    targetY: p.y,
    vx: 0,
    vy: 0,
    char: p.char,
    fontSize,
    baseAlpha: p.alpha,
    currentAlpha: 0,
    delay: Math.random() * 0.4,
    shimmer: Math.random() * Math.PI * 2,
  }))
}

function AsciiPortrait({ onHoverStart, onHoverEnd }) {
  const { theme } = useTheme()
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const mouseTargetRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef([])
  const startTimeRef = useRef(null)
  const dataReadyRef = useRef(false)
  const themeRef = useRef(theme)
  const [size, setSize] = useState(() => calculateAsciiSize(window.innerWidth))

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const updateSize = () => setSize(calculateAsciiSize(window.innerWidth))
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    const isMobile = size <= 280

    if (memoryCache[size]) {
      particlesRef.current = createParticles(memoryCache[size], isMobile)
      dataReadyRef.current = true
      startTimeRef.current = performance.now()
      return
    }

    imageToAsciiParticles(PORTRAIT_SRC, size)
      .then((raw) => {
        if (!raw || !raw.length) {
          console.warn('AsciiPortrait: no particles generated from image')
          return
        }
        memoryCache[size] = raw
        particlesRef.current = createParticles(raw, isMobile)
        dataReadyRef.current = true
        startTimeRef.current = performance.now()
      })
      .catch((err) => {
        console.warn('AsciiPortrait failed to load:', err)
      })
  }, [size])

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    mouseTargetRef.current.x = e.clientX - rect.left
    mouseTargetRef.current.y = e.clientY - rect.top
    mouseRef.current.active = true
    onHoverStart?.()
  }, [onHoverStart])

  const handleTouchMove = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    mouseTargetRef.current.x = touch.clientX - rect.left
    mouseTargetRef.current.y = touch.clientY - rect.top
    mouseRef.current.active = true
    onHoverStart?.()
    if (e.cancelable) e.preventDefault()
  }, [onHoverStart])

  const handleLeave = useCallback(() => {
    mouseRef.current.active = false
    mouseTargetRef.current.x = -1000
    mouseTargetRef.current.y = -1000
    onHoverEnd?.()
  }, [onHoverEnd])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    let animationId

    const draw = () => {
      animationId = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, size, size)

      if (!dataReadyRef.current || !particlesRef.current.length) return

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const mouseTarget = mouseTargetRef.current
      const elapsed = (performance.now() - startTimeRef.current) / 1000

      mouse.x += (mouseTarget.x - mouse.x) * 0.15
      mouse.y += (mouseTarget.y - mouse.y) * 0.15

      const isMobile = size <= 280
      const isLight = themeRef.current === 'light'
      const fontSize = (isMobile ? 5 : 7) + (isLight ? 2 : 0)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const particleTime = elapsed - p.delay
        if (particleTime < 0) continue

        const fadeProgress = Math.min(particleTime / 1.5, 1)
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2)

        const isActive = mouse.active || particleTime < 3.0
        const shimmerVal = isActive ? Math.sin(elapsed * 2 + p.shimmer) * 0.1 : 0
        p.currentAlpha = Math.max(0, p.baseAlpha * easedFade + shimmerVal)

        const moveProgress = Math.min(particleTime / 2.5, 1)
        const easedMove = 1 - Math.pow(1 - moveProgress, 3)

        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = size * 0.2

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 4
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        const pullDx = p.targetX - p.x
        const pullDy = p.targetY - p.y
        const pullStrength = 0.01 + easedMove * 0.08
        p.vx += pullDx * pullStrength
        p.vy += pullDy * pullStrength

        if (isActive) {
          p.vx += Math.sin(elapsed * 0.5 + p.targetY * 0.1) * 0.15
          p.vy += Math.cos(elapsed * 0.5 + p.targetX * 0.1) * 0.15
          p.vx *= 0.92
          p.vy *= 0.92
        } else {
          p.vx *= 0.85
          p.vy *= 0.85
          if (particleTime > 4.0 && Math.abs(pullDx) < 0.01 && Math.abs(pullDy) < 0.01) {
            p.x = p.targetX
            p.y = p.targetY
            p.vx = 0
            p.vy = 0
          }
        }

        p.x += p.vx
        p.y += p.vy

        const dotColor = isLight ? '71,85,105' : '100,255,218'
        const drawAlpha = isLight ? Math.max(p.currentAlpha, 0.92) : p.currentAlpha
        ctx.fillStyle = `rgba(${dotColor}, ${drawAlpha})`
        ctx.fillText(p.char, p.x, p.y)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleLeave)

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleLeave)
    }
  }, [size, handleMouseMove, handleTouchMove, handleLeave])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'crosshair',
        touchAction: 'none',
      }}
    />
  )
}

export default AsciiPortrait
