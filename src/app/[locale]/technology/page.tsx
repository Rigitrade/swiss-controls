import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { CoreTechnologies } from "@/components/blocks/core-technologies"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { SectionLabel } from "@/components/typography/section-label"
import { loadPageContent } from "@/lib/content/load"
import { technologySchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "Vendor-independent engineering across automation, power, motion, industrial software, networks, and digital platforms — matched to your operational requirements, not a vendor catalog.",
}

export default async function TechnologyPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(
    locale as Locale,
    "technology",
    technologySchema,
  )

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        centered
        titleClassName="lg:max-w-none leading-[1.3]"
      />

      <CoreTechnologies label="CORE TECHNOLOGIES" groups={frontmatter.coreTechnologies} />

      <Section surface="stone" density="default">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel label={frontmatter.openEcosystem.heading} />
            </div>
            <p className="max-w-[65ch] text-body-l leading-relaxed text-ink/80 lg:col-span-8">
              {frontmatter.openEcosystem.body}
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
