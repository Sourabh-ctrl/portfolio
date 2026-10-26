import { Buffer } from 'node:buffer'
import process from 'node:process'

const API_ROOT = 'https://wakatime.com/api/v1'

async function wakaFetch(path, headers) {
  const res = await fetch(`${API_ROOT}${path}`, { headers })
  if (!res.ok) throw new Error(`WakaTime ${path} returned ${res.status}`)
  return res.json()
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.WAKATIME_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'WakaTime is not configured' })
  }

  const headers = {
    Authorization: `Basic ${Buffer.from(apiKey).toString('base64')}`,
  }

  try {
    const [status, user, yesterday] = await Promise.all([
      wakaFetch('/users/current/statusbar/today', headers),
      wakaFetch('/users/current', headers).catch(() => null),
      wakaFetch('/users/current/summaries?range=yesterday', headers).catch(() => null),
    ])

    const grandTotal = status?.data?.grand_total
    if (!grandTotal?.text) {
      return res.status(502).json({ error: 'WakaTime returned no activity' })
    }

    const lastHeartbeat = user?.data?.last_heartbeat_at
    const timeout = user?.data?.timeout || 15
    const isOnline = lastHeartbeat
      ? (Date.now() - new Date(lastHeartbeat).getTime()) / 60000 <= timeout
      : false

    const editors = status?.data?.editors || []
    const projects = status?.data?.projects || []
    const yesterdayTotal = yesterday?.data?.[0]?.grand_total?.text

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=240')

    return res.status(200).json({
      todayWorked: grandTotal.text,
      yesterdayWorked: yesterdayTotal || null,
      seconds: grandTotal.total_seconds || 0,
      editor: user?.data?.last_plugin_name || editors[0]?.name || null,
      project: user?.data?.last_project || projects[0]?.name || null,
      isOnline,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('WakaTime request failed:', error.message)
    return res.status(502).json({ error: 'WakaTime is unavailable' })
  }
}
