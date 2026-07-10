import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

type Props = { content: HomeContent["partners"]; locale: "en"; surface?: "paper" | "stone" }

export function PartnerStrip({ content, locale, surface = "paper" }: Props) {
  return (
    <Section surface={surface} density="default">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-16">
          <div className="max-w-sm">
            <SectionLabel number={content.number} label={content.label} />
            <p className="mt-4 text-body-l text-ink/80">{content.statement}</p>
            <Link
              href={`/${locale}${content.cta.href}`}
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.08em] text-red transition-colors hover:text-ink"
            >
              {content.cta.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
            </Link>
          </div>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-hairline pt-8 md:border-l md:border-t-0 md:pt-0 md:pl-16">
            {content.items.map((item) => (
              <li key={item.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo}
                  alt={item.name}
                  loading="lazy"
                  className="h-7 w-auto max-w-[150px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 motion-safe:hover:-translate-y-0.5 sm:h-8"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
