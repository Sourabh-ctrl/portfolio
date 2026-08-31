import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'

function About() {
  const { about } = data
  return (
    <section className="max-w-[70rem] mx-auto px-5 py-16 md:py-24" id="about">
      <FadeInSection>
        <h2 className="flex items-center gap-4 text-white text-[clamp(1.4rem,3vw,2rem)] mb-10 whitespace-nowrap font-serif after:content-[''] after:block after:h-px after:flex-1 after:bg-lightest-navy/60">
          <span className="text-green font-sans mr-0.5">/</span>
          <span>{about.heading || 'about'}</span>
        </h2>
        <div className="space-y-3">
          <p className="text-lightest-slate text-[1.3rem] max-w-[46rem] my-3 leading-relaxed">
            {about.blurb}
          </p>
          {about.paragraphs.map((p) => (
            <p key={p} className="text-slate max-w-[46rem] my-3 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-8">
          {about.skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-green font-sans text-[1.05rem] uppercase tracking-wider mb-3 font-semibold">
                {group.category}
              </h3>
              <ul className="list-none m-0 p-0 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="bg-light-navy border border-lightest-navy/60 text-lightest-slate px-3 py-1 rounded text-sm"
                  >
                    {item}
                  </li>
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