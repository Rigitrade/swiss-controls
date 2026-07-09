import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import { DisplayHeading } from "@/components/typography/display-heading"

type GalleryItem = {
  src: string
  alt: string
  caption: string
  span: "wide" | "tall" | "square" | "full"
}

const ITEMS: GalleryItem[] = [
  {
    src: "/img/gallery/pipes.jpg",
    alt: "Seamless pipe array",
    caption: "Seamless Pipes",
    span: "wide",
  },
  {
    src: "/img/gallery/aod.jpg",
    alt: "AOD furnace molten metal stream",
    caption: "AOD Refining",
    span: "tall",
  },
  {
    src: "/img/gallery/specimen.jpg",
    alt: "Macro alloy specimen",
    caption: "Alloy Specimen",
    span: "square",
  },
  {
    src: "/img/gallery/fitting.jpg",
    alt: "Precision-machined fitting",
    caption: "Precision Fitting",
    span: "square",
  },
  {
    src: "/img/gallery/floor.jpg",
    alt: "Manufacturing floor",
    caption: "Manufacturing Floor",
    span: "wide",
  },
  {
    src: "/img/gallery/casting.jpg",
    alt: "Investment casting on inspection bench",
    caption: "Investment Casting",
    span: "square",
  },
]

const spanClass: Record<GalleryItem["span"], string> = {
  wide: "md:col-span-2 aspect-[16/9]",
  tall: "md:row-span-2 aspect-[3/4] md:aspect-[3/5]",
  square: "aspect-square",
  full: "md:col-span-3 aspect-[21/9]",
}

type ManufacturingGalleryProps = {
  locale: "en" | "de"
}

export function ManufacturingGallery({ locale }: ManufacturingGalleryProps) {
  return (
    <Section surface="paper">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number="08" label="GALLERY" />
            <DisplayHeading as="h2" size="display-m" className="mt-6 max-w-[14ch]">
              From melt to delivery.
            </DisplayHeading>
          </div>
          <div className="lg:col-span-7 lg:pt-12">
            <p className="max-w-[55ch] text-body-l text-ink/80">
              Production photography from our UK and Egypt manufacturing
              operations — inspection-grade pipes, custom castings, and
              AOD-refined alloys engineered for critical service.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:grid-rows-[auto]">
          {ITEMS.map((item) => (
            <figure
              key={item.src}
              className={`group relative isolate overflow-hidden bg-ink ${spanClass[item.span]}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
              />
              <figcaption className="absolute bottom-4 left-4 right-4 font-mono text-micro uppercase tracking-[0.16em] text-paper/90">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.16em] text-ink hover:text-forge"
          >
            Request a site visit or audit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  )
}
