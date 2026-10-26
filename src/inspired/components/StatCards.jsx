import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, CheckCircle2, CircleX } from 'lucide-react'
import { SiLeetcode } from 'react-icons/si'
import Reveal from './Reveal.jsx'

const LEETCODE_USERNAME = 'sourabhlathi'
const RELATIVE_TICK = 30000

const DIFFICULTY = [
  { label: 'Easy', color: '#00b8a3' },
  { label: 'Medium', color: '#ffc01e' },
  { label: 'Hard', color: '#ff375f' },
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
 * LeetCode's own light profile language: white surface, orange mark, a donut
 * of solved problems, then the recent-submission feed. Everything is live.
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
  const solveTotal = (lc?.easy ?? 0) + (lc?.medium ?? 0) + (lc?.hard ?? 0) || 1
  const easyPct = ((lc?.easy ?? 0) / solveTotal) * 100
  const mediumPct = ((lc?.medium ?? 0) / solveTotal) * 100
  const hardPct = ((lc?.hard ?? 0) / solveTotal) * 100
  const donut = `conic-gradient(#00b8a3 0 ${easyPct}%, #ffc01e ${easyPct}% ${
    easyPct + mediumPct
  }%, #ff375f ${easyPct + mediumPct}% ${easyPct + mediumPct + hardPct}%)`
  const difficulty = DIFFICULTY.map((entry) => ({
    ...entry,
    value: lc?.[entry.label.toLowerCase()] ?? 0,
  }))

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayRecents = (lc?.recents || []).filter((r) => r.time >= todayStart.getTime())

  const status = loading ? 'syncing' : failed ? 'offline' : 'live'
  const solvedLabel = loading || failed ? '—' : solvedDisplay.toLocaleString()
  const showData = !loading && !failed

  return (
    <Reveal className="min-w-0">
      <div
        ref={wrapRef}
        className="min-w-0 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white font-sans text-[#262626]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eff1f6] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#ffa116]/10 text-[#ffa116]">
              <SiLeetcode className="size-5" />
            </span>
            <div>
              <p className="text-[15px] font-semibold leading-tight">LeetCode</p>
              <a
                href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs text-[#8a8a8a] transition-colors hover:text-[#262626]"
              >
                @{LEETCODE_USERNAME}
              </a>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f7f9] px-2.5 py-1 text-[11px] font-medium text-[#595959]">
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${
                failed ? 'bg-[#ff375f]' : loading ? 'bg-[#c2c2c2]' : 'live-dot bg-[#2cbb5d]'
              }`}
            />
            {status}
          </span>
        </div>

        <div className="px-5 py-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Solved Problems</p>
            <span className="text-[11px] text-[#8a8a8a]">live profile</span>
          </div>

          <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:flex-nowrap">
            <div className="relative size-36 shrink-0">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{ background: showData ? donut : '#eff1f6' }}
              />
              <div className="absolute inset-[17px] flex flex-col items-center justify-center rounded-full bg-white">
                <span className="text-[2rem] font-semibold leading-none tabular-nums">
                  {solvedLabel}
                </span>
                <span className="mt-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-[#8a8a8a]">
                  solved
                </span>
              </div>
            </div>

            <dl className="min-w-0 flex-1">
              {difficulty.map((entry) => (
                <div
                  key={entry.label}
                  className="flex items-center justify-between gap-4 border-b border-[#eff1f6] py-2.5 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <dt className="flex items-center gap-2 text-sm">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    {entry.label}
                  </dt>
                  <dd className="text-sm font-semibold tabular-nums">
                    {loading || failed ? '—' : entry.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-[#eff1f6] pt-4">
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-[#8a8a8a]">
                acceptance
              </dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums">
                {loading || failed || lc?.acceptance == null ? '—' : `${lc.acceptance}%`}
              </dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.14em] text-[#8a8a8a]">
                ranking
              </dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums">
                {loading || failed || !lc?.ranking ? '—' : `#${lc.ranking.toLocaleString()}`}
              </dd>
            </div>
          </dl>

          {failed ? (
            <p className="mt-5 border-t border-[#eff1f6] pt-4 text-sm text-[#8a8a8a]">
              Live stats are unavailable right now. The profile itself is still there.
            </p>
          ) : (
            <div className="mt-5 border-t border-[#eff1f6] pt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">Today&apos;s solves</p>
                <span className="text-[11px] text-[#8a8a8a]">
                  {loading ? 'syncing' : `${todayRecents.length} submissions`}
                </span>
              </div>

              <ul className="mt-2 flex flex-col">
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <li
                      key={index}
                      className="h-10 animate-pulse border-b border-[#eff1f6] bg-[#f6f7f9]"
                    />
                  ))
                ) : todayRecents.length ? (
                  todayRecents.slice(0, 4).map((entry, index) => {
                    const accepted = entry.status === 'Accepted'
                    return (
                      <li
                        key={`${entry.slug}-${index}`}
                        className="flex items-center gap-2.5 border-b border-[#eff1f6] py-2.5 last:border-b-0"
                      >
                        {accepted ? (
                          <CheckCircle2 className="size-3.5 shrink-0 text-[#2cbb5d]" />
                        ) : (
                          <CircleX className="size-3.5 shrink-0 text-[#ff375f]" />
                        )}
                        <a
                          href={`https://leetcode.com/problems/${entry.slug}/`}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="min-w-0 flex-1 truncate text-sm text-[#262626] transition-colors hover:text-[#ffa116]"
                        >
                          {entry.title}
                        </a>
                        <span className="hidden shrink-0 rounded bg-[#f6f7f9] px-1.5 py-0.5 text-[0.62rem] text-[#595959] sm:inline">
                          {entry.lang}
                        </span>
                        <span className="shrink-0 text-[0.65rem] text-[#8a8a8a]">
                          {relativeTime(entry.time, now)}
                        </span>
                      </li>
                    )
                  })
                ) : (
                  <li className="py-3 text-sm text-[#8a8a8a]">
                    No submissions today yet. The streak resumes tomorrow.
                  </li>
                )}
              </ul>
            </div>
          )}

          <a
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[#ffa116] transition-colors hover:text-[#e08e00]"
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
