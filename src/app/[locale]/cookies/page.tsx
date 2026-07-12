import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { LegalPage } from "@/components/blocks/legal-page"
import { loadPageContent } from "@/lib/content/load"
import { privacyPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Swiss Controls, a brand of Rigitrade AG, uses cookies and similar technologies.",
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { frontmatter, body } = await loadPageContent(
    locale as Locale,
    "cookies",
    privacyPageSchema,
  )

  return (
    <LegalPage
      locale={locale}
      frontmatter={frontmatter}
      body={body}
      breadcrumbLabel="Cookie Policy"
    />
  )
}
