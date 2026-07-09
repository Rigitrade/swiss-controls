import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "About",
  description:
    "Swiss Controls — independent Swiss engineering for industrial automation, electrical engineering, industrial electrification, and system integration.",
}

// TODO(Phase 3): rewrite this page against the new `aboutPageSchema`
// (pageHeader, sections, values) — the old fields (heritage, stats, facilities,
// timeline) no longer exist on the schema. Stubbed in Task 2.9.
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return null
}
