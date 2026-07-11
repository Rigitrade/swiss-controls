import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import { ResponsiveImage } from "@/components/primitives/responsive-image"
import { ScrollReveal } from "@/components/interactive/scroll-reveal"
import { cn } from "@/lib/utils/cn"

type Item = {
  slug: string
  title: string
  summary: string
  image: string
  capabilities: string[]
}

type Props = {
  number: string
  label: string
  intro?: string
  items: Item[]
  locale: "en"
}

// Full-screen showcase: a slim intro band, then each solution as its own
// full-viewport panel — a full-bleed image beside vertically-centred content,
// sides alternating, backgrounds alternating paper/stone so each reads as a
// distinct "page". The whole panel links through to the solution detail.
export function SolutionsIndex({ number, label, intro, items, locale }: Props) {
  return (
    <>
      <Section surface="paper" density="tight">
        <Container>
          <div className="max-w-2xl">
            <SectionLabel number={number} label={label} />
            {intro ? <p className="mt-5 text-body-l text-ink/80">{intro}</p> : null}
          </div>
        </Container>
      </Section>

      {items.map((item, i) => {
        const flip = i % 2 === 1
        return (
          <section
            key={item.slug}
            className={cn(
              "relative border-t border-hairline",
              flip ? "bg-stone" : "bg-paper",
            )}
          >
            <Link
              href={`/${locale}/solutions/${item.slug}`}
              aria-label={item.title}
              className="group grid min-h-[100svh] grid-cols-1 lg:grid-cols-2"
            >
              {/* Image half — full-bleed within the panel, with a red edge rule. */}
              <div
                className={cn(
                  "relative min-h-[44svh] overflow-hidden lg:min-h-full",
                  flip && "lg:order-2",
                )}
              >
                <ResponsiveImage
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 w-1 bg-red",
                    flip ? "right-0" : "left-0",
                  )}
                />
              </div>

              {/* Content half — vertically centred, revealed on scroll. */}
              <div
                className={cn(
                  "flex items-center px-6 py-16 sm:px-10 lg:px-16",
                  flip && "lg:order-1",
                )}
              >
                <ScrollReveal className="max-w-xl">
                  <span aria-hidden="true" className="mb-6 inline-block h-2.5 w-2.5 bg-red" />
                  <h3 className="text-display-m font-bold leading-[1.05] tracking-tight text-balance text-ink transition-colors group-hover:text-red">
                    {item.title}
                  </h3>
                  <p className="mt-6 max-w-[52ch] text-body-l leading-relaxed text-ink/70">
                    {item.summary}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {item.capabilities.slice(0, 3).map((cap) => (
                      <li
                        key={cap}
                        className="rounded-full border border-hairline bg-paper/70 px-3 py-1.5 text-caption text-ink/70"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-10 inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.16em] text-red">
                    Explore
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </ScrollReveal>
              </div>
            </Link>
          </section>
        )
      })}
    </>
  )
}
