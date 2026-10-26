import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import data from '../data.js'
import Button from './ui/Button.jsx'
import { ScribbleArrow } from './Scribble.jsx'

function HeroThread() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full text-foreground/25 lg:block"
    >
      <path
        className="animate-draw-string"
        style={{ '--draw-duration': '2.4s', '--draw-delay': '0.35s' }}
        pathLength="1"
        d="M1120 170 C1040 200 1000 240 960 300 C920 360 980 400 1010 450 C1040 500 960 540 940 600 C920 660 990 700 1010 760 C1030 820 970 850 960 900"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="animate-draw-string"
        style={{ '--draw-duration': '1.1s', '--draw-delay': '1.6s' }}
        pathLength="1"
        d="M1010 450 C1062 458 1064 512 1012 502 C980 496 976 456 1010 450"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function Hero() {
  const { identity, hero, github, socials, wakatime } = data
  const [coding, setCoding] = useState(null)

  const linkedin = socials.find((social) => social.label === 'LinkedIn')?.url
  const x = socials.find((social) => social.label === 'X')?.url

  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/'
    const apiUrl = `${base.endsWith('/') ? base : `${base}/`}api/wakatime/today`
    const controller = new AbortController()

    const loadCodingTime = async () => {
      try {
        const res = await fetch(apiUrl, { signal: controller.signal })
        if (!res.ok) return

        const json = await res.json()
        if (!json?.todayWorked) return

        setCoding({
          todayWorked: json.todayWorked,
          editor: json.editor || null,
          isOnline: !!json.isOnline,
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          // Keep the last real reading if WakaTime is temporarily unavailable.
        }
      }
    }

    loadCodingTime()
    const interval = setInterval(loadCodingTime, wakatime?.refreshMs || 5 * 60 * 1000)

    return () => {
      controller.abort()
      clearInterval(interval)
    }
  }, [wakatime])

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden px-5 pb-8 pt-24 sm:px-8 sm:pb-10 md:px-[4.5vw] md:pt-28"
    >
      <HeroThread />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-start justify-end gap-10">
          <div className="relative hidden w-48 shrink-0 -rotate-3 md:block">
            <p className="font-hand text-[1.05rem] leading-snug tracking-[0.04em] text-foreground/70">
              an honest map of
              <br />
              what i&apos;ve shipped.
            </p>
            <ScribbleArrow
              className="left-6 top-8 h-10 w-10"
              d="M12 4 C26 12 36 26 38 46"
              head="M38 46 L31 36 M38 46 L43 35"
            />
          </div>
        </div>

        <div className="flex flex-1 items-end pb-10 pt-20 sm:pb-14 sm:pt-24">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] lg:items-end lg:gap-16">
            <div className="min-w-0">
              <p
                className="animate-reveal text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground"
                style={{ '--reveal-delay': '80ms' }}
              >
                full-stack developer
              </p>
              <h1
                className="animate-reveal mt-4 font-sans text-[clamp(2.15rem,8vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-foreground"
                style={{ '--reveal-delay': '140ms' }}
              >
                i build
                <br />
                web products
                <br />
                <em className="font-serif font-normal italic tracking-[-0.02em] text-muted-foreground">
                  that hold up.
                </em>
              </h1>
            </div>

            <div
              className="animate-reveal min-w-0 max-w-sm lg:pb-2"
              style={{ '--reveal-delay': '240ms' }}
            >
              <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                {hero.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <Button
                  as="a"
                  href="#work"
                  size="lg"
                  className="rounded-full"
                  data-cursor="the good stuff."
                >
                  view work
                  <ArrowDown className="size-4" />
                </Button>
                <Button
                  as="a"
                  href="#contact"
                  variant="paper"
                  size="lg"
                  className="rounded-full"
                  data-cursor="say hello?"
                >
                  let&apos;s talk
                  <ArrowUpRight className="size-4" />
                </Button>
              </div>

              <div className="mt-6 min-h-[1.125rem]" aria-live="polite">
                {coding && (
                  <p
                    aria-label={`Today's coding time: ${coding.todayWorked}${coding.editor ? ` in ${coding.editor}` : ''}, via WakaTime`}
                    className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className={`size-1.5 rounded-full ${
                        coding.isOnline ? 'live-dot bg-signal-green' : 'bg-border-strong'
                      }`}
                    />
                    <span>today</span>
                    <span className="text-foreground">{coding.todayWorked}</span>
                    {coding.editor && (
                      <span className="normal-case tracking-[0.08em] text-muted-foreground/70">
                        in {coding.editor}
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-border pt-5 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${
                  identity.isOpenToWork ? 'live-dot bg-signal-green' : 'bg-border-strong'
                }`}
              />
              {identity.isOpenToWork ? 'open to work' : 'not looking'}
            </span>
            <a
              href={`mailto:${identity.email}`}
              className="link-underline transition-colors hover:text-foreground"
              data-cursor="send the interesting idea."
            >
              {identity.email}
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={github.profileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              data-cursor="where the rabbit holes live."
            >
              <FaGithub className="size-3.5" />
              github
            </a>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <FaLinkedin className="size-3.5" />
                linkedin
              </a>
            )}
            {x && (
              <a
                href={x}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <FaXTwitter className="size-3.5" />
                x
              </a>
            )}
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              scroll
              <ArrowDown className="size-3 animate-scroll-nudge" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
