import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { SolutionsIndex } from "@/components/blocks/solutions-index"
import { IndustriesFocus } from "@/components/blocks/industries-focus"
import { loadPageContent } from "@/lib/content/load"
import { solutionsIndexSchema, solutionDetailSchema, whoWeAreSchema } from "@/lib/content/schema"
import { SOLUTIONS } from "@/lib/content/solutions"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Solutions",
  description: "Four integrated engineering solutions across the full industrial asset lifecycle.",
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "solutions/index", solutionsIndexSchema)

  // Industries We Serve reuses the same content as the About page (single source),
  // enriched with a photo per group for the solutions "focus" cards.
  const { frontmatter: about } = await loadPageContent(locale as Locale, "about", whoWeAreSchema)
  const INDUSTRY_IMAGES: Record<string, string> = {
    "Energy & Utilities": "/img/industries/energy-utilities.jpg",
    "Process Industries": "/img/industries/process-industries.jpg",
    "Heavy Industry": "/img/industries/heavy-industry.jpg",
    "Logistics & Infrastructure": "/img/industries/logistics-infrastructure.jpg",
    Manufacturing: "/img/industries/manufacturing.jpg",
  }
  const industryGroups = about.industries.map((g) => ({
    ...g,
    image: INDUSTRY_IMAGES[g.category] ?? "",
  }))

  // Enrich each solution with a few capability tags pulled from its own content.
  const items = await Promise.all(
    SOLUTIONS.map(async (s) => {
      const { frontmatter: detail } = await loadPageContent(
        locale as Locale,
        `solutions/${s.slug}`,
        solutionDetailSchema,
      )
      return {
        slug: s.slug,
        title: s.title,
        summary: s.summary,
        image: s.image,
        capabilities: detail.capabilities,
      }
    }),
  )

  return (
    <>
      <PageHeader {...frontmatter.pageHeader} centered introClassName="leading-loose" />
      <SolutionsIndex
        number=""
        label=""
        intro="Integrated solutions across the full industrial asset lifecycle"
        points={[
          "Modernization: Systematically auditing and migrating legacy systems to extend asset life.",
          "Energy Transition: Designing robust electrical infrastructure to reduce costs and ensure power quality.",
          "Digitalization: Integrating advanced IoT frameworks to transform field data into actionable intelligence.",
          "Strategic Advisory: Providing independent technical due diligence and master planning to de-risk capital investments.",
        ]}
        items={items}
        locale="en"
      />
      <IndustriesFocus
        label="INDUSTRIES WE SERVE"
        heading="Deep domain expertise spanning the complete industrial landscape."
        groups={industryGroups}
        surface="stone"
      />
    </>
  )
}
