import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { IndustriesGrid } from "@/components/blocks/industries-grid"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { SectionLabel } from "@/components/typography/section-label"
import { loadPageContent } from "@/lib/content/load"
import { industriesPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Industries",
  description: "Industries served by Swiss Controls across Switzerland, Europe, the GCC, the Middle East, and Africa.",
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "industries", industriesPageSchema)

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Industries" }]}
      />
      <IndustriesGrid number="01" label="SECTORS" intro={frontmatter.pageHeader.intro} items={frontmatter.industries} />
      <Section surface="stone" density="default">
        <Container>
          <div className="mb-8"><SectionLabel number="02" label={frontmatter.clientTypesLabel} /></div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-caption uppercase tracking-[0.08em] text-ink/70">
            {frontmatter.clientTypes.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </Container>
      </Section>
    </>
  )
}
