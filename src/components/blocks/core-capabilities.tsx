import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { ResponsiveImage } from "@/components/primitives/responsive-image"
import { SectionLabel } from "@/components/typography/section-label"
import { DataChip } from "@/components/typography/data-chip"
import type { HomeContent } from "@/lib/content/schema"

type CoreCapabilitiesProps = {
  content: HomeContent["capabilities"]
}

export function CoreCapabilities({ content }: CoreCapabilitiesProps) {
  return (
    <Section surface="paper">
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={content.number} label={content.label} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {content.items.map((item, i) => (
            <article
              key={item.title}
              className="group relative isolate flex h-full flex-col bg-paper"
            >
              {item.image && (
                <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-stone">
                  <ResponsiveImage
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col border-x border-b border-hairline p-6">
                <Stack gap="3" className="flex-1">
                  <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink/50">
                    {String(i + 1).padStart(2, "0")} — Capability
                  </span>
                  <h3 className="text-h3 font-medium text-ink">{item.title}</h3>
                  <DataChip className="self-start">{item.description}</DataChip>
                  {item.detail && (
                    <p className="text-body text-ink/70 line-clamp-3">
                      {item.detail}
                    </p>
                  )}
                </Stack>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Hairline />
          <p className="mt-6 max-w-3xl text-body text-ink/70">
            {content.standards}
          </p>
        </div>
      </Container>
    </Section>
  )
}
