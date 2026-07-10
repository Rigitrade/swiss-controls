import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { ResponsiveImage } from "@/components/primitives/responsive-image"

type SolutionsGridContent = {
  number: string
  label: string
  items: { slug: string; title: string; summary: string; image: string }[]
}

type Props = {
  content: SolutionsGridContent
  locale: "en"
  surface?: "paper" | "stone"
  density?: "tight" | "default"
  columns?: 2 | 4
}

export function SolutionsGrid({ content, locale, surface = "paper", density = "default", columns = 2 }: Props) {
  const gridCols = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"
  const imageAspect = columns === 4 ? "aspect-[3/4]" : "aspect-[4/3]"
  const imageSizes =
    columns === 4
      ? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      : "(min-width: 768px) 50vw, 100vw"
  return (
    <Section surface={surface} density={density}>
      <Container>
        <div className="mb-8 max-w-2xl">
          <SectionLabel number={content.number} label={content.label} />
        </div>
        <div className={`grid grid-cols-1 gap-px bg-hairline ${gridCols}`}>
          {content.items.map((item, i) => (
            <Link
              key={item.slug}
              href={`/${locale}/solutions/${item.slug}`}
              className="group relative flex flex-col bg-paper transition-colors hover:bg-stone/40"
            >
              <div className={`relative ${imageAspect} overflow-hidden`}>
                <ResponsiveImage
                  src={item.image}
                  alt=""
                  fill
                  sizes={imageSizes}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/60 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="font-mono text-micro uppercase tracking-[0.16em] text-paper/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-paper/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </div>
              <Stack gap="3" className="p-6">
                <h3 className="text-h3 font-medium text-ink">{item.title}</h3>
                <p className="text-body text-ink/70">{item.summary}</p>
              </Stack>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
