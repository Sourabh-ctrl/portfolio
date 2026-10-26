import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import data from '../data.js'
import { FaGithub } from 'react-icons/fa'
import { RotateCw } from 'lucide-react'

// GitHub's official light-theme contribution levels, so the embed still reads
// as GitHub while sitting on the paper-coloured page.
const LEVEL_COLORS = {
  0: '#ebedf0',
  1: '#9be9a8',
  2: '#40c463',
  3: '#30a14e',
  4: '#216e39',
}

const LEVEL_LABELS = ['Less', 'More']

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function formatDateForTooltip(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-').map(Number)
  const dateObj = new Date(Date.UTC(y, m - 1, d))
  const dayName = DAY_NAMES[dateObj.getUTCDay()]
  const monthName = MONTH_NAMES[dateObj.getUTCMonth()]
  return `${dayName}, ${monthName} ${d}, ${y}`
}

function readCache(username) {
  if (typeof window === 'undefined') return null
  try {
    const cached = localStorage.getItem(`gh_contributions_${username}`)
    if (!cached) return null
    const parsed = JSON.parse(cached)
    if (!parsed?.contributions?.length) return null
    return parsed
  } catch {
    return null
  }
}

// GitHub's official system font stack
const GITHUB_FONT_STYLE = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
}

function GitHubContributions() {
  const { github } = data
  const cached = useMemo(() => readCache(github.username), [github.username])

  const [contributions, setContributions] = useState(() => cached?.contributions ?? null)
  const [totalCount, setTotalCount] = useState(() => cached?.total ?? null)
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [tooltip, setTooltip] = useState(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const cacheKey = `gh_contributions_${github.username}`
    const fetchUrl =
      github.apiUrl || `https://github-contributions-api.jogruber.de/v4/${github.username}?y=last`
    const controller = new AbortController()
    let alive = true

    fetch(fetchUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!alive) return
        if (json?.contributions && Array.isArray(json.contributions)) {
          setContributions(json.contributions)
          const total =
            json.total?.lastYear ??
            json.total?.[new Date().getFullYear()] ??
            json.contributions.reduce((acc, c) => acc + (c.count || 0), 0)
          setTotalCount(total)
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              contributions: json.contributions,
              total,
              timestamp: Date.now(),
            }),
          )
        } else {
          throw new Error('Unexpected contribution data')
        }
      })
      .catch((err) => {
        if (!alive || err.name === 'AbortError') return
        console.warn('Failed to fetch GitHub contributions:', err)
        setFailed(true)
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
      controller.abort()
    }
  }, [github.username, github.apiUrl, reloadKey])

  // Group contributions into 53 weeks x 7 days
  const { weeks, monthHeaders } = useMemo(() => {
    if (!contributions || !contributions.length) {
      return { weeks: [], monthHeaders: [] }
    }

    const wList = []
    let curWeek = []

    const firstDate = new Date(contributions[0].date + 'T00:00:00')
    const startDay = firstDate.getDay() // 0 = Sun, 1 = Mon ...
    for (let i = 0; i < startDay; i++) {
      curWeek.push(null)
    }

    for (let i = 0; i < contributions.length; i++) {
      curWeek.push(contributions[i])
      if (curWeek.length === 7) {
        wList.push(curWeek)
        curWeek = []
      }
    }
    if (curWeek.length > 0) {
      while (curWeek.length < 7) curWeek.push(null)
      wList.push(curWeek)
    }

    // Determine month headers along top columns
    const mHeaders = []
    let lastMonth = -1
    wList.forEach((week, wIdx) => {
      const validDay = week.find((d) => d !== null)
      if (validDay) {
        const dObj = new Date(validDay.date + 'T00:00:00')
        const m = dObj.getMonth()
        if (m !== lastMonth && wIdx - (mHeaders[mHeaders.length - 1]?.col ?? -10) >= 3) {
          mHeaders.push({ label: MONTH_NAMES[m], col: wIdx })
          lastMonth = m
        }
      }
    })

    return { weeks: wList, monthHeaders: mHeaders }
  }, [contributions])

  const handleCellMouseEnter = useCallback((e, day) => {
    if (!day) return
    const cellRect = e.currentTarget.getBoundingClientRect()
    const cardRect = cardRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 720 }
    const maxX = Math.max(72, cardRect.width - 72)

    const x = Math.min(
      maxX,
      Math.max(72, cellRect.left - cardRect.left + cellRect.width / 2),
    )
    const cellTopInCard = cellRect.top - cardRect.top

    // Rows 0–1 sit under the card header, so place the tooltip below those.
    const placeBelow = cellTopInCard < 90

    setTooltip({
      count: day.count,
      date: day.date,
      formattedDate: formatDateForTooltip(day.date),
      x,
      y: placeBelow ? cellTopInCard + cellRect.height + 7 : cellTopInCard - 7,
      placeBelow,
    })
  }, [])

  const clearTooltip = useCallback(() => setTooltip(null), [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') clearTooltip()
    }
    window.addEventListener('scroll', clearTooltip, { passive: true })
    window.addEventListener('resize', clearTooltip)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', clearTooltip)
      window.removeEventListener('resize', clearTooltip)
      window.removeEventListener('keydown', onKey)
    }
  }, [clearTooltip])

  const hasData = weeks.length > 0
  const status = loading ? 'syncing' : failed ? (hasData ? 'offline copy' : 'unavailable') : 'live'

  return (
    <div
      ref={cardRef}
      style={GITHUB_FONT_STYLE}
      className="relative min-w-0 rounded-md border border-[#d0d7de] bg-white p-4 text-[#1f2328] sm:p-6"
      onMouseLeave={clearTooltip}
    >
      {/* Card Header Bar */}
      <div className="mb-4 flex flex-col justify-between gap-3 border-b border-[#d0d7de] pb-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <span className="rounded-md border border-[#d0d7de] bg-[#f6f8fa] p-1.5 text-[#1f2328]">
            <FaGithub className="size-4" />
          </span>
          <span className="text-[14px] font-normal leading-normal sm:text-[15px]">
            {!hasData && loading ? (
              'Loading contributions…'
            ) : !hasData && failed ? (
              'Contribution data is unavailable right now.'
            ) : (
              <>
                <strong>{totalCount ?? 0} contributions</strong> in the last year
              </>
            )}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          <a
            href={github.profileUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-[12px] font-normal text-[#656d76] underline decoration-[#d0d7de] underline-offset-2 transition-colors hover:text-[#0969da] hover:decoration-[#0969da]"
          >
            <span>@{github.username}</span>
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Calendar Heatmap: Scrollable on small screens, full-width on larger */}
      <div className="relative w-full overflow-x-auto">
        {!hasData && loading ? (
          <div className="flex animate-pulse flex-col items-center justify-center gap-2 py-8">
            <div className="h-4 w-48 rounded bg-[#f6f8fa]" />
            <div className="h-28 w-full max-w-[50rem] rounded border border-[#d0d7de] bg-[#f6f8fa]" />
          </div>
        ) : !hasData && failed ? (
          <div className="flex flex-col items-start gap-4 py-10">
            <p className="max-w-md text-sm text-[#656d76]">
              GitHub is not answering at the moment. The profile link above still works, and the
              heatmap will come back when the API does.
            </p>
            <button
              type="button"
              onClick={() => {
                setLoading(true)
                setFailed(false)
                setReloadKey((key) => key + 1)
              }}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 text-xs font-medium text-[#24292f] transition-colors hover:bg-[#eef1f4]"
            >
              <RotateCw className="size-3.5" />
              try again
            </button>
          </div>
        ) : (
          <div className="w-full min-w-[720px]">
            {/* SVG Heatmap: width="100%" with viewBox guarantees 53 weeks fit naturally */}
            <svg
              viewBox={`0 0 ${32 + Math.max(weeks.length, 52) * 13 + 6} 118`}
              className="h-auto w-full select-none overflow-visible pr-2"
              role="img"
              aria-label={`GitHub contribution heatmap for ${github.username}: ${totalCount ?? 0} contributions in the last year`}
            >
              {/* Month header labels */}
              {monthHeaders.map((mh, idx) => (
                <text
                  key={idx}
                  x={32 + mh.col * 13}
                  y={10}
                  fill="currentColor"
                  opacity="0.55"
                  fontSize="10"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {mh.label}
                </text>
              ))}

              {/* Day labels column */}
              {[
                { label: 'Mon', y: 37 },
                { label: 'Wed', y: 63 },
                { label: 'Fri', y: 89 },
              ].map((day) => (
                <text
                  key={day.label}
                  x={22}
                  y={day.y}
                  fill="currentColor"
                  opacity="0.55"
                  fontSize="9"
                  textAnchor="end"
                  fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {day.label}
                </text>
              ))}

              {/* Contribution Cells */}
              {weeks.map((week, wIdx) => {
                const colX = 32 + wIdx * 13
                return (
                  <g key={wIdx}>
                    {week.map((day, dIdx) => {
                      if (!day) return null
                      const rowY = 18 + dIdx * 13
                      const level = day.level ?? (day.count > 0 ? 1 : 0)
                      const bgColor = LEVEL_COLORS[level] || LEVEL_COLORS[0]

                      return (
                        <rect
                          key={dIdx}
                          x={colX}
                          y={rowY}
                          width={10}
                          height={10}
                          rx={2}
                          ry={2}
                          fill={bgColor}
                          stroke="rgba(27, 31, 36, 0.06)"
                          strokeWidth={0.5}
                          className="cursor-pointer transition-all duration-75 hover:stroke-foreground hover:stroke-1"
                          onMouseEnter={(e) => handleCellMouseEnter(e, day)}
                          onMouseLeave={clearTooltip}
                          onClick={(e) => handleCellMouseEnter(e, day)}
                        />
                      )
                    })}
                  </g>
                )
              })}
            </svg>
          </div>
        )}
      </div>

      {/* Hover Tooltip Popup */}
      {tooltip && (
        <div
          className={`pointer-events-none absolute z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-foreground bg-foreground px-2.5 py-1.5 text-[12px] font-normal leading-snug text-background shadow-2xl transition-all duration-75 ${
            tooltip.placeBelow ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{
            ...GITHUB_FONT_STYLE,
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          <div>
            <strong>
              {tooltip.count === 0
                ? 'No contributions'
                : tooltip.count === 1
                  ? '1 contribution'
                  : `${tooltip.count} contributions`}
            </strong>{' '}
            <span className="text-background/70">on {tooltip.formattedDate}</span>
          </div>
          {tooltip.placeBelow ? (
            <div className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-l border-t border-foreground bg-foreground" />
          ) : (
            <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-b border-r border-foreground bg-foreground" />
          )}
        </div>
      )}

      {/* Card Footer: Less -> More Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#d0d7de] pt-3 text-[12px] font-normal text-[#656d76]">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${
              failed ? 'bg-signal-violet' : loading ? 'bg-border-strong' : 'bg-signal-green'
            }`}
          />
          <span>{status}</span>
          {failed && hasData && (
            <button
              type="button"
              onClick={() => {
                setLoading(true)
                setFailed(false)
                setReloadKey((key) => key + 1)
              }}
              className="underline decoration-[#d0d7de] underline-offset-2 transition-colors hover:text-[#0969da] hover:decoration-[#0969da]"
            >
              refresh
            </button>
          )}
        </div>

        <div className="flex select-none items-center gap-2">
          <span>{LEVEL_LABELS[0]}</span>
          <div className="mx-1 flex gap-[3.5px]">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className="size-[14px] rounded-[3px]"
                style={{
                  backgroundColor: LEVEL_COLORS[lvl],
                  outline: '1px solid rgba(27, 31, 36, 0.06)',
                  outlineOffset: '-1px',
                }}
              />
            ))}
          </div>
          <span>{LEVEL_LABELS[1]}</span>
        </div>
      </div>
    </div>
  )
}

export default GitHubContributions
