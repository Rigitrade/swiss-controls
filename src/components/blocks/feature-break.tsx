import Image from "next/image"
import { Container } from "@/components/primitives/container"

type FeatureBreakProps = {
  src: string
  alt: string
  quote: string
  attribution?: string
}

export function FeatureBreak({ src, alt, quote, attribution }: FeatureBreakProps) {
  return (
    <section className="relative isolate min-h-[60vh] overflow-hidden bg-ink text-paper">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/30"
      />

      <Container className="flex min-h-[60vh] items-center py-section-mobile lg:py-section">
        <blockquote className="max-w-3xl">
          <span
            aria-hidden="true"
            className="block font-mono text-micro uppercase tracking-[0.16em] text-signal"
          >
            ▸ Rigitrade
          </span>
          <p className="mt-4 text-display-m font-medium leading-tight text-paper text-balance">
            “{quote}”
          </p>
          {attribution && (
            <footer className="mt-6 font-mono text-micro uppercase tracking-[0.16em] text-paper/60">
              {attribution}
            </footer>
          )}
        </blockquote>
      </Container>
    </section>
  )
}
