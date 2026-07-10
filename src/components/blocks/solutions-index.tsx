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
                <Link
                  href={`/${locale}/solutions/${item.slug}`}
                  aria-label={item.title}
                  className="group grid grid-cols-1 items-center gap-8 border-b border-hairline py-10 lg:grid-cols-12 lg:gap-12"
                >
                  <div className={cn("lg:col-span-7", flip && "lg:order-2")}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-body-l font-medium tabular-nums text-red">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-h2 font-medium text-ink transition-colors group-hover:text-red">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-[60ch] text-body-l text-ink/70">{item.summary}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {item.capabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap}
                          className="rounded-full border border-hairline px-3 py-1 text-caption text-ink/70"
                        >
                          {cap}
                        </span>
                      ))}
                      <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.08em] text-red">
                        Explore
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "relative aspect-[16/10] overflow-hidden bg-stone lg:col-span-5",
                      flip && "lg:order-1",
                    )}
                  >
                    <ResponsiveImage
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                    />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}
