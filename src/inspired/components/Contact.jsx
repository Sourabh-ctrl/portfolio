import { ArrowUpRight } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import data from '../data.js'
import Button from './ui/Button.jsx'
import Reveal from './Reveal.jsx'
import { Scribble, ScribbleArrow } from './Scribble.jsx'

function Contact() {
  const { identity, socials, github } = data
  const firstName = identity.firstName.toLowerCase()

  const pills = [
    {
      label: 'linkedin',
      href: socials.find((s) => s.label === 'LinkedIn')?.url || 'https://linkedin.com',
      icon: FaLinkedin,
      comment: 'the professional version.',
    },
    {
      label: 'github',
      href: github.profileUrl,
      icon: FaGithub,
      comment: 'where the rabbit holes live.',
    },
    {
      label: 'leetcode',
      href: socials.find((s) => s.label === 'LeetCode')?.url || 'https://leetcode.com',
      icon: SiLeetcode,
      comment: 'the algorithm habit.',
    },
    {
      label: 'x',
      href: socials.find((s) => s.label === 'X')?.url || 'https://x.com/lathisaurav',
      icon: FaXTwitter,
      comment: 'short thoughts, mostly in public.',
    },
  ]

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-border px-5 pb-6 pt-24 sm:px-8 sm:pb-8 md:px-[4.5vw] md:pt-[16vh]"
    >
      <div className="max-w-3xl">
        <div className="relative min-w-0">
          <Reveal>
            <div className="relative mb-7 hidden w-fit md:block">
              <Scribble rotate={-6}>the person behind the commits.</Scribble>
              <ScribbleArrow
                className="-left-9 -top-4 h-9 w-9"
                d="M44 4 C28 8 14 18 10 36"
                head="M10 36 L5 26 M10 36 L17 29"
              />
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="font-serif text-[clamp(3rem,7.6vw,7rem)] leading-[0.9] tracking-[-0.02em]">
              so, we made it
              <br />
              to the <em className="font-normal italic text-muted-foreground">good part.</em>
            </h2>
          </Reveal>

          <Reveal delay={110}>
            <p className="mt-6 text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.35] text-muted-foreground">
              i&apos;m {firstName} — i build for the web,
              <br />
              sweat the small stuff,
              <br />
              and answer my email.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-9 font-serif text-[clamp(1.55rem,2.3vw,2.5rem)] leading-[1.12]">
              have a product worth shipping?
              <br />
              let&apos;s make it <em className="italic text-muted-foreground">hold up</em>.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-9 flex flex-col items-start gap-3">
              <Button
                as="a"
                href={`mailto:${identity.email}`}
                data-cursor="send the interesting idea."
              >
                {identity.email}
                <ArrowUpRight className="size-4" />
              </Button>

              <div className="flex flex-wrap gap-3">
                {pills.map((pill) => {
                  const Icon = pill.icon
                  return (
                    <Button
                      key={pill.label}
                      as="a"
                      variant="outline"
                      href={pill.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor={pill.comment}
                    >
                      <Icon className="size-3.5" />
                      {pill.label}
                      <ArrowUpRight className="size-3.5" />
                    </Button>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={260}>
          <a
            href={import.meta.env.BASE_URL}
            aria-label="Return to the classic portfolio"
            className="mt-16 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/40 transition-colors hover:text-foreground focus-visible:text-foreground"
          >
            <span aria-hidden="true">←</span>
            classic
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
