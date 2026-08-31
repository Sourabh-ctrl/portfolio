import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'

function Footer() {
  const { identity } = data
  return (
    <footer className="text-center pt-24 px-5 pb-12 bg-navy border-t border-lightest-navy/50" id="footer">
      <FadeInSection>
        <h2 className="text-white text-[clamp(1.6rem,4vw,2.4rem)] font-serif mb-4">
          <span className="text-green font-sans mr-0.5">/</span>
          <span>contact</span>
        </h2>
        <p className="text-slate max-w-[34rem] mx-auto mb-6 text-base leading-relaxed">
          I&apos;m always open to interesting opportunities and conversations.
          Reach out at{' '}
          <a
            href={`mailto:${identity.email}`}
            className="text-green hover:text-lightest-slate transition-colors underline-offset-4 hover:underline"
          >
            {identity.email}
          </a>
          .
        </p>
        
      </FadeInSection>
    </footer>
  )
}
  
export default Footer