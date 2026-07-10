import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import type { HomeContent } from "@/lib/content/schema"

type Props = { content: HomeContent["partners"]; locale: "en"; surface?: "paper" | "stone" }

export function PartnerStrip({ content, locale, surface = "paper" }: Props) {
  return (
    <Section surface={surface} density="default">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-16">
          <div className="max-w-sm">
            <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink/60">
              {content.label}
            </p>
            <p className="mt-3 text-body-l text-ink/80">{content.statement}</p>
            <Link
              href={`/${locale}${content.cta.href}`}
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.08em] text-red transition-colors hover:text-ink"
            >
              {content.cta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
            </Link>
          </div>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-hairline pt-6 md:border-l md:border-t-0 md:pt-0 md:pl-16">
            {content.items.map((name) => (
              <li key={name} className="text-h3 font-medium tracking-tight text-ink/75">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
