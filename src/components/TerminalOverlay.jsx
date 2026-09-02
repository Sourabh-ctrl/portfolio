import { useEffect, useRef, useState } from 'react'
import { TerminalSquare, X, CornerDownLeft } from 'lucide-react'
import data from '../data.js'
import { sound } from '../utils/sound.js'

const COMMANDS = [
  { cmd: 'help', label: 'List available commands', action: null },
  { cmd: 'about', label: 'Who I am', href: '#skills' },
  { cmd: 'experience', label: 'Where I worked', href: '#experience' },
  { cmd: 'projects', label: 'What I built', href: '#projects' },
  { cmd: 'activity', label: 'My GitHub activity', href: '#activity' },
  { cmd: 'contact', label: 'Get in touch', href: '#contact' },
  { cmd: 'resume', label: 'Open my resume', action: 'resume' },
  { cmd: 'sudo hire-me', label: 'Skip the interview...', action: 'hire' },
  { cmd: 'clear', label: 'Clear screen', action: 'clear' },
]

function TerminalOverlay({ onOpenResume }) {
  const [open, setOpen] = useState(false)
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  const nav = (href) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const runCommand = (raw) => {
    const trimmed = raw.trim()
    const lower = trimmed.toLowerCase()
    const entry = { input: trimmed, output: null }
    const match = COMMANDS.find(
      (c) => c.cmd === lower || (c.cmd.includes(' ') ? lower === c.cmd : lower.startsWith(c.cmd.split(' ')[0])),
    )

    if (!match) {
      entry.output = `command not found: ${trimmed}. Type "help" to see available commands.`
    } else if (match.action === 'clear') {
      setHistory([])
      return
    } else if (match.action === 'hire') {
      entry.output = (
        <>
          <span className="text-accent">Nice choice. </span>
          The fastest path is my inbox: <span className="text-heading">{data.identity.email}</span>
        </>
      )
    } else if (match.action === 'resume') {
      onOpenResume?.()
      setOpen(false)
      return
    } else if (match.href) {
      setOpen(false)
      nav(match.href)
      return
    }

    setHistory((h) => [...h, entry])
  }

  const handleEnter = () => {
    sound.playClick()
    runCommand(input)
    setInput('')
  }

  useEffect(() => {
    if (!open) return undefined
    inputRef.current?.focus()
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [open, history])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        setHistory([])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => {
          sound.playClick()
          setOpen((v) => !v)
        }}
        aria-label="Open terminal"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-lg border border-lightest-navy/60 bg-light-navy/70 hover:border-accent/50 hover:text-accent px-4 py-2 text-sm font-sans font-medium text-lightest-slate shadow-sm transition-all active:scale-95 cursor-pointer"
      >
        <TerminalSquare className="size-4 text-accent" />
        <span>&gt; terminal</span>
      </button>

      {open && (
        <div
          className="fixed inset-x-0 top-20 z-[90] mx-auto flex w-full max-w-2xl px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Terminal"
        >
          <div className="w-full overflow-hidden rounded-2xl border border-accent/40 bg-[#0d1117] text-[#e6edf3] shadow-2xl animate-open">
            <div className="flex items-center justify-between border-b border-[#21262d] px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-xs font-mono text-[#8b949e]">
                {data.identity.firstName}@portfolio:~$
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
                className="flex h-6 w-6 items-center justify-center rounded text-slate hover:text-heading transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <div
              ref={bodyRef}
              className="max-h-[55vh] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
            >
              <p className="mb-2 text-[#8b949e]">
                Welcome, {data.identity.name}. Type a command below or press <kbd className="rounded border border-[#30363d] px-1">Ctrl</kbd>+<kbd className="rounded border border-[#30363d] px-1">L</kbd> to clear.
              </p>
              {history.map((h, i) => (
                <div key={i}>
                  <p className="text-[#e6edf3]">
                    <span className="text-accent">{data.identity.firstName}@portfolio:~$</span>{' '}
                    {h.input}
                  </p>
                  {h.output && <p className="mt-0.5 mb-1.5 whitespace-pre-wrap text-light-slate">{h.output}</p>}
                </div>
              ))}

              <div className="flex items-center gap-2">
                <span className="text-accent shrink-0">
                  {data.identity.firstName}@portfolio:~$
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEnter()
                    if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      const last = history[history.length - 1]
                      if (last) setInput(last.input)
                    }
                  }}
                  placeholder="type help"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  className="flex-1 bg-transparent text-[#e6edf3] outline-none placeholder:text-[#484f58] caret-accent"
                />
                <button
                  type="button"
                  onClick={handleEnter}
                  aria-label="Run command"
                  className="flex h-6 w-6 items-center justify-center rounded text-slate hover:text-accent transition-colors"
                >
                  <CornerDownLeft className="size-3.5" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[#21262d] pt-3 text-[12px] text-[#8b949e]">
                {COMMANDS.filter((c) => c.action !== 'clear').map((c) => (
                  <button
                    key={c.cmd}
                    type="button"
                    onClick={() => {
                      sound.playClick()
                      runCommand(c.cmd)
                    }}
                    title={c.label}
                    className="rounded-md border border-[#30363d] px-2 py-1 font-mono text-accent hover:bg-[#161b22] hover:border-accent/50 transition-colors"
                  >
                    {c.cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TerminalOverlay
