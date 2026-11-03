#!/usr/bin/env node
/**
 * ARCHIVE OF BECOMING — placeholder media generator.
 *
 * Generates neutral, textured SVG stills (and one looping clip, via ffmpeg
 * if available) for every landingMedia / board-artifact entry referenced
 * in src/data/projects.js.
 *
 * These exist ONLY so the layout can be built and judged with real
 * proportions before real project media is ready. Replace the files in
 * src/assets/placeholders/<project-slug>/ with real exports — the `src`
 * imports in src/data/projects.js just need to keep pointing at real
 * files with the same or updated names.
 *
 * Run: npm run generate:placeholders
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../src/assets/placeholders')

// aspectRatio -> [w, h] used only to size the generated artwork
const RATIOS = {
  '1:1': [1200, 1200],
  '3:4': [1200, 1600],
  '4:3': [1600, 1200],
  '16:9': [1920, 1080],
  '9:16': [1080, 1920],
}

// One warm-neutral tone per project (kept desaturated on purpose —
// real project imagery is what should carry color on this site).
const PROJECT_TONES = {
  'remote-fitting-system': { base: '#c9c3b6', line: '#8f887a' },
  'digital-fashion-archive': { base: '#cbb9ae', line: '#8f7a6c' },
  'virtual-styling-environment': { base: '#bcb8c4', line: '#817c8d' },
  ona: { base: '#b9c0bd', line: '#7c8582' },
  'fashion-interactive-installation': { base: '#c4c2ab', line: '#8a886d' },
  'experimental-fashion-commerce': { base: '#c7b8bd', line: '#8b7680' },
  'archive-of-becoming': { base: '#aeb8ba', line: '#6f7a7c' },
  'experimental-systems': { base: '#bdb6a6', line: '#7d7361' },
}

function svgTemplate({ w, h, base, line, label }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.035 0"/>
      <feComposite operator="over" in2="SourceGraphic"/>
    </filter>
    <linearGradient id="tone" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${base}"/>
      <stop offset="1" stop-color="${line}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#tone)" filter="url(#grain)"/>
  <line x1="0" y1="${h}" x2="${w}" y2="0" stroke="${line}" stroke-width="1" opacity="0.25"/>
  <text x="${w - 28}" y="${h - 28}" text-anchor="end" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="${Math.round(w * 0.016)}" fill="${line}" opacity="0.6">${label}</text>
</svg>`
}

const projects = [
  { slug: 'remote-fitting-system', items: [
    { key: 'garment-sim', ratio: '3:4' },
    { key: 'body-model', ratio: '4:3' },
    { key: 'interface', ratio: '16:9' },
    { key: 'fit-visualization', ratio: '1:1' },
  ] },
  { slug: 'digital-fashion-archive', items: [
    { key: 'archive-wall', ratio: '4:3' },
    { key: 'object-01', ratio: '1:1' },
    { key: 'object-02', ratio: '1:1' },
  ] },
  { slug: 'virtual-styling-environment', items: [
    { key: 'styling-01', ratio: '3:4' },
    { key: 'styling-02', ratio: '1:1' },
    { key: 'styling-03', ratio: '16:9' },
  ] },
  { slug: 'ona', items: [
    { key: 'network-view', ratio: '1:1' },
    { key: 'interaction', ratio: '3:4' },
  ] },
  { slug: 'fashion-interactive-installation', items: [
    { key: 'installation-01', ratio: '4:3' },
    { key: 'installation-02', ratio: '9:16' },
    { key: 'installation-03', ratio: '1:1' },
  ] },
  { slug: 'experimental-fashion-commerce', items: [
    { key: 'commerce-01', ratio: '1:1' },
    { key: 'commerce-02', ratio: '4:3' },
  ] },
  { slug: 'archive-of-becoming', items: [
    { key: 'portfolio-01', ratio: '16:9' },
    { key: 'portfolio-02', ratio: '1:1' },
  ] },
  { slug: 'experimental-systems', items: [
    { key: 'study-01', ratio: '1:1' },
    { key: 'study-02', ratio: '3:4' },
    { key: 'study-03', ratio: '4:3' },
    { key: 'study-04', ratio: '1:1' },
  ] },
]

let count = 0
for (const project of projects) {
  const dir = path.join(OUT_DIR, project.slug)
  mkdirSync(dir, { recursive: true })
  const tone = PROJECT_TONES[project.slug]
  project.items.forEach((item, i) => {
    const [w, h] = RATIOS[item.ratio]
    const label = `${project.slug.slice(0, 3).toUpperCase()}.${i + 1}  ${item.ratio}`
    const svg = svgTemplate({ w, h, base: tone.base, line: tone.line, label })
    const file = path.join(dir, `${item.key}.svg`)
    writeFileSync(file, svg, 'utf8')
    count += 1
  })
}

console.log(`Generated ${count} placeholder stills in src/assets/placeholders/.`)

// Optional: one looping placeholder clip, used by the virtual-styling-
// environment board (a 'video' type artifact). Regenerated only if ffmpeg
// is available. Two formats on purpose: Safari has no WebM support and
// needs the H.264 mp4, while a VP9 webm is smaller for everyone else.
// <ProjectMedia>/<ArtifactMedia> render both as <source> children with the
// mp4 last, so the browser picks whichever it supports.
try {
  execSync('ffmpeg -version', { stdio: 'ignore' })
  const videoDir = path.join(OUT_DIR, 'virtual-styling-environment')
  mkdirSync(videoDir, { recursive: true })
  const tone = PROJECT_TONES['virtual-styling-environment']
  const hex = '0x' + tone.base.slice(1)

  const mp4File = path.join(videoDir, 'motion-still.mp4')
  execSync(
    `ffmpeg -y -f lavfi -i "color=c=${hex}:s=960x540:d=4,format=yuv420p" ` +
      `-vf "noise=alls=6:allf=t" -c:v libx264 -profile:v main -pix_fmt yuv420p ` +
      `-preset medium -crf 28 -movflags +faststart -an "${mp4File}"`,
    { stdio: 'ignore' }
  )

  const webmFile = path.join(videoDir, 'motion-still.webm')
  execSync(
    `ffmpeg -y -f lavfi -i "color=c=${hex}:s=960x540:d=4,format=yuv420p" ` +
      `-vf "noise=alls=6:allf=t" -c:v libvpx-vp9 -crf 32 -b:v 0 -an "${webmFile}"`,
    { stdio: 'ignore' }
  )

  const posterSvg = svgTemplate({ w: 1920, h: 1080, base: tone.base, line: tone.line, label: 'VSE.4  16:9' })
  writeFileSync(path.join(videoDir, 'motion-still-poster.svg'), posterSvg, 'utf8')

  console.log('Generated placeholder loop: virtual-styling-environment/motion-still.{mp4,webm,poster.svg}')
} catch {
  console.log('ffmpeg not found — skipped generating the placeholder video clip.')
}
