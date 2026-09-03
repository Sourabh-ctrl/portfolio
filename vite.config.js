import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import process from 'node:process'
import { Buffer } from 'node:buffer'

function wakatimeDevApiPlugin() {
  return {
    name: 'wakatime-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (url.includes('/api/wakatime/today')) {
          try {
            const cfgPath = path.join(os.homedir(), '.wakatime.cfg')
            let apiKey = process.env.WAKATIME_API_KEY || ''
            if (!apiKey && fs.existsSync(cfgPath)) {
              const text = fs.readFileSync(cfgPath, 'utf8')
              const match = text.match(/api_key\s*=\s*(.+)/)
              if (match) apiKey = match[1].trim()
            }

            if (!apiKey) {
              res.statusCode = 404
              res.setHeader('Content-Type', 'application/json')
              return res.end(JSON.stringify({ error: 'No WakaTime API key found' }))
            }

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

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')
            return res.end(
              JSON.stringify({
                text: todayWorked,
                todayWorked,
                yesterdayWorked,
                digital: grandTotal?.digital || '0:00',
                seconds: grandTotal?.total_seconds || 0,
                editor: activeEditor,
                project: activeProject,
                isOnline,
                lastHeartbeat,
              }),
            )
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ error: err.message }))
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/portfolio/',
  plugins: [react(), tailwindcss(), wakatimeDevApiPlugin()],
  server: {
    host: true,
    port: 5173,
  },
})