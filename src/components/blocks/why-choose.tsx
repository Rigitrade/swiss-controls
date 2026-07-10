import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"

type Item = { title: string; detail: string }
type Props = {
  number: string
  label: string
  items: Item[]
  surface?: "paper" | "stone"
}

export function WhyChoose({ number, label, items, surface = "stone" }: Props) {
  return (
    <Section surface={surface} density="default">
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={number} label={label} />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="border-t-2 border-red pt-4">
              <h3 className="text-h3 font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-body text-ink/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
