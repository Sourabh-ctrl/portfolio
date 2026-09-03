import { useState } from 'react'
import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'
import Marquee from './Marquee.jsx'

function Testimonials() {
  const { testimonials } = data
  const [hoveredName, setHoveredName] = useState(null)

  return (
    <section id="testimonials" className="pt-12 pb-10 scroll-mt-20">
      <FadeInSection>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-heading flex items-center gap-2">
            <span className="text-accent font-sans mr-0.5">/</span>
            <span>What People Say</span>
          </h2>
        <p className="text-sm font-sans text-slate mt-1">
          What colleagues and collaborators say about working with me
        </p>
      </div>

      <Marquee paused={hoveredName !== null}>
        {testimonials.map((t) => (
          <article
            key={t.name}
            onMouseEnter={() => setHoveredName(t.name)}
            onMouseLeave={() => setHoveredName(null)}
            onFocus={() => setHoveredName(t.name)}
            onBlur={() => setHoveredName(null)}
            className="group flex w-[280px] sm:w-[340px] shrink-0 flex-col rounded-3xl border border-lightest-navy/60 bg-light-navy/60 p-5 transition-all duration-350 hover:border-accent/60 hover:shadow-soft"
          >
              <div className="flex items-start gap-2.5">
                <span className="font-serif text-4xl leading-none text-accent select-none" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="text-sm font-sans text-lightest-slate leading-relaxed flex-1">
                  {t.quote}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-lightest-navy/50">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  loading="lazy"
                  className="size-11 rounded-full object-cover ring-2 ring-lightest-navy group-hover:ring-accent/70 transition-all duration-350"
                />
                <p className="min-w-0 text-sm font-semibold text-heading truncate">{t.name}</p>
              </div>
            </article>
          ))}
        </Marquee>
      </FadeInSection>
    </section>
  )
}

export default Testimonials
