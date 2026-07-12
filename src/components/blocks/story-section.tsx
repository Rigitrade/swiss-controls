import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { GhostMark } from "@/components/typography/ghost-mark"

type StorySectionProps = { paragraphs: string[] }

export function StorySection({ paragraphs }: StorySectionProps) {
  return (
    <Section surface="stone" density="default">
      <Container>
        <SectionLabel label="OUR STORY" />
        <div className="mt-4 grid grid-cols-1 gap-8 lg:mt-6 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Stack gap="3" className="lg:col-span-8">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="max-w-[68ch] text-body-l leading-relaxed text-ink/90">
                {paragraph}
              </p>
            ))}
          </Stack>
          <div className="lg:col-span-4">
            <GhostMark />
          </div>
        </div>
      </Container>
    </Section>
  )
}
