import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'
import './Projects.css'

function Projects() {
  const { projects } = data
  return (
    <section className="section" id="projects">
      <FadeInSection>
        <h2 className="section-heading">
          <span className="section-number">04.</span> Projects
        </h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-image-wrap">
                <img
                  className="project-image"
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                />
              </div>
              <div className="project-body">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="project-tech">
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer noopener">
                    Live
                  </a>
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer noopener">
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