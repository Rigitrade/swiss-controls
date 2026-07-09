import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/blocks/hero"
import { StrategicValue } from "@/components/blocks/strategic-value"
import { CoreCapabilities } from "@/components/blocks/core-capabilities"
import { MetallurgyAuthority } from "@/components/blocks/metallurgy-authority"
import { ManufacturingTechnology } from "@/components/blocks/manufacturing-technology"
import { ProductionCapacity } from "@/components/blocks/production-capacity"
import { IndustryTiles } from "@/components/blocks/industry-tiles"
import { FinalCta } from "@/components/blocks/final-cta"
import { loadPageContent } from "@/lib/content/load"
import { homeSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "High-Performance Superalloys & Seamless Tubes",
  description:
    "Swiss-managed, mill-produced seamless pipes and custom castings in ultra-low carbon steels and nickel-based alloys. Advanced AOD refining. UK + Egypt manufacturing.",
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { frontmatter } = await loadPageContent(
    locale as Locale,
    "home",
    homeSchema,
  )

  return (
    <>
      <Hero hero={frontmatter.hero} locale={locale as Locale} />
      <StrategicValue content={frontmatter.strategicValue} />
      <CoreCapabilities content={frontmatter.capabilities} />
      <MetallurgyAuthority content={frontmatter.metallurgy} />
      <ManufacturingTechnology content={frontmatter.manufacturing} />
      <ProductionCapacity content={frontmatter.productionCapacity} />
      <IndustryTiles content={frontmatter.applications} />
      <FinalCta finalCta={frontmatter.finalCta} locale={locale as Locale} />
    </>
  )
}
