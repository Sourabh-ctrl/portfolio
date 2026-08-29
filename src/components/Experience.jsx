import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'
import './Experience.css'

function Experience() {
  const { jobs } = data
  return (
    <section className="section" id="experience">
      <FadeInSection>
        <h2 className="section-heading">
          <span className="section-number">03.</span> Experience
        </h2>
        <div className="timeline">
          {jobs.map((job) => (
            <div className="timeline-item" key={`${job.org}-${job.period}`}>
              <div className="timeline-marker" />
              <div className="timeline-card">
                <h3 className="timeline-role">
                  {job.role} <span className="timeline-at">@</span>{' '}
                  <span className="timeline-org">{job.org}</span>
                </h3>
                <p className="timeline-period">{job.period}</p>
                <p className="timeline-summary">{job.summary}</p>
                <ul className="timeline-highlights">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  )
}

export default Experience