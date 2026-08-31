import { TypeAnimation } from 'react-type-animation'
import data from '../data.js'
import CyberSphere from './CyberSphere.jsx'

function EmailIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}

function Intro() {
  const { identity, hero } = data
  return (
    <section
      id="intro"
      className="relative w-full min-h-[80vh] flex flex-col items-center justify-center gap-10 px-5 md:px-[5vw] pt-16 pb-16 md:pt-24 md:pb-24 md:flex-row md:gap-[4vw]"
    >
      <div className="flex items-center justify-center shrink-0">
        <CyberSphere />
      </div>
      <div className="flex flex-col items-center text-center md:items-start md:text-left max-w-[34rem]">
        <h1 className="intro-title font-sans font-bold text-[clamp(2.6rem,6vw,5rem)] leading-none text-lightest-slate m-0 mb-2">
          {'hi, '}
          <span className="intro-name text-green font-bold">
            <TypeAnimation
              sequence={[identity.firstName]}
              wrapper="span"
              cursor={false}
              speed={45}
              repeat={0}
            />
          </span>
          {' here.'}
          <span className="intro-cursor text-green inline-block ml-1 animate-blink">|</span>
        </h1>
        <p className="intro-desc text-slate font-sans text-lg md:text-xl mt-4 mb-8 max-w-full leading-relaxed">
          {hero.description}
        </p>
        <a
          href={`mailto:${identity.email}`}
          className="intro-contact inline-flex items-center gap-2 text-green text-base font-bold font-sans px-8 py-3 border border-green rounded transition-all duration-300 hover:bg-green/10 hover:-translate-y-0.5"
        >
          <EmailIcon className="w-5 h-5" />
          Say hi!
        </a>
      </div>
    </section>
  )
}

export default Intro