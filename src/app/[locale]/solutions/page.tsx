import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { SolutionsGrid } from "@/components/blocks/solutions-grid"
import { loadPageContent } from "@/lib/content/load"
import { solutionsIndexSchema } from "@/lib/content/schema"
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
  const items = SOLUTIONS.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary, image: s.image }))

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        fill
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Solutions" }]}
      />
      <SolutionsGrid content={{ number: "01", label: "OUR SOLUTIONS", items }} locale="en" />
    </>
  )
}
