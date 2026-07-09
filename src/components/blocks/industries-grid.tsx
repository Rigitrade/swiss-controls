import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"

type Props = { number: string; label: string; intro: string; items: string[] }

export function IndustriesGrid({ number, label, intro, items }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number={number} label={label} />
          </div>
          <p className="text-body-l text-ink/80 lg:col-span-7">{intro}</p>
        </div>
        <ul className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item} className="group flex items-center justify-between bg-paper p-6">
              <span className="text-h3 font-medium text-ink">{item}</span>
              <span className="font-mono text-micro text-ink/70 group-hover:text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
