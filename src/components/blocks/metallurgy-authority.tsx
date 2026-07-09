import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { SectionLabel } from "@/components/typography/section-label"
import { DisplayHeading } from "@/components/typography/display-heading"
import type { HomeContent } from "@/lib/content/schema"

type MetallurgyAuthorityProps = {
  content: HomeContent["metallurgy"]
}

export function MetallurgyAuthority({ content }: MetallurgyAuthorityProps) {
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <SectionLabel number={content.number} label={content.label} />
          <DisplayHeading as="h2" size="display-m" className="mt-6 max-w-[16ch]">
            The right alloy for the worst conditions.
          </DisplayHeading>
        </div>

        <div className="space-y-12">
          {content.families.map((family, i) => (
            <article key={family.name}>
              <Hairline className="mb-8" />
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-3">
                  <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink/50">
                    {String(i + 1).padStart(2, "0")} — Family
                  </span>
                  <h3 className="mt-2 text-h2 font-medium">{family.name}</h3>
                </div>

                <div className="lg:col-span-5">
                  <Stack gap="2">
                    <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink/50">
                      Grades
                    </span>
                    <ul className="space-y-1 font-mono tabular-nums text-body text-ink">
                      {family.alloys.map((alloy) => (
                        <li key={alloy}>{alloy}</li>
                      ))}
                    </ul>
                  </Stack>
                </div>

                <div className="lg:col-span-4">
                  <Stack gap="2">
                    <span className="font-mono text-micro uppercase tracking-[0.08em] text-ink/50">
                      Performance
                    </span>
                    <p className="text-body text-ink/80">{family.benefit}</p>
                  </Stack>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
