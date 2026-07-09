import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { SectionLabel } from "@/components/typography/section-label"
import { DisplayHeading } from "@/components/typography/display-heading"
import type { HomeContent } from "@/lib/content/schema"

type StrategicValueProps = {
  content: HomeContent["strategicValue"]
}

export function StrategicValue({ content }: StrategicValueProps) {
  return (
    <Section id="strategic-value">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Stack gap="4">
              <SectionLabel number={content.number} label={content.label} />
              <DisplayHeading as="h2" size="display-m" className="max-w-[16ch]">
                {content.headline}
              </DisplayHeading>
            </Stack>
          </div>

          <div className="lg:col-span-7">
            <Stack gap="6">
              <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink/60">
                {content.intro}
              </p>
              <ul className="space-y-3 border-l border-signal/40 pl-6">
                {content.drivers.map((driver) => (
                  <li key={driver} className="text-h3 font-medium text-ink">
                    {driver}
                  </li>
                ))}
              </ul>
              <Hairline />
              <p className="text-body-l text-ink/80">{content.body}</p>
            </Stack>
          </div>
        </div>
      </Container>
    </Section>
  )
}
