import Image from "next/image"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

type IndustryTilesProps = {
  content: HomeContent["applications"]
}

const INDUSTRY_IMAGE_MAP: Record<string, { src: string; alt: string }> = {
  "Oil & Gas": {
    src: "/img/industries/oil-gas.jpg",
    alt: "Offshore oil and gas platform infrastructure",
  },
  Refineries: {
    src: "/img/industries/refineries.jpg",
    alt: "Refinery process plant with extensive pipework",
  },
  Petrochemicals: {
    src: "/img/industries/petrochemicals.jpg",
    alt: "Petrochemical plant tower",
  },
  Fertilizer: {
    src: "/img/industries/fertilizer.jpg",
    alt: "Process plant infrastructure",
  },
  "Power Generation": {
    src: "/img/industries/power.jpg",
    alt: "Power generation facility",
  },
  "Marine & Offshore": {
    src: "/img/industries/marine.jpg",
    alt: "Marine offshore platform at sea",
  },
}

export function IndustryTiles({ content }: IndustryTilesProps) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number={content.number} label={content.label} />
          </div>
          <div className="lg:col-span-7">
            <p className="text-body-l text-ink/80">{content.intro}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {content.industries.map((industry) => {
            const meta = INDUSTRY_IMAGE_MAP[industry] ?? {
              src: "/img/industries/oil-gas.jpg",
              alt: industry,
            }
            return (
              <article
                key={industry}
                className="group relative isolate aspect-[4/5] overflow-hidden bg-ink"
              >
                <Image
                  src={meta.src}
                  alt={meta.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-ink/0"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <span className="font-mono text-micro uppercase tracking-[0.16em] text-forge">
                    Application
                  </span>
                  <h3 className="mt-2 text-h2 font-medium text-paper">{industry}</h3>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
