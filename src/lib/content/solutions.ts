export type SolutionMeta = {
  slug: string
  title: string
  icon: string // lucide-react icon name
  summary: string
}

export const SOLUTIONS: SolutionMeta[] = [
  {
    slug: "operational-modernization",
    title: "Operational Modernization & Asset Lifecycle",
    icon: "RefreshCw",
    summary:
      "Systematically audit and upgrade legacy systems to extend asset life, maximize ROI, and ensure operational continuity.",
  },
  {
    slug: "energy-transition",
    title: "Energy Transition & Infrastructure Reliability",
    icon: "Zap",
    summary:
      "Design robust electrical infrastructure and intelligent drive systems to radically reduce energy costs and ensure power quality.",
  },
  {
    slug: "industrial-digitalization",
    title: "Industrial Digitalization & Industry 4.0",
    icon: "Cpu",
    summary:
      "Integrate multi-vendor ecosystems with advanced IoT frameworks to transform field data into actionable intelligence and predictive operations.",
  },
  {
    slug: "capital-investment",
    title: "Capital Investment & Strategic Advisory",
    icon: "DraftingCompass",
    summary:
      "Independent technical due diligence and master planning to derisk major capital investments before deployment begins.",
  },
]

export const SOLUTION_SLUGS = SOLUTIONS.map((s) => s.slug)

export function getSolution(slug: string): SolutionMeta | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}
