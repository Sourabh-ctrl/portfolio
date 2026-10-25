import { useState } from 'react'
import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'
import Marquee from './Marquee.jsx'

function TestimonialAvatar({ name, src }) {
  const [failed, setFailed] = useState(false)
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted font-mono text-[0.7rem] uppercase tracking-wide text-muted-foreground transition-colors duration-300 group-hover:border-foreground/40">
      <span aria-hidden="true">{initials}</span>
      {src && !failed && (
        <img
          src={src}
          alt={`Placeholder illustration for ${name}`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </span>
  )
}

/*
 * Restored from the earlier build: a paused-on-hover marquee of quote cards.
 * Only the surface changed for the paper theme; the layout, spacing, quote
 * mark and pause-on-hover/focus behaviour are the originals.
 */
function Testimonials() {
  const { testimonials } = data
  const [hoveredName, setHoveredName] = useState(null)

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 border-t border-border px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <FadeInSection>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                the unsolicited reviews
              </p>
              <h2 className="mt-4 flex items-center gap-2 font-serif text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
                <span className="mr-0.5 font-sans text-accent">/</span>
                What People Say
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Colleagues and collaborators, on what it was like to work together.
            </p>
          </div>
        </FadeInSection>
      </div>

      <FadeInSection>
        <Marquee paused={hoveredName !== null}>
          {testimonials.map((t) => (
            <article
              key={t.name}
              tabIndex={0}
              aria-label={`Quote from ${t.name}`}
              onMouseEnter={() => setHoveredName(t.name)}
              onMouseLeave={() => setHoveredName(null)}
              onFocus={() => setHoveredName(t.name)}
              onBlur={() => setHoveredName(null)}
              className="group flex w-[280px] shrink-0 flex-col rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:border-foreground/50 hover:shadow-[var(--shadow-card)] sm:w-[340px]"
            >
              <div className="flex items-start gap-2.5">
                <span
                  className="select-none font-serif text-4xl leading-none text-foreground/35"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="flex-1 text-sm leading-relaxed text-foreground/85">{t.quote}</p>
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <TestimonialAvatar name={t.name} src={t.avatarUrl} />
                <p className="min-w-0 truncate text-sm font-semibold text-foreground">{t.name}</p>
              </div>
            </article>
          ))}
        </Marquee>
      </FadeInSection>
    </section>
  )
}

export default Testimonials
