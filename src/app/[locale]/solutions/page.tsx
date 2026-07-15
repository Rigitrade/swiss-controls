import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { SolutionsIndex } from "@/components/blocks/solutions-index"
import { IndustriesFocus } from "@/components/blocks/industries-focus"
import { loadPageContent } from "@/lib/content/load"
import { solutionsIndexSchema, solutionDetailSchema } from "@/lib/content/schema"
import { SOLUTIONS } from "@/lib/content/solutions"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Solutions",
  description: "Four integrated engineering solutions across the full industrial asset lifecycle.",
}

// Industries We Serve — grouped focus areas (photo cards) for the Solutions page.
const INDUSTRIES = [
  {
    category: "Energy & Utilities",
    image: "/img/industries/energy-utilities.jpg",
    items: [
      "Power Generation & Distribution",
      "Renewables & Energy Transition",
      "Oil & Gas, Hydrogen, and Utilities",
    ],
  },
  {
    category: "Process Industries",
    image: "/img/industries/process-industries.jpg",
    items: ["Chemical & Petrochemical", "Water & Wastewater Treatment", "Food & Beverage, Pharmaceutical"],
  },
  {
    category: "Heavy Industry",
    image: "/img/industries/heavy-industry.jpg",
    items: ["Mining, Steel, Cement, and Metal Processing"],
  },
  {
    category: "Logistics & Infrastructure",
    image: "/img/industries/logistics-infrastructure.jpg",
    items: ["Ports, Marine, and Transportation", "Airports and Railways", "Data Centres & Smart Infrastructure"],
  },
  {
    category: "Manufacturing",
    image: "/img/industries/manufacturing.jpg",
    items: ["Automotive and Machine Builders", "OEMs and Industrial Equipment"],
  },
]

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
      <PageHeader {...frontmatter.pageHeader} centered />
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
        groups={INDUSTRIES}
        surface="stone"
      />
    </>
  )
}
