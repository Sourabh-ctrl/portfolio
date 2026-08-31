import { useEffect, useRef, useState } from 'react'

function calculateSize(width) {
  if (width <= 480) return Math.min(260, width - 40)
  if (width <= 768) return Math.min(320, width - 60)
  return 380
}

function CyberSphere() {
  const canvasRef = useRef(null)
  const [size, setSize] = useState(() => calculateSize(typeof window !== 'undefined' ? window.innerWidth : 400))
  const stateRef = useRef({
    rotX: 0.3,
    rotY: 0.4,
    targetRotX: 0.3,
    targetRotY: 0.4,
    mouseX: -1000,
    mouseY: -1000,
    isHovered: false,
    nodes: [],
    ringAngle: 0,
  })

  // Resize listener
  useEffect(() => {
    const handleResize = () => setSize(calculateSize(window.innerWidth))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Initialize nodes on a 3D sphere using Fibonacci sphere distribution
  useEffect(() => {
    const numNodes = 140
    const nodes = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden ratio angle

    for (let i = 0; i < numNodes; i++) {
      const y = 1 - (i / (numNodes - 1)) * 2 // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y) // Radius at y
      const theta = phi * i

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      nodes.push({
        origX: x,
        origY: y,
        origZ: z,
        x,
        y,
        z,
        baseSize: Math.random() > 0.85 ? 3 : Math.random() > 0.6 ? 2.2 : 1.5,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 1 + Math.random() * 2,
      })
    }

    stateRef.current.nodes = nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const sphereRadius = size * 0.35
    const fov = 340 // Field of view for 3D perspective projection

    const render = () => {
      animationFrameId = requestAnimationFrame(render)
      ctx.clearRect(0, 0, size, size)

      const state = stateRef.current
      const now = performance.now() / 1000

      // Natural continuous rotation + smooth easing towards mouse influence
      if (!state.isHovered) {
        state.targetRotY += 0.004
        state.targetRotX = 0.25 + Math.sin(now * 0.8) * 0.1
      }

      state.rotX += (state.targetRotX - state.rotX) * 0.08
      state.rotY += (state.targetRotY - state.rotY) * 0.08
      state.ringAngle += 0.01

      const cosX = Math.cos(state.rotX)
      const sinX = Math.sin(state.rotX)
      const cosY = Math.cos(state.rotY)
      const sinY = Math.sin(state.rotY)

      const cx = size / 2
      const cy = size / 2

      // Projected node storage
      const projectedNodes = []

      // 3D rotation & perspective projection
      for (let i = 0; i < state.nodes.length; i++) {
        const node = state.nodes[i]

        // Subtle organic pulsating dispersion
        const disperse = 1 + Math.sin(now * node.pulseSpeed + node.phase) * 0.05
        const rx = node.origX * sphereRadius * disperse
        const ry = node.origY * sphereRadius * disperse
        const rz = node.origZ * sphereRadius * disperse

        // Rotate Y
        const x1 = rx * cosY + rz * sinY
        const z1 = -rx * sinY + rz * cosY

        // Rotate X
        const y2 = ry * cosX - z1 * sinX
        const z2 = ry * sinX + z1 * cosX

        // 3D Perspective Projection
        const scale = fov / (fov + z2)
        const projX = cx + x1 * scale
        const projY = cy + y2 * scale

        // Interactive mouse dispersion
        let offsetX = 0
        let offsetY = 0
        if (state.isHovered) {
          const dx = projX - state.mouseX
          const dy = projY - state.mouseY
          const dist = Math.hypot(dx, dy)
          const maxRepel = 70
          if (dist < maxRepel && dist > 0) {
            const force = ((maxRepel - dist) / maxRepel) * 18
            offsetX = (dx / dist) * force
            offsetY = (dy / dist) * force
          }
        }

        // Alpha calculation based on depth (z2)
        const alpha = Math.max(0.12, Math.min(1, ((z2 + sphereRadius) / (sphereRadius * 2)) * 0.85 + 0.15))

        projectedNodes.push({
          px: projX + offsetX,
          py: projY + offsetY,
          pz: z2,
          scale,
          alpha,
          baseSize: node.baseSize,
        })
      }

      // Sort by depth (painters algorithm)
      projectedNodes.sort((a, b) => a.pz - b.pz)

      // Draw connecting lines between adjacent nodes
      const maxConnectDist = size * 0.14
      ctx.lineWidth = 0.8
      for (let i = 0; i < projectedNodes.length; i++) {
        const p1 = projectedNodes[i]
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p2 = projectedNodes[j]
          const dx = p1.px - p2.px
          const dy = p1.py - p2.py
          const dist = Math.hypot(dx, dy)

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * Math.min(p1.alpha, p2.alpha) * 0.38
            ctx.strokeStyle = `rgba(100, 255, 218, ${lineAlpha})`
            ctx.beginPath()
            ctx.moveTo(p1.px, p1.py)
            ctx.lineTo(p2.px, p2.py)
            ctx.stroke()
          }
        }
      }

      // Draw planetary / cyber orbital rings
      const drawOrbitalRing = (radiusX, radiusY, tilt, rotationAngle, alpha) => {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(tilt)
        ctx.beginPath()
        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const x = Math.cos(a + rotationAngle) * radiusX
          const y = Math.sin(a + rotationAngle) * radiusY
          if (a === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.strokeStyle = `rgba(100, 255, 218, ${alpha})`
        ctx.setLineDash([4, 12])
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.restore()
      }

      drawOrbitalRing(sphereRadius * 1.35, sphereRadius * 0.45, state.rotX * 0.6, state.ringAngle, 0.28)
      drawOrbitalRing(sphereRadius * 1.5, sphereRadius * 0.35, -state.rotX * 0.8 + 0.8, -state.ringAngle * 0.7, 0.2)

      // Draw nodes (glowing cyber vertices)
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i]
        const radius = p.baseSize * p.scale

        ctx.beginPath()
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2)

        // Give key nodes an emerald radial glow
        if (p.baseSize > 2 && p.pz > 0) {
          ctx.fillStyle = `rgba(100, 255, 218, ${p.alpha})`
          ctx.shadowBlur = 10
          ctx.shadowColor = 'rgba(100, 255, 218, 0.8)'
          ctx.fill()
          ctx.shadowBlur = 0 // reset
        } else {
          ctx.fillStyle = `rgba(100, 255, 218, ${p.alpha * 0.8})`
          ctx.fill()
        }
      }

      // Central core pulse glow
      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sphereRadius * 0.9)
      coreGlow.addColorStop(0, 'rgba(100, 255, 218, 0.12)')
      coreGlow.addColorStop(0.5, 'rgba(100, 255, 218, 0.04)')
      coreGlow.addColorStop(1, 'rgba(10, 25, 47, 0)')
      ctx.fillStyle = coreGlow
      ctx.beginPath()
      ctx.arc(cx, cy, sphereRadius, 0, Math.PI * 2)
      ctx.fill()
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [size])

  // Mouse interaction handlers
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const normX = (x / size - 0.5) * 2
    const normY = (y / size - 0.5) * 2

    const state = stateRef.current
    state.mouseX = x
    state.mouseY = y
    state.isHovered = true
    state.targetRotY = normX * 1.8
    state.targetRotX = -normY * 1.4
  }

  const handleMouseLeave = () => {
    const state = stateRef.current
    state.isHovered = false
    state.mouseX = -1000
    state.mouseY = -1000
    state.targetRotX = 0.3
  }

  const handleTouchMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas || !e.touches[0]) return
    const rect = canvas.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const y = e.touches[0].clientY - rect.top

    const normX = (x / size - 0.5) * 2
    const normY = (y / size - 0.5) * 2

    const state = stateRef.current
    state.mouseX = x
    state.mouseY = y
    state.isHovered = true
    state.targetRotY = normX * 1.8
    state.targetRotX = -normY * 1.4
  }

  return (
    <div
      className="relative flex items-center justify-center group"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Subtle background ambient pulse */}
      <div
        className="absolute inset-0 rounded-full bg-green/5 blur-3xl transition-opacity duration-700 pointer-events-none group-hover:bg-green/10"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: 'grab',
          touchAction: 'none',
        }}
        className="active:cursor-grabbing"
        aria-label="Interactive 3D cyber particle mesh sphere"
        role="img"
      />
    </div>
  )
}

export default CyberSphere
