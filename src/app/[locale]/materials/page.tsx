import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: "Materials",
}

// TODO(Phase 3): rewrite this page. `materialsPageSchema` no longer exists on the
// new content schema and `MaterialComparisonTable` was removed as a Rigitrade-specific
// block in Task 2.9. This page needs a full content/schema/block redesign in Phase 3.
export default async function MaterialsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return null
}
