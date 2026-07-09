import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { WhyChoose } from "@/components/blocks/why-choose"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { loadPageContent } from "@/lib/content/load"
import { aboutPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "About",
  description: "Swiss Controls — an independent Swiss engineering brand by RIGITRADE AG.",
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "about", aboutPageSchema)

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "About" }]}
      />
      <Section surface="paper" density="default">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {frontmatter.sections.map((s) => (
              <article key={s.number}>
                <Stack gap="3">
                  <SectionLabel number={s.number} label="ABOUT" />
                  <h2 className="text-h2 font-medium text-ink">{s.title}</h2>
                  <p className="text-body text-ink/75">{s.body}</p>
                </Stack>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <WhyChoose number="04" label="OUR VALUES" items={frontmatter.values} />
    </>
  )
}
