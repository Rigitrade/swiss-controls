import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { PageHeader } from "@/components/blocks/page-header"
import { SectionLabel } from "@/components/typography/section-label"
import { LeaderDots } from "@/components/typography/leader-dots"
import { DataChip } from "@/components/typography/data-chip"
import { ContactForm } from "@/components/interactive/contact-form"
import { loadPageContent } from "@/lib/content/load"
import { contactPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Contact",
  description: "Discuss your project with the Swiss Controls engineering team.",
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "contact", contactPageSchema)
  const { office, regions } = frontmatter
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? office.phone.replace(/[^\d]/g, "")

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        fill
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Contact" }]}
      />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <Stack gap="6">
                <Stack gap="4">
                  <SectionLabel number="01" label="HEADQUARTERS" />
                  <p className="whitespace-pre-line text-body-l text-ink">{office.address}</p>
                  <Hairline className="my-2" />
                  <LeaderDots left="Email" right={office.email} />
                  <LeaderDots left="Phone" right={office.phone} />
                </Stack>
                <Stack gap="4">
                  <SectionLabel number="02" label="REGIONAL ENGINEERING OPERATIONS" />
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <DataChip key={region}>{region}</DataChip>
                    ))}
                  </div>
                </Stack>
              </Stack>
            </aside>
            <div className="lg:col-span-8">
              <Stack gap="6">
                <SectionLabel number="03" label="SEND US A MESSAGE" />
                <p className="max-w-[52ch] text-body-l text-ink/70">
                  Fill in the form and we&apos;ll open WhatsApp with your message ready to
                  send — the fastest way to reach our engineering team. Prefer email or a
                  call? Our direct details are on the left.
                </p>
                <ContactForm whatsappNumber={whatsappNumber} />
              </Stack>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
