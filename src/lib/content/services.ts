export type ServiceMeta = {
  slug: string
  title: string
  icon: string // lucide-react icon name
  summary: string
}

export const SERVICES: ServiceMeta[] = [
  {
    slug: "industrial-automation",
    title: "Industrial Automation",
    icon: "Cpu",
    summary:
      "Intelligent automation that improves productivity, reliability, process safety, and digital transformation.",
  },
  {
    slug: "electrical-engineering",
    title: "Electrical Engineering & Industrial Electrification",
    icon: "Zap",
    summary:
      "Robust LV/MV electrical systems, power distribution, motor control, and power system studies.",
  },
  {
    slug: "system-integration",
    title: "System Integration",
    icon: "Network",
    summary:
      "Automation, electrical, instrumentation, and communication technologies unified into high-performance solutions.",
  },
  {
    slug: "engineering-consulting",
    title: "Engineering & Technical Consulting",
    icon: "DraftingCompass",
    summary:
      "Independent engineering from concept and FEED through detailed design and operational handover.",
  },
  {
    slug: "commissioning-lifecycle",
    title: "Commissioning & Lifecycle Services",
    icon: "RefreshCw",
    summary:
      "Commissioning, modernization, migration, and long-term support that maximize asset availability.",
  },
  {
    slug: "procurement-sourcing",
    title: "Procurement & Strategic Sourcing",
    icon: "Factory",
    summary:
      "Vendor-independent sourcing from a network of qualified European and international OEM manufacturers.",
  },
]

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)

export function getService(slug: string): ServiceMeta | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
