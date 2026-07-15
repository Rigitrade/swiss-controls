import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { LegalPage } from "@/components/blocks/legal-page"
import { loadPageContent } from "@/lib/content/load"
import { privacyPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "General Terms & Conditions of Swiss Controls, a brand of Rigitrade AG.",
}

export default async function GtcPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { frontmatter, body } = await loadPageContent(
    locale as Locale,
    "gtc",
    privacyPageSchema,
  )

  return (
    <LegalPage frontmatter={frontmatter} body={body} plainHeadings />
  )
}
