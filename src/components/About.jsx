import data from '../data.js'
import { sound } from '../utils/sound.js'
import FadeInSection from './FadeInSection.jsx'
import techIcons from '../techIcons.jsx'

function AboutGroup({ category, items, visible, baseDelay }) {
  return (
    <div>
      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate mb-2">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <button
            type="button"
            key={item}
            onClick={() => sound.playClick()}
            style={{ transitionDelay: visible ? `${baseDelay + i * 45}ms` : '0ms' }}
            className={`group flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-lightest-navy bg-light-navy/70 pl-2 pr-3 py-1.5 text-[12px] font-bold font-mono text-lightest-slate shadow-xs hover:text-accent transition-all ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="flex size-4 shrink-0 items-center justify-center">
              {techIcons[item] || (
                <span className="inline-block size-2 rounded-full bg-slate" />
              )}
            </span>
            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function About() {
  const { about } = data

  return (
    <section className="pt-12 pb-10 scroll-mt-20" id="skills">
      <FadeInSection>
        {({ visible }) => (
          <>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-heading flex items-center gap-2">
                <span className="text-accent font-sans mr-0.5">/</span>
                <span>My Deep Dives</span>
              </h2>
              <p className="text-sm font-sans text-slate mt-1">
                Technologies and frameworks I build scalable web software with
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {about.skills.map((group, gi) => (
                <AboutGroup
                  key={group.category}
                  category={group.category}
                  items={group.items}
                  visible={visible}
                  baseDelay={gi * 60}
                />
              ))}
            </div>

            {about.currentlyLearning?.length > 0 && (
              <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                  </span>
                  <h3 className="font-serif text-sm font-bold tracking-tight text-heading">
                    Currently Exploring
                  </h3>
                  <span className="ml-auto text-xs font-mono text-accent">advancing</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {about.currentlyLearning.map((topic, i) => (
                    <button
                      type="button"
                      key={topic}
                      onClick={() => sound.playClick()}
                      style={{ transitionDelay: visible ? `${i * 45}ms` : '0ms' }}
                      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-accent/40 bg-navy px-2.5 py-1 text-xs font-mono font-medium text-accent transition-all duration-500 ${
                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                      }`}
                    >
                      <span className="text-slate">&rarr;</span>
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </FadeInSection>
    </section>
  )
}

export default About
