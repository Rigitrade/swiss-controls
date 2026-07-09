import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { PageHeader } from "@/components/blocks/page-header"
import { SectionLabel } from "@/components/typography/section-label"
import { LeaderDots } from "@/components/typography/leader-dots"
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
  const contactId = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID ?? ""

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Contact" }]}
      />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <Stack gap="4">
                <SectionLabel number="01" label="HEADQUARTERS" />
                <p className="whitespace-pre-line text-body-l text-ink">{frontmatter.office.address}</p>
                <Hairline className="my-2" />
                <LeaderDots left="Email" right={frontmatter.office.email} />
                <LeaderDots left="Phone" right={frontmatter.office.phone} />
              </Stack>
            </aside>
            <div className="lg:col-span-8">
              <Stack gap="6">
                <SectionLabel
                  number="02"
                  label={contactId ? "SEND US A MESSAGE" : "DIRECT LINE"}
                />
                {contactId ? (
                  <ContactForm formspreeId={contactId} />
                ) : (
                  <div className="border border-hairline p-8 lg:p-10">
                    <Stack gap="6">
                      <p className="max-w-[22ch] text-h2 font-medium text-ink">
                        Talk to the engineering team.
                      </p>
                      <p className="max-w-[52ch] text-body-l text-ink/70">
                        Email or call us directly — we reply to project inquiries within
                        one business day.
                      </p>
                      <Hairline className="my-2" />
                      <div className="flex flex-col gap-6">
                        <a
                          href={`mailto:${frontmatter.office.email}`}
                          className="group block"
                        >
                          <span className="block font-mono text-micro uppercase tracking-[0.08em] text-ink/50">
                            Email
                          </span>
                          <span className="mt-1 block text-h3 text-ink transition-colors group-hover:text-signal">
                            {frontmatter.office.email}
                          </span>
                        </a>
                        <a
                          href={`tel:${frontmatter.office.phone.replace(/\s+/g, "")}`}
                          className="group block"
                        >
                          <span className="block font-mono text-micro uppercase tracking-[0.08em] text-ink/50">
                            Phone
                          </span>
                          <span className="mt-1 block font-mono text-h3 tabular-nums text-ink transition-colors group-hover:text-signal">
                            {frontmatter.office.phone}
                          </span>
                        </a>
                      </div>
                    </Stack>
                  </div>
                )}
              </Stack>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
