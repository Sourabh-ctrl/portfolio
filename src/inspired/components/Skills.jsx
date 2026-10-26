import data from '../data.js'
import Reveal from './Reveal.jsx'
import techIcons from '../techIcons.jsx'

function SkillChip({ label, delay }) {
  const icon = techIcons[label]
  return (
    <li
      style={{ transitionDelay: `${delay}ms` }}
      className="group flex cursor-default items-center gap-2 border border-border px-3 py-1.5 text-[0.8rem] text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground"
    >
      {icon}
      <span>{label}</span>
    </li>
  )
}

function Skills() {
  const { about } = data
  const groups = about.skills
  const learning = about.currentlyLearning || []

  return (
    <section id="stack" className="scroll-mt-20 border-t border-border px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(240px,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
          <div className="min-w-0 lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                the stack
              </p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-5 font-serif text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
                what i
                <br />
                <em className="font-normal italic text-muted-foreground">reach for.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-sm text-muted-foreground">
                Tools change. The habit — small interfaces, honest state, boring databases that
                keep working — does not.
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="grid border-l border-t border-border sm:grid-cols-2">
              {groups.map((group, groupIndex) => (
                <div key={group.category} className="border-b border-r border-border p-6 sm:p-7">
                  <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {group.category}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item, index) => (
                      <SkillChip
                        key={item}
                        label={item}
                        delay={groupIndex * 40 + index * 30}
                      />
                    ))}
                  </ul>
                </div>
              ))}

              {learning.length > 0 && (
                <div className="border-b border-r border-border p-6 sm:p-7">
                  <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent">
                    currently exploring
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {learning.map((topic, index) => (
                      <li
                        key={topic}
                        style={{ transitionDelay: `${index * 30}ms` }}
                        className="inline-flex items-center gap-1.5 border border-dashed border-border px-3 py-1.5 text-[0.8rem] text-muted-foreground transition-colors duration-200 hover:border-border-strong"
                      >
                        <span aria-hidden="true" className="text-border-strong">
                          →
                        </span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Skills
