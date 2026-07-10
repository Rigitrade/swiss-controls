import { writeFile, mkdir } from "node:fs/promises"
import { existsSync } from "node:fs"
import path from "node:path"

type Asset = {
  out: string
  unsplashId: string
  width: number
  /** Unsplash crop hint, e.g. "&fit=crop&crop=center" */
  cropParams?: string
}

// One photo per Swiss Controls solution. Each serves BOTH the card thumbnail
// and the detail-page banner (CSS object-cover handles the different crops).
// To swap an image: replace the unsplashId (the "photo-<id>" segment of an
// images.unsplash.com URL) and re-run `npx tsx scripts/download-unsplash.ts`.
const ASSETS: Asset[] = [
  {
    // Operational Modernization & Asset Lifecycle — plant interior / machinery
    out: "public/img/solutions/operational-modernization.jpg",
    unsplashId: "1717386255773-1e3037c81788",
    width: 1600,
  },
  {
    // Energy Transition & Infrastructure Reliability — industrial infrastructure
    out: "public/img/solutions/energy-transition.jpg",
    unsplashId: "1522322512347-a0e57fd1744c",
    width: 1600,
  },
  {
    // Industrial Digitalization & Industry 4.0 — process / control plant
    out: "public/img/solutions/industrial-digitalization.jpg",
    unsplashId: "1602056820935-316884c035f8",
    width: 1600,
  },
  {
    // Capital Investment & Strategic Advisory — large facility / refinery scale
    out: "public/img/solutions/capital-investment.jpg",
    unsplashId: "1726731782158-fcf6822b6ca4",
    width: 1600,
  },
]

async function download(asset: Asset): Promise<void> {
  const dir = path.dirname(asset.out)
  if (!existsSync(dir)) await mkdir(dir, { recursive: true })

  const url = `https://images.unsplash.com/photo-${asset.unsplashId}?w=${asset.width}&q=82&fit=crop&fm=jpg&auto=format`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to download ${asset.unsplashId}: HTTP ${res.status}`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(asset.out, buf)
  const kb = (buf.length / 1024).toFixed(0)
  console.log(`✓ ${asset.out}  (${kb} KB)`)
}

async function main() {
  for (const asset of ASSETS) {
    try {
      await download(asset)
    } catch (err) {
      console.error(`✗ ${asset.out}: ${(err as Error).message}`)
    }
  }
  console.log(`Done: ${ASSETS.length} assets.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
