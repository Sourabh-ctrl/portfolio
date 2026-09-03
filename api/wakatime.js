export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const apiKey = process.env.WAKATIME_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'WAKATIME_API_KEY not configured' })
  }

  try {
    const auth = Buffer.from(apiKey).toString('base64')
    const headers = { Authorization: `Basic ${auth}` }

    const now = new Date()
    const todayStr = now.toISOString().split('T')[0]
    const yest = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const yestStr = yest.toISOString().split('T')[0]

    const [sbRes, userRes, summariesRes] = await Promise.all([
      fetch('https://wakatime.com/api/v1/users/current/statusbar/today', { headers }),
      fetch('https://wakatime.com/api/v1/users/current', { headers }).catch(() => null),
      fetch(
        `https://wakatime.com/api/v1/users/current/summaries?start=${yestStr}&end=${todayStr}`,
        { headers },
      ).catch(() => null),
    ])

    const data = await sbRes.json()
    const userData = userRes && userRes.ok ? await userRes.json() : null
    const summariesData = summariesRes && summariesRes.ok ? await summariesRes.json() : null

    const grandTotal = data?.data?.grand_total
    const projects = data?.data?.projects || []
    const editors = data?.data?.editors || []

    const yestDay = summariesData?.data?.find((d) => d.range?.date === yestStr)
    const todayDay = summariesData?.data?.find((d) => d.range?.date === todayStr)

    const yesterdayWorked = yestDay?.grand_total?.text || '0 mins'
    const todayWorked = grandTotal?.text || todayDay?.grand_total?.text || '0 mins'

    const lastHeartbeat = userData?.data?.last_heartbeat_at
    const timeoutMin = userData?.data?.timeout || 15
    let isOnline = false
    if (lastHeartbeat) {
      const diffMinutes = (Date.now() - new Date(lastHeartbeat).getTime()) / (60 * 1000)
      isOnline = diffMinutes <= timeoutMin
    }

    const activeProject = userData?.data?.last_project || projects[0]?.name || 'portfolio'
    const activeEditor =
      userData?.data?.last_plugin_name ||
      editors.find((e) => e.name === 'VS Code')?.name ||
      editors[0]?.name ||
      'VS Code'

    return res.status(200).json({
      text: todayWorked,
      todayWorked,
      yesterdayWorked,
      digital: grandTotal?.digital || '0:00',
      seconds: grandTotal?.total_seconds || 0,
      editor: activeEditor,
      project: activeProject,
      isOnline,
      lastHeartbeat,
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
