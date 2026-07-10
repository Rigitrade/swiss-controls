import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/blocks/hero"
import { AtAGlance } from "@/components/blocks/at-a-glance"
import { WhyChoose } from "@/components/blocks/why-choose"
import { DeliveryFramework } from "@/components/blocks/delivery-framework"
import { SolutionsGrid } from "@/components/blocks/solutions-grid"
import { PartnerStrip } from "@/components/blocks/partner-strip"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { loadPageContent } from "@/lib/content/load"
import { homeSchema } from "@/lib/content/schema"
import { SOLUTIONS } from "@/lib/content/solutions"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Engineering Leadership. Swiss Precision. Industrial Transformation.",
  description:
    "Swiss Controls is an independent Swiss engineering and technology company delivering industrial consulting, electrical engineering, automation, digital transformation, energy management, and system integration.",
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "home", homeSchema)
  const c = frontmatter
  const solutions = SOLUTIONS.map((s) => ({ slug: s.slug, icon: s.icon, title: s.title, summary: s.summary, image: s.image }))

  return (
    <>
      <Hero hero={c.hero} locale="en" />
      <Section surface="paper" density="default">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-h1 font-medium text-ink">{c.purpose.heading}</h2>
            <p className="mt-6 text-body-l text-ink/80">{c.purpose.body}</p>
          </div>
        </Container>
      </Section>
      {/* Alternate surfaces so each band reads as its own section:
          purpose (white) → solutions (gray) → metrics (white) → why (gray)
          → delivery (white) → partners (gray) → footer (dark). */}
      <SolutionsGrid content={{ number: "01", label: "OUR SOLUTIONS", items: solutions }} locale="en" surface="stone" density="tight" columns={4} />
      <AtAGlance content={c.metrics} surface="paper" />
      <WhyChoose
        number={c.whyPartner.number}
        label={c.whyPartner.label}
        items={c.whyPartner.items}
        surface="stone"
      />
      <DeliveryFramework content={c.deliveryFramework} surface="paper" />
      <PartnerStrip content={c.partners} locale="en" surface="stone" />
    </>
  )
}
