import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"

type ServiceItem = {
  title: string
  detail: string
}

type Props = {
  heading: string
  intro: string
  items: ServiceItem[]
  surface?: "paper" | "stone"
}

/**
 * Delivery Framework — the professional services that carry a solution from
 * engineering into daily operation (testing, commissioning, enablement,
 * support). Parallel services, not sequential steps, so they read as a plain
 * card grid rather than a numbered process.
 */
export function ProfessionalServices({ heading, intro, items, surface = "stone" }: Props) {
  return (
    <Section surface={surface} density="default">
      <Container>
        <div className="mb-12 max-w-3xl">
          <h2 className="text-h1 font-semibold text-ink">{heading}</h2>
          <p className="mt-6 text-body-l text-ink/80">{intro}</p>
        </div>
        <ul className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
          {items.map((item) => (
            <li key={item.title} className="bg-paper p-6 sm:p-8">
              <span aria-hidden="true" className="block h-px w-8 bg-red/40" />
              <h3 className="mt-4 text-h3 font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-body text-mute">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
