import Link from "next/link"
import { Cpu, Zap, Network, DraftingCompass, RefreshCw, Factory, ArrowUpRight, type LucideIcon } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

const ICONS: Record<string, LucideIcon> = {
  Cpu, Zap, Network, DraftingCompass, RefreshCw, Factory,
}

type Props = { content: HomeContent["services"]; locale: "en" }

export function ServicesGrid({ content, locale }: Props) {
  return (
    <Section surface="paper">
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={content.number} label={content.label} />
        </div>
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Cpu
            return (
              <Link
                key={item.slug}
                href={`/${locale}/services/${item.slug}`}
                className="group relative flex flex-col bg-paper p-8 transition-colors hover:bg-stone/40"
              >
                <Stack gap="4">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-signal" aria-hidden="true" strokeWidth={1.5} />
                    <ArrowUpRight className="h-5 w-5 text-ink/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink/50">
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
