import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { ServiceDetailCatalog } from "@/components/blocks/service-detail-catalog"
import { MidPageCta } from "@/components/blocks/mid-page-cta"
import { loadPageContent } from "@/lib/content/load"
import { serviceDetailSchema } from "@/lib/content/schema"
import { SERVICE_SLUGS, getService } from "@/lib/content/services"
import { routing, type Locale } from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const svc = getService(slug)
  return { title: svc?.title ?? "Service", description: svc?.summary }
}

export default async function ServiceDetailPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  if (!getService(slug)) notFound()
  const { frontmatter } = await loadPageContent(locale as Locale, `services/${slug}`, serviceDetailSchema)

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[
          { label: "Home", href: `/${locale}` },
          { label: "Services", href: `/${locale}/services` },
          { label: frontmatter.pageHeader.title },
        ]}
      />
      <ServiceDetailCatalog summary={frontmatter.summary} catalog={frontmatter.catalog} />
      <MidPageCta text="Have a project in this area?" href={`/${locale}/contact`} />
    </>
  )
}
