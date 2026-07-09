import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/blocks/hero"
import { AtAGlance } from "@/components/blocks/at-a-glance"
import { ServicesGrid } from "@/components/blocks/services-grid"
import { ProcessTimeline } from "@/components/blocks/process-timeline"
import { TechnologyWall } from "@/components/blocks/technology-wall"
import { IndustriesGrid } from "@/components/blocks/industries-grid"
import { WhyChoose } from "@/components/blocks/why-choose"
import { FinalCta } from "@/components/blocks/final-cta"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { loadPageContent } from "@/lib/content/load"
import { homeSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Engineering the Future of Industry",
  description:
    "Independent Swiss engineering for industrial automation, electrical engineering, industrial electrification, and system integration.",
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "home", homeSchema)
  const c = frontmatter

  return (
    <>
      <Hero hero={c.hero} locale="en" />
      <Section surface="paper" density="default">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-h1 font-medium text-ink">{c.intro.heading}</h2>
            <p className="mt-6 text-body-l text-ink/80">{c.intro.body}</p>
          </div>
        </Container>
      </Section>
      <AtAGlance content={c.metrics} />
      <ServicesGrid content={c.services} locale="en" />
      <ProcessTimeline content={c.process} />
      <TechnologyWall content={c.technologies} />
      <IndustriesGrid number={c.industries.number} label={c.industries.label} intro={c.industries.intro} items={c.industries.items} />
      <WhyChoose number={c.whyChoose.number} label={c.whyChoose.label} items={c.whyChoose.items} />
      <FinalCta finalCta={c.finalCta} locale="en" />
    </>
  )
}
