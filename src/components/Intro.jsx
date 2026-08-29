import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { TypeAnimation } from 'react-type-animation'
import data from '../data.js'
import './Intro.css'

function AsciiPortrait() {
  const [charGrid, setCharGrid] = useState('')

  // Tuning constants — tweak these to get a good render once your own
  // portrait is in place. Character set orders darkest -> brightest.
  const CHAR_SET = '@%#*+=-:. '
  const COLUMNS = 100
  const CONTRAST = 1.6

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = data.hero.portrait

    const render = () => {
      const ratio = img.height / img.width
      const rows = Math.round(COLUMNS * ratio * 0.5)
      const canvas = document.createElement('canvas')
      canvas.width = COLUMNS
      canvas.height = rows
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(img, 0, 0, COLUMNS, rows)
      const { data: px } = ctx.getImageData(0, 0, COLUMNS, rows)

      const glyphs = [...CHAR_SET]
      const maxIndex = glyphs.length - 1
      const lines = []
      for (let y = 0; y < rows; y += 1) {
        let line = ''
        for (let x = 0; x < COLUMNS; x += 1) {
          const i = (y * COLUMNS + x) * 4
          let lum = 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]
          lum -= 128 * (CONTRAST - 1)
          lum = Math.max(0, Math.min(255, lum))
          const idx = Math.floor((lum / 255) * maxIndex)
          line += glyphs[Math.min(maxIndex, Math.max(0, idx))]
        }
        lines.push(line)
      }
      if (!cancelled) {
        setCharGrid(lines.join('\n'))
      }
    }

    if (img.complete) render()
    else img.onload = render
    img.onerror = () => {
      if (cancelled) return
      const rows = 28
      const glyph = '.'
      const lines = []
      for (let y = 0; y < rows; y += 1) {
        lines.push(glyph.repeat(COLUMNS))
      }
      setCharGrid(lines.join('\n'))
    }
    return () => {
      cancelled = true
    }
  }, [CHAR_SET, COLUMNS, CONTRAST])

  return (
    <div className="ascii-portrait" aria-hidden="true">
      <pre className="ascii-text">{charGrid}</pre>
    </div>
  )
}

function Intro() {
  const { identity, hero } = data
  return (
    <section className="intro" id="intro">
      <AsciiPortrait />
      <div className="intro-overlay">
        <p className="intro-greeting">{hero.greeting}</p>
        <Typography variant="h1" className="intro-name">
          {identity.name}
        </Typography>
        <Typography variant="h2" className="intro-role">
          {identity.role}
        </Typography>
        <div className="intro-tagline">
          <TypeAnimation
            sequence={[...hero.taglines.flatMap((line) => [line, 2000])].slice(0, -1)}
            wrapper="span"
            speed={45}
            repeat={Infinity}
          />
        </div>
      </div>
    </section>
  )
}

export default Intro