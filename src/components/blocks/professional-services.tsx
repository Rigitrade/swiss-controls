import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"

type ServicePoint = { label: string; text: string }
type ServiceItem = {
  title: string
  detail?: string
  /** Optional labelled sub-points shown beneath the item description. */
  points?: ServicePoint[]
}

type Props = {
  /** Optional heading/intro; omit when a PageHeader already carries them. */
  heading?: string
  intro?: string
  items: ServiceItem[]
  surface?: "paper" | "stone"
}

/**
 * Delivery services — the professional services that carry a solution from
 * engineering into daily operation (testing, commissioning, enablement,
 * support). Parallel services, not sequential steps, so they read as a card
 * grid; each card can carry a couple of labelled sub-points.
 */
export function ProfessionalServices({ heading, intro, items, surface = "stone" }: Props) {
  return (
    <Section surface={surface} density="default">
      <Container>
        {(heading || intro) && (
          <div className="mb-12 max-w-3xl">
            {heading && <h2 className="text-h1 font-semibold text-ink">{heading}</h2>}
            {intro && <p className="mt-6 text-body-l text-ink/80">{intro}</p>}
          </div>
        )}
        <ul className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-4 border-t-2 border-red bg-paper p-6 sm:p-8"
            >
              <div>
                <h3 className="text-h3 font-semibold text-ink">{item.title}</h3>
                {item.detail && <p className="mt-2 text-body text-mute">{item.detail}</p>}
              </div>
              {item.points && item.points.length > 0 && (
                <ul className="space-y-2.5 border-t border-hairline pt-4">
                  {item.points.map((point) => (
                    <li key={point.label} className="flex items-start gap-2.5 text-body text-ink/80">
                      <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-red" />
                      <span>
                        <span className="font-semibold text-ink">{point.label}:</span> {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
