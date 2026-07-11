import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import { ResponsiveImage } from "@/components/primitives/responsive-image"
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

// Editorial index: each solution is a full-width row (number + title + summary
// + capability tags on one side, a compact image on the other, alternating).
export function SolutionsIndex({ number, label, intro, items, locale }: Props) {
  return (
    <Section surface="paper">
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={number} label={label} />
          {intro ? <p className="mt-5 text-body-l text-ink/80">{intro}</p> : null}
        </div>

        <ul className="border-t border-hairline">
          {items.map((item, i) => {
            const flip = i % 2 === 1
            return (
              <li key={item.slug}>
                <div className="grid grid-cols-1 items-center gap-8 border-b border-hairline py-10 lg:grid-cols-12 lg:gap-20">
                  <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
                    <h3 className="text-h2 font-semibold text-ink">
                      <Link
                        href={`/${locale}/solutions/${item.slug}`}
                        className="transition-colors hover:text-red"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-4 text-body-l text-ink/70 text-justify">{item.summary}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                      {item.capabilities.slice(0, 3).map((cap) => (
                        <span key={cap} className="inline-flex items-center gap-2 text-body-l text-ink/70">
                          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-red" />
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "relative aspect-[16/10] overflow-hidden bg-stone lg:col-span-6 lg:aspect-[2/1]",
                      flip && "lg:order-1",
                    )}
                  >
                    <ResponsiveImage
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <Link
                      href={`/${locale}/solutions/${item.slug}`}
                      aria-label={`Explore ${item.title}`}
                      className="absolute bottom-5 right-5 inline-flex items-center gap-1 rounded-full border border-paper/20 bg-ink/40 px-4 py-2 font-mono text-micro uppercase tracking-[0.08em] text-paper shadow-lg backdrop-blur-md transition-colors duration-300 hover:bg-ink/60 hover:text-red"
                    >
                      Explore
                      <ArrowUpRight className="h-4 w-3.5 -translate-y-0.25" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
