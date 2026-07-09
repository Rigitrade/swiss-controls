import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { SectionLabel } from "@/components/typography/section-label"
import { CountUp } from "@/components/interactive/count-up"
import type { HomeContent } from "@/lib/content/schema"

type ProductionCapacityProps = {
  content: HomeContent["productionCapacity"]
}

export function ProductionCapacity({ content }: ProductionCapacityProps) {
  return (
    <Section>
      <Container>
        <div className="mb-16">
          <SectionLabel number={content.number} label={content.label} />
        </div>

        {/* Hero stat strip — 4 big numbers */}
        <ul className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat, i) => {
            const numeric = Number(stat.value)
            const animateNumber = !Number.isNaN(numeric) && numeric < 1000
            return (
              <li
                key={`${stat.value}-${stat.unit}`}
                className="bg-paper p-8 lg:p-10"
              >
                <Stack gap="2">
                  <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink/50">
                    <span
                      className="mr-2 inline-block h-px w-4 align-middle bg-signal"
                      aria-hidden="true"
                    />
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-end gap-3 leading-none">
                    {animateNumber ? (
                      <CountUp
                        to={numeric}
                        className="font-mono text-display-l font-medium tabular-nums text-ink lg:text-display-xl"
                      />
                    ) : (
                      <span className="font-mono text-display-l font-medium tabular-nums text-ink lg:text-display-xl">
                        {stat.value}
                      </span>
                    )}
                    <span className="pb-2 font-mono text-caption uppercase tracking-[0.16em] text-signal">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="text-body text-ink/70">{stat.label}</p>
                </Stack>
              </li>
            )
          })}
        </ul>

        {/* Context blocks — global footprint, logistics, timeline */}
        <Hairline className="mt-16" />
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {content.context.map((block, i) => (
            <article key={block.title}>
              <Stack gap="3">
                <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink/50">
                  {String(i + 1).padStart(2, "0")} — Context
                </span>
                <h3 className="text-h3 font-medium text-ink">{block.title}</h3>
                <ul className="space-y-2 text-body text-ink/75">
                  {block.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-4 shrink-0 bg-signal"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Stack>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
