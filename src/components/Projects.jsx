import data from '../data.js'
import { sound } from '../utils/sound.js'
import FadeInSection from './FadeInSection.jsx'
import { ExternalLink } from 'lucide-react'
import techIcons from '../techIcons.jsx'

function GitHubIcon({ className = 'size-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  )
}

function Projects() {
  const { projects } = data
  return (
    <section className="pt-16 pb-12 scroll-mt-20" id="projects">
      <FadeInSection>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-heading flex items-center gap-2">
            <span className="text-accent font-sans mr-0.5">/</span>
            <span>Projects I've Built</span>
          </h2>
          <p className="text-sm font-sans text-slate mt-1">
            Real-world full-stack web applications and platforms
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group relative flex flex-col rounded-2xl border border-lightest-navy/60 bg-light-navy/60 p-4 transition-all duration-300 hover:border-accent/60 hover:shadow-xl backdrop-blur-xs"
            >
              <div className="relative aspect-16/9 w-full overflow-hidden rounded-xl bg-navy border border-lightest-navy/50">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <h3 className="text-lg font-serif font-semibold text-heading tracking-tight group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => sound.playClick()}
                      className="size-7 rounded-md flex items-center justify-center text-slate hover:text-accent hover:bg-lightest-navy/50 transition-colors"
                      title="View Source Code"
                      aria-label={`${project.name} repository`}
                    >
                      <GitHubIcon />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => sound.playClick()}
                      className="size-7 rounded-md flex items-center justify-center text-slate hover:text-accent hover:bg-lightest-navy/50 transition-colors"
                      title="Open Live Preview"
                      aria-label={`${project.name} live`}
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="mt-2 text-sm font-sans text-slate leading-relaxed line-clamp-3 flex-1">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-lightest-navy/50">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="tech-tag flex items-center gap-1.5 rounded-md bg-accent/10 text-accent px-2 py-1 text-xs font-mono font-medium border border-accent/20"
                  >
                    {techIcons[t] || (
                      <span className="inline-block h-2 w-2 rounded-full bg-slate" />
                    )}
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </FadeInSection>
    </section>
  )
}

export default Projects
