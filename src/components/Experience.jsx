import { useState } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'
import data from '../data.js'
import Reveal from './Reveal.jsx'
import techIcons from '../techIcons.jsx'

function Experience() {
  const { jobs } = data
  const [expanded, setExpanded] = useState(0)

  const toggle = (index) => {
    setExpanded((current) => (current === index ? -1 : index))
  }

  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-border px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[minmax(240px,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
        <aside className="h-fit min-w-0 lg:sticky lg:top-28">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              the log / 2025—2026
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-5 font-serif text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
              where i&apos;ve
              <br />
              <em className="font-normal italic text-muted-foreground">been.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Three teams, a lot of production traffic, and an unhealthy appetite for system
              design.
            </p>
          </Reveal>
        </aside>

        <ol className="relative ml-1 min-w-0 border-l border-border pl-6 sm:pl-10">
          {jobs.map((job, index) => {
            const isOpen = expanded === index
            return (
              <Reveal
                key={`${job.org}-${job.period}`}
                delay={index * 70}
                as="li"
                className="pb-12 last:pb-0"
              >
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[1.5rem] top-2 size-2.5 -translate-x-1/2 rounded-full border transition-colors duration-300 sm:-left-[2.5rem] ${
                      isOpen
                        ? 'border-accent bg-accent'
                        : 'border-border-strong bg-background'
                    }`}
                  />

                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-serif text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight">
                      {job.role}
                    </h3>
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span>at</span>
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="link-underline text-foreground"
                      >
                        {job.org}
                      </a>
                    ) : (
                      <span className="text-foreground">{job.org}</span>
                    )}
                    {job.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" />
                        {job.location}
                      </span>
                    )}
                    {job.mode && <span className="text-muted-foreground/80">{job.mode}</span>}
                  </p>

                  {job.summary && (
                    <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
                      {job.summary}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`job-detail-${index}`}
                    className="mt-3 inline-flex min-h-[2.25rem] items-center gap-1.5 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    {isOpen ? 'hide the detail' : 'read the detail'}
                    <ChevronDown
                      className={`size-3.5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    id={`job-detail-${index}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="mt-4 space-y-2.5 border-l border-border pl-4 text-[0.92rem] leading-relaxed text-muted-foreground">
                        {job.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-border-strong"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {job.tech?.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-1.5">
                          {job.tech.map((tech) => (
                            <li
                              key={tech}
                              className="flex items-center gap-1.5 border border-border px-2.5 py-1 text-[0.72rem] text-muted-foreground"
                            >
                              {techIcons[tech]}
                              {tech}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Experience
