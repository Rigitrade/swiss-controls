import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Suspense } from "react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { PageHeader } from "@/components/blocks/page-header"
import { SectionLabel } from "@/components/typography/section-label"
import { LeaderDots } from "@/components/typography/leader-dots"
import { QuoteForm } from "@/components/interactive/quote-form"
import { ContactForm } from "@/components/interactive/contact-form"
import { loadPageContent } from "@/lib/content/load"
import { contactPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Contact",
  description: "Submit a technical quote request or speak with an expert at Rigitrade AG.",
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { frontmatter } = await loadPageContent(
    locale as Locale,
    "contact",
    contactPageSchema,
  )

  const quoteId = process.env.NEXT_PUBLIC_FORMSPREE_QUOTE_ID ?? ""
  const contactId = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID ?? ""

  return (
    <>
      <PageHeader
        number={frontmatter.pageHeader.number}
        label={frontmatter.pageHeader.label}
        title={frontmatter.pageHeader.title}
        intro={frontmatter.pageHeader.intro}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Contact" }]}
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <Stack gap="4">
                <SectionLabel number="01" label="OFFICE" />
                <p className="whitespace-pre-line text-body-l text-ink">{frontmatter.office.address}</p>
                <Hairline className="my-2" />
                <LeaderDots left="Email" right={frontmatter.office.email} />
                <LeaderDots left="Phone" right={frontmatter.office.phone} />
                <LeaderDots left="Hours" right={frontmatter.office.hours} />
              </Stack>
            </aside>

            <div className="lg:col-span-8">
              <Stack gap="6">
                <SectionLabel number="02" label="REQUEST TECHNICAL QUOTE" />
                <Suspense fallback={null}>
                  <QuoteForm formspreeId={quoteId} />
                </Suspense>

                <Hairline className="my-12" />

                <SectionLabel number="03" label="GENERAL INQUIRY" />
                <ContactForm formspreeId={contactId} />
              </Stack>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
