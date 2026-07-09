import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { cn } from "@/lib/utils/cn"

type TrustStripProps = {
  items: string[]
  className?: string
}

export function TrustStrip({ items, className }: TrustStripProps) {
  return (
    <Section surface="stone" density="tight" className={cn("py-6", className)}>
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-micro uppercase tracking-[0.08em] text-ink/80">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-x-6">
              <span>{item}</span>
              {i < items.length - 1 && (
                <span className="text-ink/30" aria-hidden="true">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
