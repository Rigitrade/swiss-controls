import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

type ApplicationFocusProps = {
  content: HomeContent["applications"]
}

export function ApplicationFocus({ content }: ApplicationFocusProps) {
  return (
    <Section surface="stone" density="tight">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel number={content.number} label={content.label} />
            <p className="mt-4 text-body-l text-ink/80">{content.intro}</p>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3">
              {content.industries.map((industry) => (
                <li
                  key={industry}
                  className="flex items-center gap-3 font-mono text-micro uppercase tracking-[0.08em] text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 shrink-0 bg-signal"
                  />
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
