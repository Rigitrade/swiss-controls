import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { SolutionsIndex } from "@/components/blocks/solutions-index"
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
      <PageHeader
        {...frontmatter.pageHeader}
        fill
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Solutions" }]}
      />
      <SolutionsIndex
        number=""
        label="OUR SOLUTIONS"
        intro="Four integrated solutions across the full industrial asset lifecycle — delivered vendor-independently, from modernizing the assets you run today to derisking the capital you commit next."
        items={items}
        locale="en"
      />
    </>
  )
}
