import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { AtAGlance } from "@/components/blocks/at-a-glance"
import { WhyChoose } from "@/components/blocks/why-choose"
import { IndustriesGroups } from "@/components/blocks/industries-groups"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { loadPageContent } from "@/lib/content/load"
import { whoWeAreSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Swiss Controls — an independent engineering brand built by industrial leaders, combining executive experience, Swiss engineering values, and regional execution power.",
}

export default async function WhoWeArePage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(
    locale as Locale,
    "who-we-are",
    whoWeAreSchema,
  )

  return (
    <>
      <PageHeader {...frontmatter.pageHeader} centered />

      <Section surface="stone" density="default">
        <Container>
          <SectionLabel label="OUR STORY" />
          <Stack gap="3" className="mt-6 lg:mt-8">
            {frontmatter.narrative.map((paragraph, i) => (
              <p
                key={i}
                className="max-w-[68ch] text-body-l leading-relaxed text-ink/90"
              >
                {paragraph}
              </p>
            ))}
          </Stack>
        </Container>
      </Section>

      <AtAGlance
        surface="paper"
        content={{
          number: "",
          label: "AT A GLANCE",
          items: [
            { value: "20", suffix: "+", label: "Years Combined Leadership" },
            { value: "20", suffix: "+", label: "Countries Served" },
            { value: "20", suffix: "+", label: "Industry Sectors" },
            { value: "4", label: "Regional Hubs" },
          ],
        }}
      />

      <WhyChoose
        number=""
        label="OUR FOUNDATIONAL PILLARS"
        items={frontmatter.pillars}
      />

      <IndustriesGroups
        number=""
        label="INDUSTRIES WE SERVE"
        intro="Deep domain expertise spanning the complete industrial landscape."
        groups={frontmatter.industries}
      />

      <Section surface="stone" density="default">
        <Container>
          <SectionLabel label="EXECUTIVE LEADERSHIP" />
          <Stack gap="3" className="mt-6 lg:mt-8">
            {frontmatter.executiveLeadership.map((paragraph, i) => (
              <p
                key={i}
                className="max-w-[68ch] text-body-l leading-relaxed text-ink/90"
              >
                {paragraph}
              </p>
            ))}
          </Stack>
        </Container>
      </Section>

      <Section surface="paper" density="default">
        <Container>
          <div className="mb-12 max-w-2xl">
            <SectionLabel label="MISSION & VISION" />
          </div>
          <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-2">
            <div className="flex flex-col gap-4 bg-paper p-8 border-t-2 border-red">
              <span className="font-mono text-micro uppercase tracking-[0.08em] text-red">
                Vision
              </span>
              <p className="text-h3 font-medium leading-snug text-ink">
                {frontmatter.vision}
              </p>
            </div>
            <div className="flex flex-col gap-4 bg-paper p-8 border-t-2 border-red">
              <span className="font-mono text-micro uppercase tracking-[0.08em] text-red">
                Mission
              </span>
              <p className="text-h3 font-medium leading-snug text-ink">
                {frontmatter.mission}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
