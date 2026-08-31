import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'

function Projects() {
  const { projects } = data
  return (
    <section className="max-w-[70rem] mx-auto px-5 py-16 md:py-24" id="projects">
      <FadeInSection>
        <h2 className="flex items-center gap-4 text-white text-[clamp(1.4rem,3vw,2rem)] mb-10 whitespace-nowrap font-serif after:content-[''] after:block after:h-px after:flex-1 after:bg-lightest-navy/60">
          <span className="text-green font-sans mr-0.5">/</span>
          <span>projects</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-7">
          {projects.map((project) => (
            <article
              className="bg-light-navy rounded-lg overflow-hidden flex flex-col border border-lightest-navy/50 transition-all duration-300 hover:-translate-y-1 hover:border-green group"
              key={project.name}
            >
              <div className="aspect-video overflow-hidden bg-lightest-navy">
                <img
                  className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300"
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col gap-2.5 flex-1">
                <h3 className="text-white text-xl font-serif m-0">{project.name}</h3>
                <p className="text-slate text-base m-0 flex-1 leading-relaxed">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="text-xs text-green bg-green/10 px-2.5 py-0.5 rounded-full font-mono"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-5 mt-1 pt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-green hover:text-lightest-slate text-sm transition-colors before:content-['↗']"
                  >
                    Live
                  </a>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-green hover:text-lightest-slate text-sm transition-colors before:content-['↗']"
                    >
                      Repo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </FadeInSection>
    </section>
  )
}

export default Projects