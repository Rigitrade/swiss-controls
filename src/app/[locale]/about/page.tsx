import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { ProfessionalServices } from "@/components/blocks/professional-services"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { SectionLabel } from "@/components/typography/section-label"
import { loadPageContent } from "@/lib/content/load"
import { aboutSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "About us",
  description:
    "Swiss Controls — the specialized industrial engineering unit of Rigitrade AG. Independent, vendor-neutral engineering led by a founding team with over a century of industrial leadership.",
}

export default async function AboutPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "about", aboutSchema)

  const beliefs = frontmatter.beliefs.map((b) => ({ title: b.title, detail: b.body }))
  const profiles = frontmatter.leadership.profiles.map((p) => ({
    title: p.role,
    points: p.points,
  }))

  return (
    <>
      <PageHeader {...frontmatter.pageHeader} centered introClassName="leading-loose" />

      <ProfessionalServices heading="What We Believe In" items={beliefs} surface="stone" />

      <ProfessionalServices
        heading="Our Big 4"
        intro={frontmatter.leadership.intro}
        items={profiles}
        surface="paper"
      />

      <Section surface="stone" density="default">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel label="OUR LEGAL IDENTITY" />
            </div>
            <p className="max-w-[65ch] text-body-l leading-relaxed text-ink/80 lg:col-span-8">
              {frontmatter.legalIdentity}
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
