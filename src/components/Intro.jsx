import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { TypeAnimation } from 'react-type-animation'
import data from '../data.js'
import { sound } from '../utils/sound.js'
import Magnetic from './Magnetic.jsx'
import AsciiPortrait from './AsciiPortrait.jsx'
import { FileText, Send, X, ExternalLink } from 'lucide-react'

const baseUrl = import.meta.env.BASE_URL

import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { Mail } from 'lucide-react'

function Intro() {
  const { identity, hero } = data
  const [showResume, setShowResume] = useState(false)
  const [asciiHovered, setAsciiHovered] = useState(false)
  const resumeTriggerRef = useRef(null)
  const resumeDialogRef = useRef(null)

  const [wakaStats, setWakaStats] = useState(() => {
    const cached = localStorage.getItem('wakatime_stats')
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
    const apiUrl = '/api/wakatime/today'

    const fetchWakaStats = async () => {
      try {
        const res = await fetch(apiUrl)
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
        // API not available, keep cached/default values
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
    { label: 'GitHub', href: data.github.profileUrl, icon: FaGithub },
    {
      label: 'LinkedIn',
      href: data.socials.find((s) => s.label === 'LinkedIn')?.url || 'https://linkedin.com',
      icon: FaLinkedin,
    },
    {
      label: 'LeetCode',
      href: data.socials.find((s) => s.label === 'LeetCode')?.url || 'https://leetcode.com',
      icon: SiLeetcode,
    },
    {
      label: 'Email',
      href: `mailto:${identity.email}`,
      icon: Mail,
    },
  ]

  return (
    <section id="home" className="pt-24 pb-8 sm:pt-28 md:pt-32 scroll-mt-20">
      <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-12">
        {/* Left: ASCII Portrait with WakaTime popover */}
        <div className="relative shrink-0 self-center sm:self-start">
          <AsciiPortrait
            onHoverStart={() => setAsciiHovered(true)}
            onHoverEnd={() => setAsciiHovered(false)}
          />

          {/* WakaTime Stats Popover */}
          <div
            className={`absolute z-50 pointer-events-none transition-all duration-300 ease-out sm:left-full sm:top-1/2 sm:-translate-y-1/2 sm:ml-4 left-1/2 -translate-x-1/2 sm:translate-x-0 top-full mt-3 sm:mt-0 ${
              asciiHovered
                ? 'opacity-100 translate-y-0 sm:translate-x-0'
                : 'opacity-0 translate-y-2 sm:translate-x-2 sm:-translate-x-0 sm:translate-y-0'
            }`}
            role="tooltip"
          >
            <div
              className={`relative rounded-2xl px-4 py-3 text-xs shadow-2xl backdrop-blur-md font-sans w-64 transition-colors ${
                wakaStats.isOnline
                  ? 'border border-emerald-500/40 bg-light-navy/95 text-lightest-slate shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(16,185,129,0.15)]'
                  : 'border border-lightest-navy/80 bg-light-navy/95 text-lightest-slate shadow-xl'
              }`}
            >
              {/* Arrow notch - left on desktop, top on mobile */}
              <div
                className={`absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:-translate-x-1.5 left-1/2 top-0 -translate-x-1/2 -translate-y-1.5 rotate-45 h-3 w-3 sm:border-b sm:border-l sm:border-t-0 sm:border-r-0 border-t border-l bg-light-navy ${
                  wakaStats.isOnline ? 'border-emerald-500/40' : 'border-lightest-navy/80'
                }`}
              />

              {wakaStats.isOnline ? (
                <div className="flex flex-col text-sm">
                  <div className="flex items-center gap-2">
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
                    <span className="h-2 w-2 rounded-full bg-gray-400" />
                    <span className="font-medium text-lightest-slate">Offline</span>
                    <span className="text-slate">in {wakaStats.editor || 'VS Code'}</span>
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

        {/* Right: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-heading">
                {identity.name}
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

            {/* Open to work badge */}
            <div className="inline-flex items-center gap-2 self-start sm:self-center rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase border border-accent/30 bg-accent/10 text-accent shadow-[0_0_16px_var(--color-accent-glow)] font-mono shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              <span>Open to work</span>
            </div>
          </div>

          {/* Bio Description */}
          <p className="mt-5 text-base text-slate font-sans leading-relaxed max-w-2xl">
            {hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
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

          {/* Social Media Pill Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
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
                    <Icon className="size-4" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
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
    </section>
  )
}

export default Intro
