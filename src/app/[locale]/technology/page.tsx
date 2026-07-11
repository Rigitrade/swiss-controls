import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { TechnologyPlatforms } from "@/components/blocks/technology-platforms"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { loadPageContent } from "@/lib/content/load"
import { technologySchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Technology Expertise",
  description:
    "Vendor-independent engineering across automation, power, motion, industrial software, networks, and digital platforms matched to your operational requirements, not a vendor catalog.",
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
      <PageHeader {...frontmatter.pageHeader} centered />

      <TechnologyPlatforms
        label="PLATFORM COVERAGE"
        flow={frontmatter.flow}
        categories={frontmatter.categories}
      />

      <Section surface="stone" density="default">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Stack gap="4">
                <SectionLabel label="COMMISSIONING & LIFECYCLE MANAGEMENT" />
              </Stack>
            </div>
            <div className="lg:col-span-8">
              <Stack gap="4">
                <p className="max-w-[65ch] text-body-l text-ink/80">
                  {frontmatter.commissioning.body}
                </p>
                <ul className="flex flex-col border-t border-hairline">
                  {frontmatter.commissioning.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-4 border-b border-hairline py-6"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 bg-red"
                      />
                      <span className="text-body-l text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </Stack>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
