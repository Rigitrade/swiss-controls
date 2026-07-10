import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import { ResponsiveImage } from "@/components/primitives/responsive-image"

type Pillar = {
  title: string
  summary: string
  points: string[]
  image?: string // optional background image (path under public/)
}

type ServicePillarsContent = {
  number: string
  label: string
  items: Pillar[]
}

type Props = {
  content: ServicePillarsContent
  surface?: "paper" | "stone"
}

/**
 * OUR SERVICES — the four business-unit pillars, as refined image cards.
 *
 * Each card shows its photo with the pillar title over a scrim by default and,
 * on hover/focus, crossfades to a translucent light panel revealing a short
 * explanation and its capability points. The reveal is pure CSS (no client JS,
 * static-export safe):
 *  - hover-capable devices hide the reveal until group-hover / group-focus-within;
 *  - touch devices (no hover) show the reveal by default so nothing is hidden;
 *  - the card is focusable (tabIndex) so keyboard users trigger the reveal, and
 *    the full content lives in the DOM regardless of visual state (opacity only),
 *    so assistive tech always reads it. The decorative title face is aria-hidden.
 */
export function ServicePillars({ content, surface = "paper" }: Props) {
  return (
    <Section surface={surface} density="default">
      <Container>
        <div className="mb-8 max-w-2xl">
          <SectionLabel number={content.number} label={content.label} />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2">
          {content.items.map((pillar) => {
            const titleId = `pillar-${slug(pillar.title)}`
            return (
              <li key={pillar.title}>
                <article
                  tabIndex={0}
                  aria-labelledby={titleId}
                  className="group relative aspect-[16/10] overflow-hidden bg-ink"
                >
                  {/* Photo — subtly zooms on hover */}
                  {pillar.image ? (
                    <ResponsiveImage
                      src={pillar.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover saturate-[0.65] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  ) : null}

                  {/* Persistent red top bar */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 z-20 h-1.5 bg-red"
                  />

                  {/* Default face — title over a bottom scrim */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-ink/90 via-ink/55 to-ink/40 p-6 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-focus-within:opacity-0 sm:p-8 [@media(hover:none)]:opacity-0"
                  >
                    <span className="text-h3 font-semibold uppercase leading-tight tracking-[0.06em] text-paper">
                      {pillar.title}
                    </span>
                  </div>

                  {/* Reveal face — translucent light panel with explanation + points */}
                  <div className="absolute inset-0 z-10 flex translate-y-2 flex-col justify-center gap-4 bg-paper/90 px-6 py-8 opacity-0 backdrop-blur-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:px-8 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                    <h3
                      id={titleId}
                      className="text-h2 font-semibold uppercase tracking-[0.06em] text-ink"
                    >
                      {pillar.title}
                    </h3>
                    <p className="max-w-md text-body text-ink/70">{pillar.summary}</p>
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-baseline gap-2 border-t border-ink/10 pt-2 font-mono text-micro uppercase tracking-[0.08em] text-ink/75"
                        >
                          <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 bg-red" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
