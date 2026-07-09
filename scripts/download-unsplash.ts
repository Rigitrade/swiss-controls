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

const ASSETS: Asset[] = [
  // Hero — dramatic molten-metal pour, dark
  {
    out: "public/img/hero/specimen.jpg",
    unsplashId: "1572277603731-6941cdb65597",
    width: 2400,
  },

  // Core capabilities — three portraits with industrial subjects
  {
    out: "public/img/solutions/high-temp.jpg",
    unsplashId: "1571590946238-a0ba990d12a9", // molten metal
    width: 1200,
  },
  {
    out: "public/img/solutions/corrosion.jpg",
    unsplashId: "1522322512347-a0e57fd1744c", // industrial structure
    width: 1200,
  },
  {
    out: "public/img/solutions/high-pressure.jpg",
    unsplashId: "1605600659873-d808a13e4d2a", // steel pipes
    width: 1200,
  },
  {
    out: "public/img/solutions/castings.jpg",
    unsplashId: "1647343137860-69ccd12a61c6", // steel mill
    width: 1200,
  },

  // Industry tiles — 6 application contexts
  {
    out: "public/img/industries/oil-gas.jpg",
    unsplashId: "1578356058390-f58c575337a2", // offshore platform
    width: 1200,
  },
  {
    out: "public/img/industries/refineries.jpg",
    unsplashId: "1726731782158-fcf6822b6ca4", // refinery
    width: 1200,
  },
  {
    out: "public/img/industries/petrochemicals.jpg",
    unsplashId: "1611581372056-30cf28a7bd2e", // petrochem
    width: 1200,
  },
  {
    out: "public/img/industries/fertilizer.jpg",
    unsplashId: "1602056820935-316884c035f8", // process plant
    width: 1200,
  },
  {
    out: "public/img/industries/power.jpg",
    unsplashId: "1717386255773-1e3037c81788", // factory / industrial
    width: 1200,
  },
  {
    out: "public/img/industries/marine.jpg",
    unsplashId: "1548337138-e87d889cc369", // offshore
    width: 1200,
  },

  // Featured break — dramatic AOD/molten reference
  {
    out: "public/img/featured/aod-furnace.jpg",
    unsplashId: "1680866362357-d8192e20a7dc", // molten metal #3
    width: 2400,
  },

  // Facility photos for the About page
  {
    out: "public/img/facilities/zurich.jpg",
    unsplashId: "1573137785546-9d19e4f33f87", // Zürich
    width: 1600,
  },
  {
    out: "public/img/facilities/uk.jpg",
    unsplashId: "1692523087152-080b04c8ed88", // UK industrial city
    width: 1600,
  },
  {
    out: "public/img/facilities/egypt.jpg",
    unsplashId: "1601816500593-8f1276479ea6", // Alexandria port
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
