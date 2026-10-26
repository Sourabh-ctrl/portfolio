import { useMemo, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import data from '../data.js'
import Button from './ui/Button.jsx'
import Reveal from './Reveal.jsx'

function Work() {
  const { projects, github } = data
  const [filter, setFilter] = useState('All')

  const filters = useMemo(() => {
    const tags = new Set()
    projects.forEach((project) => (project.tags || []).forEach((tag) => tags.add(tag)))
    return ['All', ...Array.from(tags)]
  }, [projects])

  const visible =
    filter === 'All' ? projects : projects.filter((project) => (project.tags || []).includes(filter))

  return (
    <section
      id="work"
      className="relative min-h-screen scroll-mt-20 border-t border-foreground px-5 pb-24 pt-28 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 select-none overflow-hidden"
      >
        <p className="-translate-y-[38%] whitespace-nowrap text-[26vw] font-semibold leading-none tracking-tight text-muted">
          WORKS
        </p>
      </div>

      <div className="relative mx-auto grid max-w-[1500px] gap-16 pt-[18vw] lg:grid-cols-[minmax(280px,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
        <aside className="h-fit min-w-0 lg:sticky lg:top-28">
          <Reveal>
            <p className="text-sm text-muted-foreground">selected work / 2024—now</p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-4 max-w-md font-serif text-[clamp(2.6rem,6vw,3.75rem)] leading-none tracking-[-0.02em]">
              two things,
              <br />
              <em className="font-normal italic">chosen on purpose.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-sm text-muted-foreground">
              Two full-stack builds, shipped end to end and still shaped by the people who use them.
            </p>
          </Reveal>
          <Reveal delay={170}>
            <p className="mb-3 mt-10 text-sm">show me</p>
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <Button
                  key={item}
                  variant="filter"
                  data-active={filter === item}
                  onClick={() => setFilter(item)}
                  data-cursor={`filter: ${item.toLowerCase()}`}
                >
                  {item}
                </Button>
              ))}
            </div>
          </Reveal>
        </aside>

        <div className="grid min-w-0 gap-20">
          {visible.map((project, index) => {
            const number = projects.indexOf(project) + 1
            const hasLive = Boolean(project.liveUrl)
            const hasRepo = Boolean(project.repoUrl)
            const wide = project.imageWidth / project.imageHeight > 1.5

            const shot = (
              <img
                src={project.image}
                alt={`${project.name} — live site screenshot`}
                loading="lazy"
                width={project.imageWidth || 1440}
                height={project.imageHeight || 1080}
                className={`${
                  wide ? 'aspect-[16/10]' : 'aspect-[4/3]'
                } w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
              />
            )

            return (
              <Reveal key={project.name} delay={index * 90}>
                <article className="group">
                  {hasLive ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block overflow-hidden border border-border bg-muted"
                      data-cursor="see it live ↗"
                      aria-label={`Open ${project.name} live site`}
                    >
                      {shot}
                    </a>
                  ) : (
                    <div className="block overflow-hidden border border-border bg-muted">{shot}</div>
                  )}

                  <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-5">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {String(number).padStart(2, '0')} / {project.status} /{' '}
                        {project.tags.join(' · ')}
                      </p>
                      <h3 className="mt-1 font-serif text-[clamp(2rem,4vw,2.4rem)] leading-tight">
                        {project.name}
                      </h3>
                      <p className="mt-2 max-w-xl text-muted-foreground">{project.description}</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {hasRepo && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex size-10 items-center justify-center border border-foreground bg-background text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted"
                          aria-label={`${project.name} on GitHub`}
                          data-cursor="read the code ↗"
                        >
                          <FaGithub className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}

          {visible.length === 0 && (
            <p className="py-16 text-muted-foreground">
              Nothing on that shelf yet — try another filter.
            </p>
          )}

          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border pt-10">
              <p className="font-serif text-3xl">
                interested?{' '}
                <span className="text-muted-foreground">there&apos;s more.</span>
              </p>
              <a
                href={github.repositoriesUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2.5 text-sm transition-all duration-300 hover:bg-muted"
                data-cursor="careful, it's a deep one."
              >
                see all repositories
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Work
