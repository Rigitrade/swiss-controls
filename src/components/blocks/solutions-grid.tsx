import Link from "next/link"
import { RefreshCw, Zap, Cpu, DraftingCompass, ArrowUpRight, type LucideIcon } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { ResponsiveImage } from "@/components/primitives/responsive-image"

const ICONS: Record<string, LucideIcon> = {
  RefreshCw, Zap, Cpu, DraftingCompass, ArrowUpRight,
}

type SolutionsGridContent = {
  number: string
  label: string
  items: { slug: string; icon: string; title: string; summary: string; image: string }[]
}

type Props = { content: SolutionsGridContent; locale: "en"; surface?: "paper" | "stone" }

export function SolutionsGrid({ content, locale, surface = "paper" }: Props) {
  return (
    <Section surface={surface}>
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={content.number} label={content.label} />
        </div>
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
          {content.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? RefreshCw
            return (
              <Link
                key={item.slug}
                href={`/${locale}/solutions/${item.slug}`}
                className="group relative flex flex-col bg-paper transition-colors hover:bg-stone/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ResponsiveImage
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <Stack gap="4" className="p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-red" aria-hidden="true" strokeWidth={1.5} />
                    <ArrowUpRight className="h-5 w-5 text-ink/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-h3 font-medium text-ink">{item.title}</h3>
                  <p className="text-body text-ink/70">{item.summary}</p>
                </Stack>
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
