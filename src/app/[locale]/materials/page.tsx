import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { PageHeader } from "@/components/blocks/page-header"
import { MaterialComparisonTable } from "@/components/blocks/material-comparison-table"
import { MidPageCta } from "@/components/blocks/mid-page-cta"
import { FinalCta } from "@/components/blocks/final-cta"
import { SectionLabel } from "@/components/typography/section-label"
import { DisplayHeading } from "@/components/typography/display-heading"
import { loadPageContent } from "@/lib/content/load"
import { homeSchema, materialsPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Materials",
  description:
    "Inconel, Hastelloy, Duplex, Monel — six superalloy families for high-temperature, corrosion-resistant, and high-strength applications.",
}

export default async function MaterialsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { frontmatter } = await loadPageContent(
    locale as Locale,
    "materials",
    materialsPageSchema,
  )
  const home = await loadPageContent(locale as Locale, "home", homeSchema)

  const adapted = {
    number: "01",
    callout: "",
    alloys: frontmatter.alloys,
  }

  return (
    <>
      <PageHeader
        number={frontmatter.pageHeader.number}
        label={frontmatter.pageHeader.label}
        title={frontmatter.pageHeader.title}
        intro={frontmatter.pageHeader.intro}
        breadcrumbs={[
          { label: "Home", href: `/${locale}` },
          { label: "Materials" },
        ]}
      />
      <Section density="tight">
        <Container>
          <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink/60">
            {frontmatter.comparisonNote}
          </p>
        </Container>
      </Section>
      <MaterialComparisonTable
        materials={adapted}
        locale={locale as Locale}
        showCta={false}
        showCallout={false}
      />

      <Section surface="stone">
        <Container>
          <Stack gap="6">
            <SectionLabel number="02" label="SELECTION GUIDANCE" />
            <DisplayHeading as="h2" size="display-m" className="max-w-[18ch]">
              Choosing between alloys
            </DisplayHeading>
            <Hairline />
            <div className="space-y-8">
              {frontmatter.selectionGuidance.map((item) => (
                <div key={item.question}>
                  <h3 className="text-h3 font-medium text-ink">{item.question}</h3>
                  <p className="mt-2 text-body-l text-ink/80">{item.answer}</p>
                </div>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>

      <MidPageCta
        text="Need help selecting an alloy? Speak with a technical expert."
        href={`/${locale}/contact?intent=talk`}
      />
      <FinalCta finalCta={home.frontmatter.finalCta} locale={locale as Locale} />
    </>
  )
}
