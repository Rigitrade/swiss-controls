import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import { CountUp } from "@/components/interactive/count-up"
import type { HomeContent } from "@/lib/content/schema"

type Props = { content: HomeContent["metrics"] }

export function AtAGlance({ content }: Props) {
  return (
    <Section id="at-a-glance" surface="stone" density="tight">
      <Container>
        <div className="mb-8">
          <SectionLabel number={content.number} label={content.label} />
        </div>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {content.items.map((m) => {
            const numeric = /^\d+$/.test(m.value)
            return (
              <div key={m.label} className="border-l-2 border-signal pl-4">
                <dd className="text-display-m font-medium text-ink">
                  {numeric ? (
                    <CountUp to={Number(m.value)} suffix={m.suffix ?? ""} />
                  ) : (
                    <span>{m.value}</span>
                  )}
                </dd>
                <dt className="mt-2 font-mono text-micro uppercase tracking-[0.08em] text-ink/60">
                  {m.label}
                </dt>
              </div>
            )
          })}
        </dl>
      </Container>
    </Section>
  )
}
