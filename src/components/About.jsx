import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'
import './About.css'

function About() {
  const { about } = data
  return (
    <section className="section" id="about">
      <FadeInSection>
        <h2 className="section-heading">
          <span className="section-number">01.</span> {about.heading}
        </h2>
        <div className="about-body">
          <div className="about-text">
            <p className="about-blurb">{about.blurb}</p>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="about-skills">
          {about.skills.map((group) => (
            <div className="skills-group" key={group.category}>
              <h4 className="skills-category">{group.category}</h4>
              <ul className="skills-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeInSection>
    </section>
  )
}

export default About