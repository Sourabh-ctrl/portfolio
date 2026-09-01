import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function HorizontalScroll({ children, className = '' }) {
  const trackRef = useRef(null)

  const scrollByAmount = (dir) => {
    const track = trackRef.current
    if (!track) return
    const amount = Math.round(track.clientWidth * 0.7) || 300
    track.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const handleMouseDown = (e) => {
    const track = trackRef.current
    if (!track) return
    e.preventDefault()
    const startX = e.pageX
    const startLeft = track.scrollLeft

    const onMove = (ev) => {
      const dx = ev.pageX - startX
      track.scrollLeft = startLeft - dx
    }

    const up = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', up)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', up)
  }

  return (
    <div className="relative group">
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        className={`flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-3 select-none ${className}`}
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scrollByAmount(-1)}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 size-9 rounded-full bg-navy border border-lightest-navy/60 text-slate hover:text-accent hover:border-accent/60 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        type="button"
        onClick={() => scrollByAmount(1)}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 size-9 rounded-full bg-navy border border-lightest-navy/60 text-slate hover:text-accent hover:border-accent/60 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}

export default HorizontalScroll
