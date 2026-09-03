import { useEffect, useRef, useState } from 'react'
import FadeInSection from './FadeInSection.jsx'
import {
  Code2,
  TrendingUp,
  Trophy,
  CheckCircle2,
  CircleX,
} from 'lucide-react'

const LEETCODE_USERNAME = 'sourabhlathi'
const RELATIVE_TICK = 30000

function LeetCodeMark({ className = 'size-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  )
}

function relativeTime(timestamp, now) {
  if (!timestamp) return '—'
  const diff = Math.max(0, now - timestamp)
  const s = Math.floor(diff / 1000)
  if (s < 10) return 'just now'
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} hr ago`
  return `${Math.floor(h / 24)} day ago`
}

async function fetchLeetCodeJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`lc http ${res.status}`)
  return res.json()
}

function normalizeLeetCode(json) {
  const total = json?.totalSubmissions || []
  const pick = (arr, difficulty) => arr.find((d) => d.difficulty === difficulty)?.count ?? 0

  const easy = json?.easySolved ?? pick(json?.matchedUserStats?.acSubmissionNum, 'Easy') ?? 0
  const medium = json?.mediumSolved ?? pick(json?.matchedUserStats?.acSubmissionNum, 'Medium') ?? 0
  const hard = json?.hardSolved ?? pick(json?.matchedUserStats?.acSubmissionNum, 'Hard') ?? 0
  const solved = json?.totalSolved ?? easy + medium + hard
  const acceptedAll = pick(total, 'All')
  const submissionsAll = total.find((d) => d.difficulty === 'All')?.submissions ?? 0
  const acceptance = submissionsAll > 0 ? Math.round((acceptedAll / submissionsAll) * 100) : null

  const recents = (json?.recentSubmissions || []).map((r) => ({
    title: r.title,
    slug: r.titleSlug,
    lang: r.lang || 'unknown',
    status: r.statusDisplay,
    time: Number(r.timestamp) * 1000,
  }))

  return {
    solved,
    easy,
    medium,
    hard,
    acceptance,
    ranking: json?.ranking ?? null,
    recents,
  }
}

async function fetchLeetCode() {
  const sources = [
    `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`,
    `https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`,
  ]
  let lastError = null
  for (const url of sources) {
    try {
      const json = await fetchLeetCodeJson(url)
      if (!json || json.error) throw new Error(json?.error || 'lc empty')
      if (json.totalSolved == null) throw new Error('lc shape')
      return normalizeLeetCode(json)
    } catch (err) {
      lastError = err
    }
  }
  throw lastError ?? new Error('lc failed')
}

function useCountUp(target, active) {
  const [display, setDisplay] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    if (!active) return undefined
    const start = performance.now()
    const duration = 1100
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round((target - 0) * eased))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, target])

  return display
}

function CardShell({ children }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-lightest-navy/70 bg-light-navy/50 backdrop-blur-sm transition-all duration-350 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft">
      {children}
    </div>
  )
}

function CardHeader({ mark, title, sub, live }) {
  return (
    <div className="flex items-center gap-3 border-b border-lightest-navy/50 bg-navy/30 px-5 py-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
        {mark}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-serif font-bold tracking-tight text-heading">{title}</span>
          {live && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          )}
        </div>
        <a
          href={sub.href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-xs font-mono text-slate transition-colors hover:text-accent"
        >
          {sub.label}
        </a>
      </div>
    </div>
  )
}

function Loading({ className = '' }) {
  return <div className={`animate-pulse bg-light-navy/50 ${className}`} />
}

function StatCards() {
  const [lc, setLc] = useState(null)
  const [lcLoading, setLcLoading] = useState(true)
  const [inView, setInView] = useState(false)
  const [now, setNow] = useState(0)
  const wrapRef = useRef(null)

  useEffect(() => {
    let alive = true
    fetchLeetCode()
      .then((d) => {
        if (!alive) return
        setLc(d)
      })
      .catch(() => {})
      .finally(() => alive && setLcLoading(false))
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setNow(Date.now()), 50)
    const id = setInterval(() => setNow(Date.now()), RELATIVE_TICK)
    return () => {
      clearTimeout(t)
      clearInterval(id)
    }
  }, [])

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const active = inView && !lcLoading
  const solvedDisplay = useCountUp(lc?.solved ?? 0, active)

  const diffTotal = (lc?.easy ?? 0) + (lc?.medium ?? 0) + (lc?.hard ?? 0) || 1
  const difficulty = [
    { label: 'Easy', value: lc?.easy ?? 0, color: '#4ade80' },
    { label: 'Medium', value: lc?.medium ?? 0, color: '#facc15' },
    { label: 'Hard', value: lc?.hard ?? 0, color: '#f87171' },
  ]

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayRecents = (lc?.recents || []).filter((r) => r.time >= todayStart.getTime())

  return (
    <section className="pt-12 pb-10 scroll-mt-20" id="stats">
      <FadeInSection>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-heading flex items-center gap-2">
            <span className="text-accent font-sans mr-0.5">/</span>
            <span>By the Numbers</span>
          </h2>
          <p className="text-sm font-sans text-slate mt-1">
            Live proof of shipping — updated in real time
          </p>
        </div>

        <div ref={wrapRef} className="grid grid-cols-1 gap-5">
          {/* LeetCode card */}
          <CardShell>
            <CardHeader
              mark={<LeetCodeMark className="size-5" />}
              title="LeetCode"
              live
              sub={{ label: `@${LEETCODE_USERNAME}`, href: `https://leetcode.com/u/${LEETCODE_USERNAME}/` }}
            />

            {/* Hero stats row */}
            <div className="grid grid-cols-3 gap-px border-b border-lightest-navy/50 bg-lightest-navy/30">
              <div className="flex flex-col items-center gap-1 bg-navy/40 px-2 py-4 text-center">
                <TrendingUp className="size-4 text-accent" />
                <div className="text-2xl font-serif font-bold tabular-nums text-accent">
                  {lcLoading ? <span className="animate-pulse">…</span> : solvedDisplay.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate">Solved</div>
              </div>
              <div className="flex flex-col items-center gap-1 bg-navy/40 px-2 py-4 text-center">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <div className="text-2xl font-serif font-bold tabular-nums text-heading">
                  {lcLoading ? <span className="animate-pulse">…</span> : `${lc?.acceptance ?? '—'}%`}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate">Acceptance</div>
              </div>
              <div className="flex flex-col items-center gap-1 bg-navy/40 px-2 py-4 text-center">
                <Trophy className="size-4 text-amber-400" />
                <div className="text-2xl font-serif font-bold tabular-nums text-heading">
                  {lcLoading ? <span className="animate-pulse">…</span> : lc?.ranking ? `#${lc.ranking.toLocaleString()}` : '—'}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate">Ranking</div>
              </div>
            </div>

            <div className="flex-1 p-5">
              {/* Difficulty stacked bar + legend */}
              {lcLoading ? (
                <Loading className="mb-5 h-20 rounded-xl" />
              ) : lc?.solved ? (
                <div className="mb-5">
                  <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-lightest-navy/50">
                    {difficulty.map((d) => (
                      <div
                        key={d.label}
                        className="transition-[width] duration-1200 ease-out"
                        style={{
                          width: active ? `${(d.value / diffTotal) * 100}%` : '0%',
                          backgroundColor: d.color,
                          opacity: active ? 1 : 0,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {difficulty.map((d) => (
                      <div key={d.label} className="flex items-center justify-between rounded-lg border border-lightest-navy/60 bg-navy/40 px-2.5 py-1.5">
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-lightest-slate">
                          <span className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
                          {d.label}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-slate">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Loading className="mb-5 h-20 rounded-xl" />
              )}

              {/* Today's submissions feed */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate">
                  Today's solves
                </span>
                <Code2 className="size-3.5 text-accent" />
              </div>
              <ul className="flex flex-col gap-2">
                {lcLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="h-9 animate-pulse rounded-lg bg-light-navy/50" />
                  ))
                ) : todayRecents.length ? (
                  todayRecents.slice(0, 6).map((r, i) => {
                    const accepted = r.status === 'Accepted'
                    return (
                      <li
                        key={`${r.slug}-${i}`}
                        className="flex items-center gap-2.5 rounded-xl border border-lightest-navy/50 bg-navy/40 px-3 py-2.5 transition-colors duration-350 hover:border-accent/40"
                      >
                        {accepted ? (
                          <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                        ) : (
                          <CircleX className="size-4 shrink-0 text-red-400" />
                        )}
                        <a
                          href={`https://leetcode.com/problems/${r.slug}/`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="min-w-0 flex-1 truncate text-xs font-medium text-lightest-slate transition-colors hover:text-accent"
                        >
                          {r.title}
                        </a>
                        <span className="hidden rounded border border-lightest-navy/60 px-1.5 py-0.5 text-[10px] font-mono uppercase text-slate sm:inline">
                          {r.lang}
                        </span>
                        <span className="shrink-0 text-[10px] font-mono text-slate/80">
                          {relativeTime(r.time, now)}
                        </span>
                      </li>
                    )
                  })
                ) : (
                  <li className="text-xs text-slate">No submissions today yet.</li>
                )}
              </ul>
            </div>
          </CardShell>
        </div>
      </FadeInSection>
    </section>
  )
}

export default StatCards
