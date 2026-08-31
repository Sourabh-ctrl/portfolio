import { useEffect, useState } from 'react'
import data from '../data.js'

function loadJSONP(url, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const cb = `__wakatime_${Date.now()}_${Math.floor(Math.random() * 1e6)}`
    const script = document.createElement('script')

    function cleanup() {
      clearTimeout(timer)
      delete window[cb]
      script.remove()
    }

    const timer = setTimeout(() => {
      cleanup()
      reject(new Error('WakaTime embed load timed out'))
    }, timeoutMs)

    window[cb] = (payload) => {
      cleanup()
      resolve(payload)
    }
    script.onerror = () => {
      cleanup()
      reject(new Error('WakaTime embed script failed'))
    }
    script.src = `${url}${url.includes('?') ? '&' : '?'}callback=${cb}`
    document.head.appendChild(script)
  })
}

function formatSeconds(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0 min'
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.round((seconds % 3600) / 60)
  const parts = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0 || days > 0) parts.push(`${hours}h`)
  if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`)
  return parts.join(' ')
}

// Handles the totals embed shape { data: { grand_total, range } } and the
// per-day array shape { data: [{ grand_total, range }, ...] }.
function parseEmbed(payload) {
  if (!payload || !payload.data) return null
  let grandTotal = payload.data.grand_total
  let range = payload.data.range
  if (Array.isArray(payload.data) && payload.data.length > 0) {
    grandTotal = payload.data[0].grand_total
    range = payload.data[0].range
  }
  if (!grandTotal) return null
  return {
    text:
      typeof grandTotal.human_readable_total === 'string'
        ? grandTotal.human_readable_total
        : formatSeconds(grandTotal.total_seconds),
    range: range ? range.range || range.text || '' : '',
  }
}

function VSCodeIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479l1.321 1.202c.373.34.934.364 1.334.057l4.063-3.128 9.46 8.63c.465.424 1.135.534 1.706.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  )
}

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="absolute inline-flex h-full w-full rounded-full bg-green opacity-75 animate-ping"
        aria-hidden="true"
      />
      <span
        className="relative inline-flex h-2 w-2 rounded-full bg-green"
        aria-hidden="true"
      />
    </span>
  )
}

function WakaTime() {
  const { wakatime } = data
  const [stats, setStats] = useState({
    editor: wakatime?.editor || 'VS Code',
    today: wakatime?.todayWorked || '3 hrs 40 mins',
    yesterday: wakatime?.yesterdayWorked || '4 hrs 15 mins',
    project: 'portfolio',
    isOnline: true,
  })

  const username = wakatime?.username || '67ecb5b0-b4d6-4900-950e-62baa85753f5'
  const profileUrl =
    wakatime?.profileUrl || (username ? `https://wakatime.com/@${username}` : '')
  const todayUrl = wakatime?.todayEmbedUrl || ''
  const totalUrl = wakatime?.totalEmbedUrl || ''
  const refreshMs = wakatime?.refreshMs || 5 * 60 * 1000

  useEffect(() => {
    let cancelled = false

    const fetchWakaTimeData = async () => {
      // 1. Try local dev proxy endpoint (exact live statusbar from VS Code)
      try {
        const baseUrl = import.meta.env.BASE_URL || '/'
        const localApiUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}api/wakatime/today`
        const localRes = await fetch(localApiUrl)
        if (localRes.ok) {
          const localJson = await localRes.json()
          if (localJson && localJson.text && !cancelled) {
            setStats({
              editor: localJson.editor || 'VS Code',
              today: localJson.text,
              yesterday: wakatime?.yesterdayWorked || '4 hrs 15 mins',
              project: localJson.project || 'portfolio',
              isOnline: Boolean(localJson.isOnline),
            })
            return
          }
        }
      } catch {
        // Continue to public / embed fallbacks
      }

      // 2. Try public WakaTime API stats endpoint
      if (username) {
        try {
          const res = await fetch(
            `https://wakatime.com/api/v1/users/${username}/stats/last_7_days`,
          )
          if (res.ok) {
            const json = await res.json()
            if (json?.data && !cancelled) {
              const d = json.data
              const primaryEditor = d.editors?.[0]?.name || 'VS Code'
              const dailyAvg = d.human_readable_daily_average
              const totalTime = d.human_readable_total

              if (dailyAvg || totalTime) {
                setStats((prev) => ({
                  ...prev,
                  editor: primaryEditor,
                  today: dailyAvg ? `${dailyAvg} daily avg` : prev.today,
                  isOnline: true,
                }))
              }
            }
          }
        } catch {
          // Graceful fallback to embed or default
        }
      }

      // 3. Try JSONP Embed widget if configured
      if (todayUrl || totalUrl) {
        try {
          const jobs = []
          if (todayUrl) jobs.push(loadJSONP(todayUrl))
          if (totalUrl) jobs.push(loadJSONP(totalUrl))
          const [todayPayload, totalPayload] = await Promise.all(jobs)

          if (!cancelled) {
            const parsedToday = todayPayload ? parseEmbed(todayPayload) : null
            const parsedTotal = totalPayload ? parseEmbed(totalPayload) : null

            if (parsedToday?.text || parsedTotal?.text) {
              setStats((prev) => ({
                ...prev,
                today: parsedToday?.text ? parsedToday.text : prev.today,
                yesterday: parsedTotal?.text ? `${parsedTotal.text} all-time` : prev.yesterday,
                isOnline: true,
              }))
            }
          }
        } catch {
          // fallback
        }
      }
    }

    fetchWakaTimeData()
    const interval = setInterval(fetchWakaTimeData, refreshMs)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [username, todayUrl, totalUrl, refreshMs, wakatime?.yesterdayWorked])

  if (!profileUrl && !username) return null

  const isOnline = Boolean(stats.isOnline)
  const todayTime = stats.today
  const projectName = stats.project || 'portfolio'
  const editorName = stats.editor || 'VS Code'

  return (
    <div className="relative group inline-flex items-center">
      {/* Online / Offline status button trigger */}
      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Status: ${isOnline ? 'online' : 'offline'}. Coding for ${todayTime} on ${projectName}`}
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-mono font-medium transition-all duration-200 cursor-pointer select-none shadow-sm ${
          isOnline
            ? 'border-green/40 bg-[#112240] text-green hover:border-green hover:bg-[#1b2a47] hover:shadow-[0_0_12px_rgba(100,255,218,0.2)]'
            : 'border-slate/30 bg-[#112240]/80 text-slate hover:border-slate/60 hover:text-light-slate hover:bg-[#1b2a47]'
        }`}
      >
        {isOnline ? (
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"
              aria-hidden="true"
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
          </span>
        ) : (
          <span className="inline-flex h-2 w-2 rounded-full bg-slate/60" aria-hidden="true" />
        )}
        <span>{isOnline ? 'online' : 'offline'}</span>
      </a>

      {/* Hover popover card */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 z-50 pointer-events-none group-hover:pointer-events-auto opacity-0 translate-y-1 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 ease-out origin-top"
        role="tooltip"
      >
        <div className="relative rounded-lg border border-lightest-navy/90 bg-[#0d1b2e]/95 px-3.5 py-2.5 text-xs whitespace-nowrap text-light-slate shadow-xl backdrop-blur-md font-sans min-w-[190px]">
          {/* Arrow */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0 h-2 w-2 -translate-y-1/2 rotate-45 border-t border-l border-lightest-navy/90 bg-[#0d1b2e]" />

          {/* Today's time */}
          <div className="flex items-center justify-between gap-3 text-[13px] font-semibold text-white">
            <span className="flex items-center gap-1.5">
              <span className="text-green">⚡</span>
              <span>Today's Time</span>
            </span>
            <span className="font-mono text-green text-xs font-bold">{todayTime}</span>
          </div>

          {/* Working project */}
          <div className="mt-2 pt-2 border-t border-lightest-navy/70 flex items-center justify-between gap-3 text-[12px]">
            <span className="text-slate">Working on:</span>
            <span className="font-semibold text-lightest-slate truncate max-w-[120px] font-mono">
              {projectName}
            </span>
          </div>

          {/* Editor & Status detail */}
          <div className="mt-1 flex items-center justify-between gap-3 text-[11px] text-slate">
            <span className="flex items-center gap-1">
              <VSCodeIcon className="w-3 h-3 text-[#007acc] shrink-0" />
              <span>{editorName}</span>
            </span>
            <span className={isOnline ? 'text-emerald-400' : 'text-slate'}>
              {isOnline ? 'active now' : 'offline'}
            </span>
          </div>

          {/* WakaTime profile link */}
          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 pt-2 border-t border-lightest-navy/60 text-[11px] text-[#58a6ff] hover:text-[#79c0ff] hover:underline flex items-center justify-between transition-colors"
            >
              <span>View WakaTime profile</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default WakaTime