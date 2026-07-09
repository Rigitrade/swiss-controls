import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/blocks/hero"
import { AtAGlance } from "@/components/blocks/at-a-glance"
import { WhyChoose } from "@/components/blocks/why-choose"
import { DeliveryFramework } from "@/components/blocks/delivery-framework"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { loadPageContent } from "@/lib/content/load"
import { homeSchema } from "@/lib/content/schema"
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
      <AtAGlance content={c.metrics} />
      <WhyChoose number={c.whyPartner.number} label={c.whyPartner.label} items={c.whyPartner.items} />
      <DeliveryFramework content={c.deliveryFramework} />
    </>
  )
}
