import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

type Props = { content: HomeContent["deliveryFramework"] }

export function DeliveryFramework({ content }: Props) {
  return (
    <Section surface="stone">
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={content.number} label={content.label} />
        </div>
        <ol className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {content.steps.map((s, i) => (
            <li key={s.step} className="bg-paper p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-micro text-red">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px flex-1 bg-red/30" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-h3 font-medium text-ink">{s.step}</h3>
              <p className="mt-2 text-body text-mute">{s.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
