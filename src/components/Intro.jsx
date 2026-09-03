import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { TypeAnimation } from 'react-type-animation'
import data from '../data.js'
import { sound } from '../utils/sound.js'
import Magnetic from './Magnetic.jsx'
import { FileText, Send, X, ExternalLink } from 'lucide-react'

const baseUrl = import.meta.env.BASE_URL

function GithubSvg() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  )
}

function LinkedInSvg() {
  return (
    <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  )
}

function LeetCodeSvg() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  )
}

function EmailSvg() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function Intro() {
  const { identity, hero } = data
  const [showResume, setShowResume] = useState(false)
  const resumeTriggerRef = useRef(null)
  const resumeDialogRef = useRef(null)

  const [wakaStats, setWakaStats] = useState(() => {    const cached = localStorage.getItem('wakatime_stats')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        return {
          isOnline: !!parsed.isOnline,
          editor: parsed.editor || data.wakatime?.editor || 'VS Code',
          todayWorked: parsed.todayWorked || parsed.text || data.wakatime?.todayWorked || '0 mins',
          yesterdayWorked: parsed.yesterdayWorked || data.wakatime?.yesterdayWorked || '0 mins',
          project: parsed.project || data.wakatime?.project || 'portfolio',
        }
      } catch {
        // ignore JSON parse error
      }
    }
    return {
      isOnline: true,
      editor: data.wakatime?.editor || 'VS Code',
      todayWorked: data.wakatime?.todayWorked || '2 hrs 20 mins',
      yesterdayWorked: data.wakatime?.yesterdayWorked || '56 mins',
      project: data.wakatime?.project || 'portfolio',
    }
  })

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/'
    const apiUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}api/wakatime/today`

    const fetchWakaStats = async () => {
      try {
        const res = await fetch(apiUrl)
        if (!res.ok) return
        const json = await res.json()
        if (json && !json.error) {
          const stats = {
            isOnline: !!json.isOnline,
            editor: json.editor || 'VS Code',
            todayWorked: json.todayWorked || json.text || '0 mins',
            yesterdayWorked: json.yesterdayWorked || '0 mins',
            project: json.project || 'portfolio',
          }
          setWakaStats(stats)
          localStorage.setItem('wakatime_stats', JSON.stringify(stats))
        }
      } catch {
        // Offline or proxy not available
      }
    }

    fetchWakaStats()
    const refreshInterval = data.wakatime?.refreshMs || 60000
    const interval = setInterval(fetchWakaStats, refreshInterval)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!showResume) return
    const dialog = resumeDialogRef.current
    const trigger = resumeTriggerRef.current
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowResume(false)
        return
      }
      if (e.key !== 'Tab' || !dialog) return
      const focusables = dialog.querySelectorAll(
        'a[href], button:not([disabled]), iframe',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      trigger?.focus()
    }
  }, [showResume])

  const socialLinks = [
    { label: 'GitHub', href: data.github.profileUrl, icon: GithubSvg },
    {
      label: 'LinkedIn',
      href: data.socials.find((s) => s.label === 'LinkedIn')?.url || 'https://linkedin.com',
      icon: LinkedInSvg,
    },
    {
      label: 'LeetCode',
      href: data.socials.find((s) => s.label === 'LeetCode')?.url || 'https://leetcode.com',
      icon: LeetCodeSvg,
    },
    {
      label: 'Email',
      href: `mailto:${identity.email}`,
      icon: EmailSvg,
    },
  ]

  return (
    <section id="home" className="pt-24 pb-8 sm:pt-28 md:pt-32 scroll-mt-20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
          {/* Avatar with live WakaTime presence indicator */}
          <div className="relative group shrink-0">
            <div
              className="block size-24 sm:size-28 rounded-full overflow-hidden ring-2 ring-lightest-navy hover:ring-accent shadow-xl transition-all duration-350"
              aria-label="View WakaTime Profile"
            >
              <img
                src={hero.portrait}
                alt={identity.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

              {/* Presence Indicator */}
              <div className="absolute bottom-1 right-1 pointer-events-none">
                <div className="relative flex size-4 items-center justify-center rounded-full bg-navy ring-2 ring-navy">
                  {wakaStats.isOnline ? (
                    <>
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.85)]"></span>
                    </>
                  ) : (
                    <span className="relative inline-flex size-2.5 rounded-full bg-slate/60"></span>
                  )}
                </div>
              </div>

              {/* WakaTime Stats Popover (Bottom Right, Flowing Line Layout with Enhanced Colors) */}
              <div
                className="absolute left-1/2 sm:left-3/4 top-full mt-2.5 z-50 pointer-events-none group-hover:pointer-events-auto opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out"
                role="tooltip"
              >
                <div
                  className={`relative rounded-xl px-3.5 py-2.5 text-xs shadow-2xl backdrop-blur-md font-sans w-64 sm:w-72 transition-colors ${
                    wakaStats.isOnline
                      ? 'border border-emerald-500/40 bg-light-navy/95 text-lightest-slate shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(16,185,129,0.15)]'
                      : 'border border-lightest-navy/80 bg-light-navy/95 text-lightest-slate shadow-xl'
                  }`}
                >
                  {/* Arrow notch pointing to the bottom-right of avatar */}
                  <div
                    className={`absolute -top-1.5 left-5 sm:left-6 h-3 w-3 rotate-45 border-t border-l bg-light-navy ${
                      wakaStats.isOnline ? 'border-emerald-500/40' : 'border-lightest-navy/80'
                    }`}
                  />

                 {wakaStats.isOnline ? (
  <div className="flex flex-col text-sm">
    <div className="flex items-center gap-2">
      {/* Blinking green dot for online status */}
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="font-medium text-lightest-slate">
        Coding in {wakaStats.editor || 'VS Code'}
      </span>
      <span className="text-slate text-xs">
        {wakaStats.todayWorked || '0 mins'}
      </span>
    </div>
    
    <div className="text-light-slate pl-4 mt-0.5">
      Working on <span className="font-medium text-heading">{wakaStats.project || 'portfolio'}</span>
    </div>
  </div>
) : (
  <div className="flex flex-col text-sm">
    <div className="flex items-center gap-2">
      {/* Gray dot for offline status */}
      <span className="h-2 w-2 rounded-full bg-gray-400" />
      <span className="font-medium text-lightest-slate">
        Offline
      </span>
      <span className="text-slate">
        in {wakaStats.editor || 'VS Code'}
      </span>
    </div>
    
    <div className="text-light-slate pl-4 mt-0.5 text-xs">
      Worked <span className="font-medium">{wakaStats.yesterdayWorked || '0 mins'}</span> yesterday
      {wakaStats.todayWorked && wakaStats.todayWorked !== '0 mins' && (
        <span> &middot; {wakaStats.todayWorked} today</span>
      )}
    </div>
  </div>
)}
                </div>
              </div>
          </div>

          {/* Name & Title */}
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-heading flex items-center gap-2">
              <span>{identity.name}</span>
            </h1>

            <div className="mt-1 text-sm sm:text-base font-sans font-medium text-slate flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent animate-pulse"></span>
              <TypeAnimation
                sequence={[
                  identity.role,
                  2000,
                  ...(hero.taglines || []).flatMap((t) => [t, 2000]),
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-accent font-mono text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* "OPEN TO WORK" Pill Badge */}
        <div className="inline-flex items-center gap-2 self-start sm:self-center rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase border border-accent/30 bg-accent/10 text-accent shadow-[0_0_16px_var(--color-accent-glow)] font-mono">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          <span>Open to work</span>
        </div>
      </div>

      {/* Bio Description */}
      <p className="mt-6 text-base text-slate font-sans leading-relaxed max-w-3xl">
        {hero.description}
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
          <Magnetic>
            <button
              type="button"
              ref={resumeTriggerRef}
              onClick={() => {
                sound.playClick()
                setShowResume((v) => !v)
              }}
              className="inline-flex items-center gap-2 rounded-2xl border border-accent/40 bg-light-navy hover:bg-lightest-navy/60 px-4 py-2 text-sm font-sans font-medium text-lightest-slate hover:text-accent shadow-sm transition-all duration-350 active:scale-97 cursor-pointer"
            >
            <FileText className="size-4 text-accent" />
            <span>{showResume ? 'Close Resume' : 'Resume / CV'}</span>
          </button>
        </Magnetic>

          <Magnetic>
            <a
              href={`mailto:${identity.email}`}
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 rounded-2xl border border-accent bg-accent/10 hover:bg-accent/20 text-accent px-5 py-2 text-sm font-sans font-semibold shadow-sm transition-all duration-350 active:scale-97 cursor-pointer"
            >
            <Send className="size-4" />
            <span>Say hi!</span>
          </a>
        </Magnetic>

      </div>

      {/* Resume Modal */}
      {showResume &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm p-4 py-10"
            onClick={() => setShowResume(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
          >
            <div
              ref={resumeDialogRef}
              className="relative w-full max-w-3xl rounded-3xl border border-lightest-navy bg-light-navy/95 p-4 shadow-soft overflow-hidden animate-open"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-lightest-navy/60">
                <div className="flex items-center gap-2 text-sm font-semibold text-heading">
                  <FileText className="size-4 text-accent" />
                  <span>Resume — {identity.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`${baseUrl}resume.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    download="Sourabh_Lathi_Resume.pdf"
                    className="text-xs font-medium text-accent hover:text-heading flex items-center gap-1 px-2.5 py-1 rounded-md border border-accent/40 bg-navy transition-colors"
                  >
                    <span>Download</span>
                    <ExternalLink className="size-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowResume(false)}
                    className="size-7 rounded-md flex items-center justify-center text-slate hover:text-heading transition-colors"
                    aria-label="Close Preview"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
              <div className="h-[80vh] w-full mt-3 rounded-xl overflow-hidden border border-lightest-navy bg-navy">
                <iframe
                  src={`${baseUrl}resume.pdf#toolbar=0`}
                  className="w-full h-full"
                  title={`Resume - ${identity.name}`}
                />
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Social Media Pill Badges */}
      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        {socialLinks.map((s) => {
          const Icon = s.icon
          return (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer noopener"
                onClick={() => sound.playClick()}
                aria-label={s.label}
                className="group flex items-center gap-2 rounded-xl border border-lightest-navy/60 bg-light-navy/70 px-3 py-1.5 text-xs font-sans font-medium text-lightest-slate hover:bg-lightest-navy hover:text-accent hover:border-accent/50 transition-all duration-350 shadow-xs active:scale-97"
              >
              <span className="text-slate group-hover:text-accent transition-colors">
                <Icon />
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default Intro
