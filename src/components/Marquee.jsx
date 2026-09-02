import { useEffect, useRef, useState } from 'react'

function Marquee({ children, speed = 35, paused = false }) {
  const trackRef = useRef(null)
  const [duration, setDuration] = useState(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const half = track.scrollWidth / 2
      if (half > 0) setDuration(half / speed)
    }

    const raf = requestAnimationFrame(measure)
    window.addEventListener('resize', measure)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
    }
  }, [speed])

  return (
    <div className="marquee-edge-fade overflow-hidden py-3">
      <div
        ref={trackRef}
        className={`marquee-track flex w-max ${paused ? '[animation-play-state:paused]' : ''} motion-reduce:[animation-play-state:paused]`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        <div className="flex gap-5 pr-5">{children}</div>
        <div className="flex gap-5">{children}</div>
      </div>
    </div>
  )
}

export default Marquee