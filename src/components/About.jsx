import data from '../data.js'
import { sound } from '../utils/sound.js'
import FadeInSection from './FadeInSection.jsx'
import techIcons from '../techIcons.jsx'

function About() {
  const { about } = data

  return (
    <section className="pt-8 pb-12" id="skills">
      <FadeInSection>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-heading flex items-center gap-2">
            <span className="text-accent font-sans mr-0.5">/</span>
            <span>My Deep Dives</span>
          </h2>
          <p className="text-sm font-sans text-slate mt-1">
            Technologies and frameworks I build scalable web software with
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {about.skills.flatMap((group) =>
            group.items.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => sound.playClick()}
                className="group flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-lightest-navy bg-light-navy/70 pl-2 pr-3 py-1.5 text-[12px] font-bold font-mono text-lightest-slate shadow-xs hover:bg-lightest-navy hover:text-accent hover:border-accent/60 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span className="flex size-4 shrink-0 items-center justify-center">
                  {techIcons[item] || (
                    <span className="inline-block size-2 rounded-full bg-slate" />
                  )}
                </span>
                <span>{item}</span>
              </button>
            ))
          )}
        </div>
      </FadeInSection>
    </section>
  )
}

export default About
