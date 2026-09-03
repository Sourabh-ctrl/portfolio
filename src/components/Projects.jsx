import data from '../data.js'
import { sound } from '../utils/sound.js'
import FadeInSection from './FadeInSection.jsx'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import techIcons from '../techIcons.jsx'

function Projects() {
  const { projects } = data
  return (
    <section className="pt-12 pb-10 scroll-mt-20" id="projects">
      <FadeInSection>
        {({ visible }) => (
          <>
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
              {projects.map((project, i) => (
                <article
                  key={project.name}
                  style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
                  className={`group relative flex flex-col rounded-3xl border border-lightest-navy/60 bg-light-navy/60 p-5 transition-all duration-350 hover:border-accent/60 hover:shadow-soft backdrop-blur-xs ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl bg-navy border border-lightest-navy/50">
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
                          <FaGithub className="size-3.5" />
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
                        className="tech-tag flex items-center gap-1.5 rounded-xl bg-accent/10 text-accent px-2.5 py-1.5 text-xs font-mono font-medium border border-accent/20"
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
          </>
        )}
      </FadeInSection>
    </section>
  )
}

export default Projects
