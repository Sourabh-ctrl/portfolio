import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'
import './Footer.css'

function Footer() {
  const { attribution, identity } = data
  return (
    <footer className="footer" id="footer">
      <FadeInSection>
        <h2 className="footer-title">Get in touch</h2>
        <p className="footer-copy">
          I&apos;m always open to interesting opportunities and conversations.
          Reach out at{' '}
          <a href={`mailto:${identity.email}`}>{identity.email}</a>.
        </p>
        <div className="footer-meta">
          <a href={attribution.url} target="_blank" rel="noreferrer noopener">
            {attribution.label}
          </a>
        </div>
      </FadeInSection>
    </footer>
  )
}

export default Footer