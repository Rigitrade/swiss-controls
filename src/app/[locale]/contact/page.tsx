import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { PageHeader } from "@/components/blocks/page-header"
import { SectionLabel } from "@/components/typography/section-label"
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
  const { office } = frontmatter
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
          <div className="mx-auto max-w-2xl">
            <Stack gap="6">
              <SectionLabel number="01" label="SEND US A MESSAGE" />
              <p className="max-w-[52ch] text-body-l text-ink/70">
                Fill in the form and we&apos;ll open WhatsApp with your message ready to
                send — the fastest way to reach our engineering team. Prefer email or a
                call? Our details are in the footer below.
              </p>
              <ContactForm whatsappNumber={whatsappNumber} />
            </Stack>
          </div>
        </Container>
      </Section>
    </>
  )
}
