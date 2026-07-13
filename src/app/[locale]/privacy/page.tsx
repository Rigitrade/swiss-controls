import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { LegalPage } from "@/components/blocks/legal-page"
import { loadPageContent } from "@/lib/content/load"
import { privacyPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Legal Notice & Privacy Policy",
  description:
    "Legal notice and privacy policy for Swiss Controls, a brand of Rigitrade AG.",
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { frontmatter, body } = await loadPageContent(
    locale as Locale,
    "privacy",
    privacyPageSchema,
  )

  return (
    <LegalPage
      frontmatter={frontmatter}
      body={body}
      // 30% smaller than display-xl, uppercase (keeps display-xl's leading/tracking).
      titleClassName="text-[clamp(1.32rem,2.63vw,1.97rem)] uppercase leading-[1.05] tracking-[0.12em]"
      plainHeadings
    />
  )
}
