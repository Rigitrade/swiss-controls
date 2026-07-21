export type SolutionMeta = {
  slug: string
  title: string
  icon: string // lucide-react icon name
  summary: string
  image: string // path under public/, served as-is in static export
}

export const SOLUTIONS: SolutionMeta[] = [
  {
    slug: "operational-modernization",
    title: "Operational Modernization & Asset Lifecycle",
    icon: "RefreshCw",
    summary:
      "Systematically audit and upgrade legacy systems to extend asset life, maximize ROI, and ensure operational continuity.",
    image: "/img/solutions/operational-modernization.jpg",
  },
  {
    slug: "energy-transition",
    title: "Energy Transition & Infrastructure Reliability",
    icon: "Zap",
    summary:
      "Design a reliable electrical network and smart power systems that advance decarbonization, energy efficiency, and industrial electrification.",
    image: "/img/solutions/energy-transition.jpg",
  },
  {
    slug: "industrial-digitalization",
    title: "Industrial Digitalization & Industry 4.0",
    icon: "Cpu",
    summary:
      "Integrate multi-vendor ecosystems with advanced IoT frameworks to transform field data into actionable intelligence and predictive operations.",
    image: "/img/solutions/industrial-digitalization.jpg",
  },
  {
    slug: "capital-investment",
    title: "Capital Investment & Strategic Advisory",
    icon: "DraftingCompass",
    summary:
      "Independent technical due diligence and master planning to derisk major capital investments before deployment begins.",
    image: "/img/solutions/capital-investment.jpg",
  },
]

export const SOLUTION_SLUGS = SOLUTIONS.map((s) => s.slug)

export function getSolution(slug: string): SolutionMeta | undefined {
  return SOLUTIONS.find((s) => s.slug === slug)
}
