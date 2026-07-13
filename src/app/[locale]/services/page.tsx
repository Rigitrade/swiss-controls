import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"

export const metadata: Metadata = {
  title: "Services",
  description: "Swiss Controls engineering services.",
}

// Placeholder: the Services page currently shows only its header; the section
// content will be added later.
export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return <PageHeader title="Services" centered />
}
