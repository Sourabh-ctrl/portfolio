import { useState } from 'react'
import data from '../data.js'
import { sound } from '../utils/sound.js'
import FadeInSection from './FadeInSection.jsx'
import { MapPin } from 'lucide-react'
import techIcons from '../techIcons.jsx'

function Experience() {
  const { jobs } = data
  const [expandedIndex, setExpandedIndex] = useState(0)

  const toggleJob = (index) => {
    sound.playClick()
    setExpandedIndex((prev) => (prev === index ? -1 : index))
  }

  return (
    <section className="pt-12 pb-10 scroll-mt-20" id="experience">
      <FadeInSection>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-heading flex items-center gap-2">
            <span className="text-accent font-sans mr-0.5">/</span>
            <span>Experience</span>
          </h2>
          <p className="text-sm font-sans text-slate mt-1">
            Roles and teams I've worked with
          </p>
        </div>

        <div>
          {jobs.map((job, idx) => {
            const isExpanded = expandedIndex === idx
            const isLast = idx === jobs.length - 1

            return (
              <div key={`${job.org}-${job.period}`} className="group relative w-full">
                <div className="flex w-full min-w-0 gap-3">
                  {/* Timeline dot + line */}
                  <div className="relative flex flex-col items-center pt-2.5">
                    <div
                      className={`z-10 h-2 w-2 rounded-full transition-colors duration-300 ${
                        isExpanded
                          ? 'bg-accent'
                          : 'border-[1.5px] border-lightest-navy bg-navy'
                      }`}
                    />
                    {!isLast && (
                      <div className="mt-1 w-px flex-1 bg-lightest-navy/60" />
                    )}
                  </div>

                  {/* Job card */}
                  <div
                    data-sound="open"
                    onClick={() => toggleJob(idx)}
                    className={`mb-2 w-full min-w-0 flex-1 cursor-pointer rounded-xl px-4 py-3.5 transition-all duration-350 ${
                      isExpanded
                        ? 'bg-light-navy/60 ring-1 ring-lightest-navy shadow-soft'
                        : 'hover:bg-light-navy/40'
                    }`}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        {job.logoUrl ? (
                          <img
                            src={job.logoUrl}
                            alt={job.org}
                            width="20"
                            height="20"
                            className="h-5 w-5 shrink-0 rounded-sm"
                          />
                        ) : (
                          <div className="h-5 w-5 shrink-0 rounded-sm bg-lightest-navy/60 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-accent">
                              {job.org.charAt(0)}
                            </span>
                          </div>
                        )}

                        <h3 className="truncate text-[13.5px] font-semibold text-heading">
                          {job.role}
                        </h3>

                        <span className="hidden text-lightest-navy sm:inline">&middot;</span>

                        {job.url ? (
                          <p className="hidden truncate text-[13px] text-slate sm:block">
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="underline decoration-dotted underline-offset-2 hover:text-accent transition-colors"
                            >
                              {job.org}
                            </a>
                          </p>
                        ) : (
                          <p className="hidden truncate text-[13px] text-slate sm:block">
                            {job.org}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className="text-[11.5px] text-slate tabular-nums whitespace-nowrap">
                          {job.period}
                        </span>
                        <svg
                          className={`h-3 w-3 text-slate transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        >
                          <path d="M3 4.5 L6 7.5 L9 4.5" />
                        </svg>
                      </div>
                    </div>

                    {/* Mobile company name */}
                    {job.url ? (
                      <p className="mt-0.5 truncate text-[12.5px] text-slate sm:hidden">
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="underline decoration-dotted underline-offset-2 hover:text-accent transition-colors"
                        >
                          {job.org}
                        </a>
                      </p>
                    ) : (
                      <p className="mt-0.5 truncate text-[12.5px] text-slate sm:hidden">
                        {job.org}
                      </p>
                    )}

                    {/* Expanded content */}
                    <div
                      className={`w-full max-w-full overflow-hidden transition-all duration-400 ease-in-out ${
                        isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {/* Location & Mode */}
                      {(job.location || job.mode) && (
                        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11.5px] text-slate">
                          {job.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="size-2.5" />
                              {job.location}
                            </span>
                          )}
                          {job.mode && (
                            <span className="rounded-full px-2 py-0.5 text-[11px] font-medium bg-accent/10 text-accent border border-accent/20">
                              {job.mode}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Summary */}
                      {job.summary && (
                        <p className="mt-2.5 text-[12.5px] text-light-slate leading-relaxed">
                          {job.summary}
                        </p>
                      )}

                      {/* Highlights */}
                      <ul className="mt-2.5 list-disc space-y-1.5 pl-4 text-[12.5px] leading-relaxed wrap-break-word text-light-slate">
                        {job.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>

                      {/* Tech tags with icons */}
                      {job.tech && job.tech.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {job.tech.map((tech) => (
                            <span
                              key={tech}
                              className="flex items-center gap-1.5 rounded-lg border border-lightest-navy/80 bg-navy px-2.5 py-1.5 text-[11px] font-medium text-light-slate"
                            >
                              {techIcons[tech] || (
                                <span className="inline-block h-2 w-2 rounded-full bg-slate" />
                              )}
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </FadeInSection>
    </section>
  )
}

export default Experience
