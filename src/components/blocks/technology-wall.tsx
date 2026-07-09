import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

type Props = { content: HomeContent["technologies"] }

export function TechnologyWall({ content }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number={content.number} label={content.label} />
          </div>
          <p className="text-body text-ink/70 lg:col-span-7">{content.note}</p>
        </div>
        <ul className="grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-4">
          {content.vendors.map((v) => (
            <li
              key={v}
              className="flex items-center justify-center bg-paper px-4 py-8 text-center font-mono text-caption uppercase tracking-[0.12em] text-ink/70 grayscale transition-colors hover:text-ink"
            >
              {v}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
