import data from '../data.js'
import Reveal from './Reveal.jsx'
import { Scribble, ScribbleArrow } from './Scribble.jsx'

function About() {
  const { about, identity } = data

  const facts = [
    { label: 'Based in', value: identity.location },
    { label: 'Role', value: identity.role },
    { label: 'Status', value: identity.isOpenToWork ? 'Open to work' : 'Not looking' },
  ]

  return (
    <section id="about" className="scroll-mt-20 border-t border-border px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[minmax(240px,0.6fr)_minmax(0,1.4fr)] lg:gap-20">
        <aside className="h-fit min-w-0 lg:sticky lg:top-28">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              about
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-5 font-serif text-[clamp(2.4rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.02em]">
              the short
              <br />
              <em className="font-normal italic text-muted-foreground">version.</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <div className="relative mt-8 hidden lg:block">
              <Scribble rotate={-6}>psst — i write clean code. mostly.</Scribble>
              <ScribbleArrow
                className="-right-2 -top-8"
                d="M40 8 C30 20 18 26 6 26"
                head="M6 26 L15 20 M6 26 L14 33"
              />
            </div>
          </Reveal>
        </aside>

        <div className="min-w-0">
          <Reveal delay={100}>
            <p className="max-w-3xl font-serif text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.28] text-foreground">
              {about.blurb}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 max-w-2xl text-muted-foreground">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <dl className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-background px-6 py-5">
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 font-serif text-xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-8 font-hand text-[1.15rem] text-muted-foreground">
              the longer version is just a conversation.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default About
