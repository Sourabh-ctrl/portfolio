import { useEffect, useMemo, useRef, useState } from 'react'
import data from '../data.js'
import FadeInSection from './FadeInSection.jsx'
import WakaTime from './WakaTime.jsx'

// GitHub dark mode level colors
const LEVEL_COLORS = {
  0: '#161b22',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
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
      className="max-w-[70rem] mx-auto px-5 py-12 md:py-16"
      id="github"
    >
      <FadeInSection>
        {/* Section Heading */}
        <h2 className="flex items-center gap-4 text-white text-[clamp(1.4rem,3vw,2rem)] mb-6 whitespace-nowrap font-serif after:content-[''] after:block after:h-px after:flex-1 after:bg-lightest-navy/60">
          <span className="text-green font-sans mr-0.5">/</span>
          <span>activity</span>
        </h2>

        {/* GitHub Contribution Card styled exactly like GitHub Dark Theme */}
        <div
          ref={cardRef}
          style={GITHUB_FONT_STYLE}
          className="relative bg-[#0d1117] border border-[#30363d] rounded-lg p-4 sm:p-6 shadow-2xl transition-all duration-300 hover:border-[#8b949e]/40 text-[#e6edf3]"
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
                    <strong className="font-semibold text-white">
                      {totalCount ?? 0} contributions
                    </strong>{' '}
                    in the last year
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
              <WakaTime />
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

          {/* Calendar Heatmap Container with Horizontal Scroll support */}
          <div className="relative overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-transparent">
            {loading && !weeks.length ? (
              <div className="flex flex-col gap-2 py-8 animate-pulse items-center justify-center">
                <div className="h-4 w-48 bg-[#21262d] rounded"></div>
                <div className="h-28 w-full max-w-[50rem] bg-[#161b22] rounded border border-[#30363d]"></div>
              </div>
            ) : (
              <div className="inline-block min-w-max">
                {/* Month labels row */}
                <div className="flex text-[12px] font-normal text-[#7d8590] mb-2 h-4 relative pl-9 select-none">
                  {monthHeaders.map((mh, idx) => (
                    <span
                      key={idx}
                      className="absolute leading-none"
                      style={{ left: `${36 + mh.col * 17.5}px` }}
                    >
                      {mh.label}
                    </span>
                  ))}
                </div>

                {/* Day Labels + Grid Columns */}
                <div className="flex gap-[3.5px] items-start">
                  {/* Day labels column: Mon, Wed, Fri */}
                  <div className="flex flex-col gap-[3.5px] text-[12px] font-normal text-[#7d8590] pr-2 select-none w-8 text-right">
                    <span className="h-[14px] leading-[14px]"></span>
                    <span className="h-[14px] leading-[14px]">Mon</span>
                    <span className="h-[14px] leading-[14px]"></span>
                    <span className="h-[14px] leading-[14px]">Wed</span>
                    <span className="h-[14px] leading-[14px]"></span>
                    <span className="h-[14px] leading-[14px]">Fri</span>
                    <span className="h-[14px] leading-[14px]"></span>
                  </div>

                  {/* 53 Columns of 7 Day Cells */}
                  <div className="flex gap-[3.5px]">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3.5px]">
                        {week.map((day, dIdx) => {
                          if (!day) {
                            return (
                              <div
                                key={dIdx}
                                className="w-[14px] h-[14px] bg-transparent"
                                aria-hidden="true"
                              />
                            )
                          }

                          const level = day.level ?? (day.count > 0 ? 1 : 0)
                          const bgColor = LEVEL_COLORS[level] || LEVEL_COLORS[0]

                          return (
                            <div
                              key={dIdx}
                              onMouseEnter={(e) => handleCellMouseEnter(e, day)}
                              onMouseLeave={handleCellMouseLeave}
                              onClick={(e) => handleCellMouseEnter(e, day)}
                              className="w-[14px] h-[14px] rounded-[3px] cursor-pointer transition-colors duration-75 hover:outline hover:outline-[1.5px] hover:outline-white/80 hover:outline-offset-[-1px]"
                              style={{
                                backgroundColor: bgColor,
                                outline: '1px solid rgba(255, 255, 255, 0.04)',
                                outlineOffset: '-1px',
                              }}
                              data-date={day.date}
                              data-count={day.count}
                              data-level={level}
                              aria-label={`${day.count} contributions on ${day.date}`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hover Tooltip Popup - rendered outside the overflow container so it never gets clipped or hidden */}
          {tooltip && (
            <div
              style={GITHUB_FONT_STYLE}
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
                <strong className="font-semibold text-white">
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

