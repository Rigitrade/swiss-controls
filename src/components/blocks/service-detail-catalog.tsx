import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"

type Props = { summary: string; catalog: string[] }

export function ServiceDetailCatalog({ summary, catalog }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Stack gap="4">
              <SectionLabel number="01" label="SCOPE" />
              <p className="text-body-l text-ink/80">{summary}</p>
            </Stack>
          </aside>
          <div className="lg:col-span-8">
            <ol className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
              {catalog.map((item, i) => (
                <li key={item} className="flex items-start gap-4 bg-paper p-5">
                  <span className="font-mono text-micro text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-body text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  )
}
