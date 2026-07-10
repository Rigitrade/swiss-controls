import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
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
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[
          { label: "Home", href: `/${locale}` },
          { label: "Who We Are" },
        ]}
      />

      <Section surface="paper" density="default">
        <Container>
          <div className="max-w-[70ch]">
            <Stack gap="3">
              {frontmatter.narrative.map((paragraph, i) => (
                <p key={i} className="text-body-l text-ink/80">
                  {paragraph}
                </p>
              ))}
            </Stack>
          </div>
        </Container>
      </Section>

      <WhyChoose
        number="02"
        label="OUR FOUNDATIONAL PILLARS"
        items={frontmatter.pillars}
      />

      <IndustriesGroups
        number="03"
        label="INDUSTRIES WE SERVE"
        intro="Deep domain expertise spanning the complete industrial landscape."
        groups={frontmatter.industries}
      />

      <Section surface="stone" density="default">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel number="04" label="EXECUTIVE LEADERSHIP" />
            </div>
            <div className="lg:col-span-8">
              <Stack gap="3">
                {frontmatter.executiveLeadership.map((paragraph, i) => (
                  <p key={i} className="text-body-l text-ink/80">
                    {paragraph}
                  </p>
                ))}
              </Stack>
            </div>
          </div>
        </Container>
      </Section>

      <Section surface="stone" density="default">
        <Container>
          <div className="mb-12 max-w-2xl">
            <SectionLabel number="05" label="MISSION & VISION" />
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
