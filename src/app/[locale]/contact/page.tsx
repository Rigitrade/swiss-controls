import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { PageHeader } from "@/components/blocks/page-header"
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
            <ContactForm whatsappNumber={whatsappNumber} />
          </div>
        </Container>
      </Section>
    </>
  )
}
