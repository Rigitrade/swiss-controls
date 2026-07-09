import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { ServicesGrid } from "@/components/blocks/services-grid"
import { loadPageContent } from "@/lib/content/load"
import { servicesIndexSchema } from "@/lib/content/schema"
import { SERVICES } from "@/lib/content/services"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Services",
  description: "Six integrated engineering services across the full industrial lifecycle.",
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "services/index", servicesIndexSchema)
  const items = SERVICES.map((s) => ({ slug: s.slug, icon: s.icon, title: s.title, summary: s.summary }))

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Services" }]}
      />
      <ServicesGrid content={{ number: "01", label: "OUR SERVICES", items }} locale="en" />
    </>
  )
}
