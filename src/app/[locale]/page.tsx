import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "Swiss Controls",
  description:
    "Independent Swiss engineering for industrial automation, electrical engineering, industrial electrification, and system integration.",
}

// TODO(Phase 3): rewrite this page against the new `homeSchema` content model
// (hero, intro, metrics, services, process, technologies, industries, whyChoose, finalCta)
// using the new blocks (Hero, AtAGlance, ServicesGrid, ProcessTimeline, TechnologyWall,
// IndustriesGrid, WhyChoose, FinalCta). Stubbed in Task 2.9 after removing the
// Rigitrade-specific blocks this page previously imported.
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return null
}
