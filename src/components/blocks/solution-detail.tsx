import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"

type Props = { challenge: string; approach: string; capabilities: string[] }

export function SolutionDetail({ challenge, approach, capabilities }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-5">
            <Stack gap="4">
              <SectionLabel number="01" label="THE CHALLENGE" />
              <blockquote className="border-l-2 border-signal pl-6">
                <p className="text-body-l text-ink/80">{challenge}</p>
              </blockquote>
            </Stack>
          </aside>
          <div className="lg:col-span-7">
            <Stack gap="4">
              <SectionLabel number="02" label="OUR APPROACH" />
              <p className="text-body-l text-ink">{approach}</p>
            </Stack>
          </div>
        </div>
        <div className="mt-16">
          <div className="mb-8">
            <SectionLabel number="03" label="CORE CAPABILITIES ENGINEERED" />
          </div>
          <ol className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
            {capabilities.map((item, i) => (
              <li key={item} className="flex items-start gap-4 bg-paper p-5">
                <span className="font-mono text-micro text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-body text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
