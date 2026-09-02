import { useEffect, useMemo, useRef, useState } from 'react'
import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'

// Exact official GitHub dark theme contribution level colors
const LEVEL_COLORS = {
  0: '#161b22', // GitHub empty square
  1: '#0e4429', // GitHub level 1 green
  2: '#006d32', // GitHub level 2 green
  3: '#26a641', // GitHub level 3 green
  4: '#39d353', // GitHub level 4 green
}

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

function GitHubOctocat({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function createDefaultContributions() {
  const days = []
  const today = new Date()
  for (let i = 365; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push({
      date: d.toISOString().split('T')[0],
      count: 0,
      level: 0,
    })
  }
  return days
}

// GitHub's official system font stack
const GITHUB_FONT_STYLE = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
}

function GitHubContributions() {
  const { github } = data
  const [contributions, setContributions] = useState(() => {
    const cacheKey = `gh_contributions_${github.username}`
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          if (parsed?.contributions?.length) return parsed.contributions
        } catch {
          // ignore
        }
      }
    }
    return createDefaultContributions()
  })

  const [totalCount, setTotalCount] = useState(() => {
    const cacheKey = `gh_contributions_${github.username}`
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          if (parsed?.total != null) return parsed.total
        } catch {
          // ignore
        }
      }
    }
    return null
  })

  const [loading, setLoading] = useState(false)
  const [tooltip, setTooltip] = useState(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const cacheKey = `gh_contributions_${github.username}`
    const fetchUrl =
      github.apiUrl || `https://github-contributions-api.jogruber.de/v4/${github.username}?y=last`

    fetch(fetchUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        return res.json()
      })
      .then((json) => {
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
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch GitHub contributions:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [github.username, github.apiUrl])

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

  const handleCellMouseEnter = (e, day) => {
    if (!day) return
    const cellRect = e.currentTarget.getBoundingClientRect()
    const cardRect = cardRef.current?.getBoundingClientRect() || { left: 0, top: 0 }

    const x = cellRect.left - cardRect.left + cellRect.width / 2
    const cellTopInCard = cellRect.top - cardRect.top

    // If cell is too close to top of card (e.g. rows 0, 1), place tooltip below cell so it never clips into header
    const placeBelow = cellTopInCard < 90

    setTooltip({
      count: day.count,
      date: day.date,
      formattedDate: formatDateForTooltip(day.date),
      x,
      y: placeBelow ? cellTopInCard + cellRect.height + 7 : cellTopInCard - 7,
      placeBelow,
    })
  }

  const handleCellMouseLeave = () => {
    setTooltip(null)
  }

  return (
    <section
      className="pt-16 pb-12 scroll-mt-20"
      id="activity"
    >
      <FadeInSection>
        {/* Section Heading matching visheshxdevs header style */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-heading flex items-center gap-2">
            <span className="text-accent font-sans mr-0.5">/</span>
            <span>GitHub Activity</span>
          </h2>
          <p className="text-sm font-sans text-slate mt-1">
            <b className="font-semibold text-lightest-slate">{github.username}</b>'s coding journey over the past year
          </p>
        </div>

        {/* GitHub Contribution Card in pure black */}
        <div
          ref={cardRef}
          style={GITHUB_FONT_STYLE}
          className="github-card relative bg-[#0d1117] border border-neutral-800 rounded-xl p-4 sm:p-6 shadow-2xl backdrop-blur-md text-[#e6edf3]"
        >
          {/* Card Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#21262d]">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-md bg-[#161b22] text-[#39d353] border border-[#30363d]">
                <GitHubOctocat className="w-4 h-4" />
              </span>
              <span className="text-[#e6edf3] text-[14px] sm:text-[15px] font-normal leading-normal">
                {loading ? (
                  'Loading contributions...'
                ) : (
                  <>
                    <strong >
                      {totalCount ?? 0} contributions
                    </strong>{' '}
                    in the last year
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
              <a
                href={github.profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-[12px] text-[#58a6ff] hover:text-[#79c0ff] hover:underline font-normal"
              >
                <span>@{github.username}</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Calendar Heatmap: Scrollable on small screens, full-width on larger */}
          <div className="relative w-full overflow-x-auto">
            {loading && !weeks.length ? (
              <div className="flex flex-col gap-2 py-8 animate-pulse items-center justify-center">
                <div className="h-4 w-48 bg-lightest-navy/40 rounded"></div>
                <div className="h-28 w-full max-w-[50rem] bg-light-navy rounded border border-lightest-navy/60"></div>
              </div>
            ) : (
              <div className="min-w-[720px] w-full">
                {/* SVG Heatmap: width="100%" with viewBox guarantees 53 weeks fit naturally */}
                <svg
                  viewBox={`0 0 ${32 + Math.max(weeks.length, 52) * 13 + 6} 118`}
                  className="w-full h-auto overflow-visible select-none pr-2"
                >
                  {/* Month header labels */}
                  {monthHeaders.map((mh, idx) => (
                    <text
                      key={idx}
                      x={32 + mh.col * 13}
                      y={10}
                      fill="#7d8590"
                      fontSize="10"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    >
                      {mh.label}
                    </text>
                  ))}

                  {/* Day labels column */}
                  <text
                    x={22}
                    y={37}
                    fill="#7d8590"
                    fontSize="9"
                    textAnchor="end"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  >
                    Mon
                  </text>
                  <text
                    x={22}
                    y={63}
                    fill="#7d8590"
                    fontSize="9"
                    textAnchor="end"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  >
                    Wed
                  </text>
                  <text
                    x={22}
                    y={89}
                    fill="#7d8590"
                    fontSize="9"
                    textAnchor="end"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  >
                    Fri
                  </text>

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
                              stroke="rgba(255, 255, 255, 0.04)"
                              strokeWidth={0.5}
                              className="cursor-pointer transition-all duration-75 hover:stroke-white hover:stroke-1"
                              onMouseEnter={(e) => handleCellMouseEnter(e, day)}
                              onMouseLeave={handleCellMouseLeave}
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
              className={`absolute z-50 pointer-events-none -translate-x-1/2 px-2.5 py-1.5 bg-[#161b22] text-[#f0f6fc] text-[12px] font-normal leading-snug rounded-md shadow-2xl border border-[#30363d] whitespace-nowrap transition-all duration-75 ${
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
                <span className="text-[#8b949e]">on {tooltip.formattedDate}</span>
              </div>
              {/* Tooltip arrow */}
              {tooltip.placeBelow ? (
                <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-2 h-2 bg-[#161b22] border-l border-t border-[#30363d] rotate-45" />
              ) : (
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-[#161b22] border-r border-b border-[#30363d] rotate-45" />
              )}
            </div>
          )}

          {/* Card Footer: Less -> More Legend */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-[#21262d] text-[12px] font-normal text-[#7d8590]">
            <div className="flex items-center gap-2 select-none">
              <span>Less</span>
              <div className="flex gap-[3.5px] mx-1">
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    className="w-[14px] h-[14px] rounded-[3px]"
                    style={{
                      backgroundColor: LEVEL_COLORS[lvl],
                      outline: '1px solid rgba(255, 255, 255, 0.05)',
                      outlineOffset: '-1px',
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}

export default GitHubContributions