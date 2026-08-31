import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'

function Experience() {
  const { jobs } = data
  return (
    <section className="max-w-[70rem] mx-auto px-5 py-16 md:py-24" id="experience">
      <FadeInSection>
        <h2 className="flex items-center gap-4 text-white text-[clamp(1.4rem,3vw,2rem)] mb-10 whitespace-nowrap font-serif after:content-[''] after:block after:h-px after:flex-1 after:bg-lightest-navy/60">
          <span className="text-green font-sans mr-0.5">/</span>
          <span>experience</span>
        </h2>
        <div className="relative flex flex-col gap-10 pl-7 before:content-[''] before:absolute before:left-2 before:top-1 before:bottom-1 before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-lightest-navy before:to-transparent">
          {jobs.map((job) => (
            <div className="relative" key={`${job.org}-${job.period}`}>
              <div className="absolute -left-[1.72rem] top-2 w-3.5 h-3.5 rounded-full bg-navy border-2 border-green" />
              <div>
                <h3 className="text-white text-[1.4rem] font-serif m-0">
                  {job.role} <span className="text-green font-sans font-normal">@</span>{' '}
                  <span className="text-green font-sans font-normal">{job.org}</span>
                </h3>
                <p className="text-slate text-sm mt-1 mb-2">{job.period}</p>
                <p className="text-light-slate text-base mb-3 leading-relaxed">{job.summary}</p>
                <ul className="m-0 pl-5 text-slate grid gap-1.5 list-disc marker:text-green">
                  {job.highlights.map((h) => (
                    <li key={h} className="leading-relaxed">
                      {h}
                    </li>
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