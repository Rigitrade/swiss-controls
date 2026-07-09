import { writeFile, mkdir } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"

type Placeholder = {
  out: string
  width: number
  height: number
  bg: { r: number; g: number; b: number }
  label: string
  variant?: "solid" | "gradient" | "duotone"
}

const PLACEHOLDERS: Placeholder[] = [
  // Hero — full-bleed
  {
    out: "public/img/hero/specimen.jpg",
    width: 2400,
    height: 1600,
    bg: { r: 11, g: 15, b: 20 },
    label: "RIGITRADE  ·  SUPERALLOYS",
    variant: "gradient",
  },
  // Core capabilities — image-led cards (taller portrait orientation)
  {
    out: "public/img/solutions/high-temp.jpg",
    width: 1200,
    height: 1500,
    bg: { r: 194, g: 65, b: 12 },
    label: "HIGH  TEMPERATURE",
    variant: "duotone",
  },
  {
    out: "public/img/solutions/corrosion.jpg",
    width: 1200,
    height: 1500,
    bg: { r: 31, g: 41, b: 55 },
    label: "CORROSION  RESISTANT",
    variant: "duotone",
  },
  {
    out: "public/img/solutions/high-pressure.jpg",
    width: 1200,
    height: 1500,
    bg: { r: 11, g: 15, b: 20 },
    label: "HIGH  PRESSURE",
    variant: "duotone",
  },
  {
    out: "public/img/solutions/castings.jpg",
    width: 1200,
    height: 1500,
    bg: { r: 80, g: 60, b: 40 },
    label: "CUSTOM  CASTINGS",
    variant: "duotone",
  },
  // Industry tiles — square format, photo-overlay grid
  {
    out: "public/img/industries/oil-gas.jpg",
    width: 1200,
    height: 1200,
    bg: { r: 25, g: 25, b: 30 },
    label: "OIL  &  GAS",
    variant: "duotone",
  },
  {
    out: "public/img/industries/refineries.jpg",
    width: 1200,
    height: 1200,
    bg: { r: 70, g: 40, b: 30 },
    label: "REFINERIES",
    variant: "duotone",
  },
  {
    out: "public/img/industries/petrochemicals.jpg",
    width: 1200,
    height: 1200,
    bg: { r: 40, g: 50, b: 60 },
    label: "PETROCHEMICALS",
    variant: "duotone",
  },
  {
    out: "public/img/industries/fertilizer.jpg",
    width: 1200,
    height: 1200,
    bg: { r: 60, g: 55, b: 40 },
    label: "FERTILIZER",
    variant: "duotone",
  },
  {
    out: "public/img/industries/power.jpg",
    width: 1200,
    height: 1200,
    bg: { r: 30, g: 40, b: 50 },
    label: "POWER  GENERATION",
    variant: "duotone",
  },
  {
    out: "public/img/industries/marine.jpg",
    width: 1200,
    height: 1200,
    bg: { r: 20, g: 35, b: 50 },
    label: "MARINE  &  OFFSHORE",
    variant: "duotone",
  },
  // Featured break image — full-bleed parallax
  {
    out: "public/img/featured/aod-furnace.jpg",
    width: 2400,
    height: 1200,
    bg: { r: 194, g: 65, b: 12 },
    label: "WHEN  STANDARD  IS  NOT  ENOUGH",
    variant: "gradient",
  },
  // Masonry gallery — varied aspect ratios
  {
    out: "public/img/gallery/pipes.jpg",
    width: 1600,
    height: 1200,
    bg: { r: 30, g: 30, b: 35 },
    label: "SEAMLESS  PIPES",
    variant: "duotone",
  },
  {
    out: "public/img/gallery/specimen.jpg",
    width: 1200,
    height: 1200,
    bg: { r: 60, g: 65, b: 70 },
    label: "ALLOY  SPECIMEN",
    variant: "duotone",
  },
  {
    out: "public/img/gallery/aod.jpg",
    width: 1200,
    height: 1600,
    bg: { r: 194, g: 65, b: 12 },
    label: "AOD  REFINING",
    variant: "duotone",
  },
  {
    out: "public/img/gallery/fitting.jpg",
    width: 1200,
    height: 900,
    bg: { r: 25, g: 30, b: 38 },
    label: "PRECISION  FITTING",
    variant: "duotone",
  },
  {
    out: "public/img/gallery/floor.jpg",
    width: 1600,
    height: 900,
    bg: { r: 18, g: 22, b: 28 },
    label: "MANUFACTURING  FLOOR",
    variant: "duotone",
  },
  {
    out: "public/img/gallery/casting.jpg",
    width: 1200,
    height: 1200,
    bg: { r: 70, g: 50, b: 35 },
    label: "INVESTMENT  CASTING",
    variant: "duotone",
  },
]

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function gradientSvg(p: Placeholder): string {
  const { r, g, b } = p.bg
  const dark = `rgb(${Math.max(0, r - 30)},${Math.max(0, g - 30)},${Math.max(0, b - 30)})`
  const light = `rgb(${Math.min(255, r + 30)},${Math.min(255, g + 30)},${Math.min(255, b + 30)})`
  const fontSize = p.width / 28
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${p.width}" height="${p.height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${dark}" />
        <stop offset="50%" stop-color="rgb(${r},${g},${b})" />
        <stop offset="100%" stop-color="${light}" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)" />
    <rect width="100%" height="100%" fill="rgba(0,0,0,0.35)" />
    <text x="50%" y="50%" font-family="monospace" font-size="${fontSize}" fill="rgba(250,250,247,0.55)" text-anchor="middle" dominant-baseline="middle" letter-spacing="${p.width / 80}">${escapeXml(p.label)}</text>
  </svg>`
}

function duotoneSvg(p: Placeholder): string {
  const { r, g, b } = p.bg
  const fontSize = p.width / 18
  // grain pattern via repeated circles
  const dots = Array.from({ length: 50 })
    .map(() => {
      const x = Math.random() * p.width
      const y = Math.random() * p.height
      const radius = Math.random() * (p.width / 100)
      const opacity = (Math.random() * 0.2).toFixed(2)
      return `<circle cx="${x}" cy="${y}" r="${radius}" fill="rgba(250,250,247,${opacity})" />`
    })
    .join("")
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${p.width}" height="${p.height}">
    <rect width="100%" height="100%" fill="rgb(${r},${g},${b})" />
    ${dots}
    <rect x="0" y="${p.height * 0.6}" width="100%" height="${p.height * 0.4}" fill="url(#shade)" />
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(0,0,0,0)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.6)" />
      </linearGradient>
    </defs>
    <text x="50%" y="50%" font-family="monospace" font-size="${fontSize}" fill="rgba(250,250,247,0.4)" text-anchor="middle" dominant-baseline="middle" letter-spacing="${p.width / 100}">${escapeXml(p.label)}</text>
  </svg>`
}

function solidSvg(p: Placeholder): string {
  const fontSize = p.width / 16
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${p.width}" height="${p.height}">
    <rect width="100%" height="100%" fill="rgb(${p.bg.r},${p.bg.g},${p.bg.b})" />
    <text x="50%" y="50%" font-family="monospace" font-size="${fontSize}" fill="rgba(250,250,247,0.4)" text-anchor="middle" dominant-baseline="middle" letter-spacing="${p.width / 100}">${escapeXml(p.label)}</text>
  </svg>`
}

async function generate(p: Placeholder) {
  const dir = path.dirname(p.out)
  if (!existsSync(dir)) await mkdir(dir, { recursive: true })

  const svg =
    p.variant === "gradient"
      ? gradientSvg(p)
      : p.variant === "duotone"
        ? duotoneSvg(p)
        : solidSvg(p)

  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 80 }).toBuffer()
  await writeFile(p.out, buffer)
  console.log(`✓ ${p.out}`)
}

async function main() {
  for (const p of PLACEHOLDERS) await generate(p)
  console.log(`Done: ${PLACEHOLDERS.length} images.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
