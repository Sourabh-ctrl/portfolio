// Handwritten margin notes — the reference site's scribbled annotations.
export function Scribble({ children, rotate = -8, className = '' }) {
  return (
    <p
      className={`font-hand text-[1.05rem] leading-[1.3] tracking-[0.06em] text-foreground/70 ${className}`.trim()}
      style={{ rotate: `${rotate}deg` }}
    >
      {children}
    </p>
  )
}

// A small hand-drawn arrow. `d` is the stroke; `head` is the arrowhead.
export function ScribbleArrow({ d, head, className = '', style }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 60"
      className={`absolute h-10 w-10 overflow-visible text-foreground/60 ${className}`.trim()}
      style={style}
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d={head}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Scribble
