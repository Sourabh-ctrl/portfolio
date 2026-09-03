import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { Buffer } from 'node:buffer'

function wakatimeDevPlugin() {
  return {
    name: 'wakatime-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.includes('/api/wakatime')) return next()

        const env = loadEnv('development', process.cwd(), '')
        const apiKey = env.WAKATIME_API_KEY || ''
        if (!apiKey) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: 'WAKATIME_API_KEY not set in .env.local' }))
        }

        try {
          const auth = Buffer.from(apiKey).toString('base64')
          const headers = { Authorization: `Basic ${auth}` }

          const now = new Date()
          const todayStr = now.toISOString().split('T')[0]
          const yestStr = new Date(now.getTime() - 86400000).toISOString().split('T')[0]

          const [sbRes, userRes, summariesRes] = await Promise.all([
            fetch('https://wakatime.com/api/v1/users/current/statusbar/today', { headers }),
            fetch('https://wakatime.com/api/v1/users/current', { headers }).catch(() => null),
            fetch(`https://wakatime.com/api/v1/users/current/summaries?start=${yestStr}&end=${todayStr}`, { headers }).catch(() => null),
          ])

          const data = await sbRes.json()
          const userData = userRes?.ok ? await userRes.json() : null
          const summariesData = summariesRes?.ok ? await summariesRes.json() : null

          const grandTotal = data?.data?.grand_total
          const projects = data?.data?.projects || []
          const editors = data?.data?.editors || []

          const yestDay = summariesData?.data?.find(d => d.range?.date === yestStr)
          const yesterdayWorked = yestDay?.grand_total?.text || '0 mins'
          const todayWorked = grandTotal?.text || '0 mins'

          const lastHeartbeat = userData?.data?.last_heartbeat_at
          const timeoutMin = userData?.data?.timeout || 15
          const isOnline = lastHeartbeat
            ? (Date.now() - new Date(lastHeartbeat).getTime()) / 60000 <= timeoutMin
            : false

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          return res.end(JSON.stringify({
            text: todayWorked,
            todayWorked,
            yesterdayWorked,
            digital: grandTotal?.digital || '0:00',
            seconds: grandTotal?.total_seconds || 0,
            editor: userData?.data?.last_plugin_name || editors[0]?.name || 'VS Code',
            project: userData?.data?.last_project || projects[0]?.name || 'portfolio',
            isOnline,
            lastHeartbeat,
          }))
        } catch (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/portfolio/',
  plugins: [react(), tailwindcss(), wakatimeDevPlugin()],
  server: {
    host: true,
    port: 5173,
  },
})
