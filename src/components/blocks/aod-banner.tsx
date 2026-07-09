import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"

type AodBannerProps = {
  text: string
}

export function AodBanner({ text }: AodBannerProps) {
  return (
    <Section surface="ink" density="tight" className="py-5">
      <Container>
        <p className="flex flex-wrap items-center justify-center gap-3 text-center font-mono text-micro uppercase tracking-[0.16em] text-paper">
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-signal" />
          {text}
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-signal" />
        </p>
      </Container>
    </Section>
  )
}
