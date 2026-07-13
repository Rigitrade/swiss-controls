import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { SolutionsIndex } from "@/components/blocks/solutions-index"
import { ProfessionalServices } from "@/components/blocks/professional-services"
import { loadPageContent } from "@/lib/content/load"
import { solutionsIndexSchema, solutionDetailSchema } from "@/lib/content/schema"
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
      <ProfessionalServices
        heading="Professional Services: Commissioning & Lifecycle Management"
        intro="Through disciplined engineering execution, we bridge the gap between complex industrial technologies and daily operation through testing, precise deployment, and continuous optimization."
        items={[
          {
            title: "Factory & Site Acceptance Testing (FAT/SAT)",
            detail:
              "Verifying system functionality, safety loops, and logic integrity in controlled and live environments before handover.",
          },
          {
            title: "Commissioning & Startup",
            detail:
              "Seamless integration of automation, motion, and networking layers into your production environment with minimal downtime.",
          },
          {
            title: "Training & Knowledge Transfer",
            detail:
              "Empowering your internal teams with the specialized engineering insights needed to run, manage, and monitor the system effectively.",
          },
          {
            title: "Support & Troubleshooting",
            detail:
              "Continuous technical review, performance tuning, and rapid fault resolution to maintain the long-term safety and availability of your infrastructure.",
          },
        ]}
        surface="stone"
      />
    </>
  )
}
