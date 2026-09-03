const CHARS = ' .:-=+*#%@'.split('')

export function imageToAsciiParticles(imageSrc, targetSize) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      try {
        const particles = processImage(img, targetSize)
        resolve(particles)
      } catch (err) {
        reject(err)
      }
    }
    img.onerror = () => reject(new Error('Image failed to load'))
    img.src = imageSrc
  })
}

// Estimate the dominant background color by sampling the outer border ring
function detectBackground(pixels, width, height) {
  const buckets = new Map()
  const w = 2 // border thickness

  const add = (x, y) => {
    const i = (y * width + x) * 4
    const a = pixels[i + 3]
    if (a < 128) return
    const r = pixels[i]
    const g = pixels[i + 1]
    const b = pixels[i + 2]
    // quantize color into buckets
    const key = `${r >> 4},${g >> 4},${b >> 4}`
    if (!buckets.has(key)) buckets.set(key, { r, g, b, count: 0 })
    const entry = buckets.get(key)
    entry.count++
    entry.r += r
    entry.g += g
    entry.b += b
  }

  for (let x = 0; x < width; x++) {
    for (let t = 0; t < w; t++) {
      add(x, t)
      add(x, height - 1 - t)
    }
  }
  for (let y = 0; y < height; y++) {
    for (let t = 0; t < w; t++) {
      add(t, y)
      add(width - 1 - t, y)
    }
  }

  let best = null
  for (const entry of buckets.values()) {
    entry.r = Math.round(entry.r / entry.count)
    entry.g = Math.round(entry.g / entry.count)
    entry.b = Math.round(entry.b / entry.count)
    if (!best || entry.count > best.count) best = entry
  }

  return best ? { r: best.r, g: best.g, b: best.b } : { r: 0, g: 0, b: 0 }
}

function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}

function processImage(img, targetSize) {
  const offscreen = document.createElement('canvas')
  const ctx = offscreen.getContext('2d')
  offscreen.width = targetSize
  offscreen.height = targetSize

  const scale = 0.85
  const imgAspect = img.width / img.height

  let drawHeight = targetSize * scale
  let drawWidth = drawHeight * imgAspect

  if (drawWidth > targetSize * scale) {
    drawWidth = targetSize * scale
    drawHeight = drawWidth / imgAspect
  }

  const offsetX = (targetSize - drawWidth) / 2
  const offsetY = (targetSize - drawHeight) / 2

  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  const imageData = ctx.getImageData(0, 0, targetSize, targetSize)
  const pixels = imageData.data

  const bg = detectBackground(pixels, targetSize, targetSize)
  const bgThreshold = 70

  const isMobile = targetSize <= 280
  const fontSize = isMobile ? 4 : 5
  const colGap = fontSize * 0.7
  const rowGap = fontSize * 1.1

  const particles = []

  for (let y = 0; y < targetSize; y += rowGap) {
    for (let x = 0; x < targetSize; x += colGap) {
      const i = (Math.floor(y) * targetSize + Math.floor(x)) * 4
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]

      if (a <= 128) continue

      // Remove pixels that are close to the detected background color
      const dist = colorDistance(r, g, b, bg.r, bg.g, bg.b)
      if (dist < bgThreshold) continue

      const brightness = (r + g + b) / (3 * 255)
      const charIndex = Math.floor(brightness * (CHARS.length - 1))
      const alpha = Number((0.55 + brightness * 0.35).toFixed(2))

      particles.push({
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
        char: CHARS[charIndex] || ' ',
        alpha,
      })
    }
  }

  return particles
}

export function calculateAsciiSize(width) {
  if (width <= 480) return Math.min(180, width - 40)
  if (width <= 768) return Math.min(240, width - 60)
  return 280
}
