import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { SolutionDetail } from "@/components/blocks/solution-detail"
import { MidPageCta } from "@/components/blocks/mid-page-cta"
import { loadPageContent } from "@/lib/content/load"
import { solutionDetailSchema } from "@/lib/content/schema"
import { SOLUTION_SLUGS, getSolution } from "@/lib/content/solutions"
import { routing, type Locale } from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SOLUTION_SLUGS.map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolution(slug)
  return { title: solution?.title ?? "Solution", description: solution?.summary }
}

export default async function SolutionDetailPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  if (!getSolution(slug)) notFound()
  const { frontmatter } = await loadPageContent(locale as Locale, `solutions/${slug}`, solutionDetailSchema)

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[
          { label: "Home", href: `/${locale}` },
          { label: "Solutions", href: `/${locale}/solutions` },
          { label: frontmatter.pageHeader.title },
        ]}
      />
      <SolutionDetail
        challenge={frontmatter.challenge}
        approach={frontmatter.approach}
        capabilities={frontmatter.capabilities}
      />
      <MidPageCta text="Discuss this solution with our engineers" href={`/${locale}/contact`} />
    </>
  )
}
