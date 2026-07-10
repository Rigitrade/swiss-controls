import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

type Props = { content: HomeContent["deliveryFramework"]; surface?: "paper" | "stone" }

export function DeliveryFramework({ content, surface = "stone" }: Props) {
  return (
    <Section surface={surface}>
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={content.number} label={content.label} />
        </div>
        <ol className="flex flex-col gap-px bg-line">
          {content.steps.map((s, i) => (
            <li key={s.step} className="bg-paper">
              <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 md:p-8">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-micro text-red">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-red/30" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-h3 font-medium text-ink">{s.step}</h3>
                  <p className="mt-2 text-body text-mute">{s.detail}</p>
                </div>
                {s.points && s.points.length > 0 && (
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-2 self-center sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-baseline gap-2 text-body text-ink">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
