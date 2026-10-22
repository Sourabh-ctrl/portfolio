import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, CheckCircle2, CircleX } from 'lucide-react'
import { SiLeetcode } from 'react-icons/si'
import Reveal from './Reveal.jsx'

const LEETCODE_USERNAME = 'sourabhlathi'
const RELATIVE_TICK = 30000

const DIFFICULTY = [
  { label: 'Easy', color: '#3fb950' },
  { label: 'Medium', color: '#d29922' },
  { label: 'Hard', color: '#f85149' },
]

function relativeTime(timestamp, now) {
  if (!timestamp) return '—'
  const diff = Math.max(0, now - timestamp)
  const seconds = Math.floor(diff / 1000)
  if (seconds < 10) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
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

  return { solved, easy, medium, hard, acceptance, ranking: json?.ranking ?? null, recents }
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
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(target * eased))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, target])

  return display
}

/*
 * LeetCode, read like a box score rather than three equal cards: the total is
 * the headline, the ratio is the evidence, and today's submissions are the
 * footnotes. Nothing is shown as a real number until the API confirms it.
 */
function StatCards() {
  const [lc, setLc] = useState(null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(false)
  const [now, setNow] = useState(0)
  const wrapRef = useRef(null)

  useEffect(() => {
    let alive = true
    fetchLeetCode()
      .then((result) => {
        if (alive) setLc(result)
      })
      .catch(() => {
        if (alive) setFailed(true)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
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

  const active = inView && !loading
  const solvedDisplay = useCountUp(lc?.solved ?? 0, active)
  const diffTotal = (lc?.easy ?? 0) + (lc?.medium ?? 0) + (lc?.hard ?? 0) || 1
  const difficulty = DIFFICULTY.map((entry) => ({
    ...entry,
    value: lc?.[entry.label.toLowerCase()] ?? 0,
  }))

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayRecents = (lc?.recents || []).filter((r) => r.time >= todayStart.getTime())

  const status = loading ? 'syncing' : failed ? 'offline' : 'live'

  return (
    <Reveal className="min-w-0">
      <div ref={wrapRef} className="min-w-0 border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center border border-border text-foreground">
              <SiLeetcode className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">LeetCode</p>
              <p className="text-xs text-muted-foreground">@{LEETCODE_USERNAME}</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${
                failed ? 'bg-signal-violet' : 'live-dot bg-signal-green'
              }`}
            />
            {status}
          </span>
        </div>

        <div className="px-6 py-6">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <div className="min-w-[8rem]">
              <p className="font-serif text-[clamp(3rem,6.4vw,4.6rem)] leading-[0.85] tabular-nums text-foreground">
                {loading ? '—' : failed ? '—' : solvedDisplay.toLocaleString()}
              </p>
              <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                problems solved
              </p>
            </div>

            <dl className="grid grow grid-cols-2 gap-x-8 gap-y-3 sm:max-w-[16rem]">
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                  acceptance
                </dt>
                <dd className="mt-1 font-serif text-2xl tabular-nums text-foreground">
                  {loading || failed || lc?.acceptance == null ? '—' : `${lc.acceptance}%`}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                  ranking
                </dt>
                <dd className="mt-1 font-serif text-2xl tabular-nums text-foreground">
                  {loading || failed || !lc?.ranking ? '—' : `#${lc.ranking.toLocaleString()}`}
                </dd>
              </div>
            </dl>
          </div>

          {failed ? (
            <p className="mt-7 border-t border-border pt-5 text-sm text-muted-foreground">
              Live stats are unavailable right now. The profile itself is still there.
            </p>
          ) : (
            <>
              <div className="mt-8">
                <div className="flex h-1.5 w-full overflow-hidden bg-muted">
                  {difficulty.map((entry) => (
                    <div
                      key={entry.label}
                      className="transition-[width] duration-1000 ease-out"
                      style={{
                        width: active ? `${(entry.value / diffTotal) * 100}%` : '0%',
                        backgroundColor: entry.color,
                        opacity: active ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {difficulty.map((entry) => (
                    <div key={entry.label} className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        {entry.label}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-foreground">
                        {loading ? '—' : entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 border-t border-border pt-5">
                <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  today&apos;s solves
                </p>

                <ul className="flex flex-col">
                  {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                      <li key={index} className="h-10 animate-pulse border-b border-border bg-muted/40" />
                    ))
                  ) : todayRecents.length ? (
                    todayRecents.slice(0, 4).map((entry, index) => {
                      const accepted = entry.status === 'Accepted'
                      return (
                        <li
                          key={`${entry.slug}-${index}`}
                          className="flex items-center gap-3 border-b border-border py-2.5 last:border-b-0"
                        >
                          {accepted ? (
                            <CheckCircle2 className="size-3.5 shrink-0 text-[#3fb950]" />
                          ) : (
                            <CircleX className="size-3.5 shrink-0 text-[#f85149]" />
                          )}
                          <a
                            href={`https://leetcode.com/problems/${entry.slug}/`}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="min-w-0 flex-1 truncate text-sm text-foreground transition-colors hover:text-muted-foreground"
                          >
                            {entry.title}
                          </a>
                          <span className="hidden shrink-0 border border-border px-1.5 py-0.5 font-mono text-[0.6rem] uppercase text-muted-foreground sm:inline">
                            {entry.lang}
                          </span>
                          <span className="shrink-0 font-mono text-[0.65rem] text-muted-foreground">
                            {relativeTime(entry.time, now)}
                          </span>
                        </li>
                      )
                    })
                  ) : (
                    <li className="py-3 text-sm text-muted-foreground">
                      No submissions today yet. The streak resumes tomorrow.
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}

          <a
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline mt-6 inline-flex items-center gap-1.5 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            open the full profile
            <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

export default StatCards
