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
}

/**
 * OUR SERVICES — the four business-unit pillars.
 *
 * A full-bleed, viewport-height 2×2 band. Each block shows a large centered
 * title by default and, on hover/focus, crossfades to a translucent light panel
 * revealing a short explanation and its capability points. Blocks may carry an
 * optional background image; a frosted light wash keeps everything legible while
 * letting the image show through.
 *
 * The reveal is pure CSS (no client JS, static-export safe):
 *  - hover-capable devices hide the reveal until group-hover / group-focus-within;
 *  - touch devices (no hover) show the reveal by default so nothing is hidden;
 *  - the block is focusable (tabIndex) so keyboard users trigger the reveal, and
 *    the full content lives in the DOM regardless of visual state (opacity only),
 *    so assistive tech always reads it. The decorative title face is aria-hidden.
 */
export function ServicePillars({ content }: Props) {
  const labelId = "our-services-label"
  return (
    <section
      aria-labelledby={labelId}
      className="relative w-full border-t border-hairline bg-paper"
    >
      <div className="flex h-16 items-center px-6 lg:px-10">
        <SectionLabel number={content.number} label={content.label} id={labelId} />
      </div>
      <ul className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2 lg:h-[calc(100vh-4rem)]">
        {content.items.map((pillar) => {
          const titleId = `pillar-${slug(pillar.title)}`
          return (
            <li key={pillar.title} className="min-h-[52vh] lg:min-h-0">
              <article
                tabIndex={0}
                aria-labelledby={titleId}
                className="group relative flex h-full w-full overflow-hidden bg-stone"
              >
                {/* Optional background image */}
                {pillar.image ? (
                  <ResponsiveImage
                    src={pillar.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : null}

                {/* Persistent red top bar */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-20 h-2 bg-red"
                />

                {/* Default face — large centered title over a frosted light wash */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-paper/45 px-6 text-center backdrop-blur-[2px] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-focus-within:opacity-0 [@media(hover:none)]:opacity-0"
                >
                  <span className="text-display-m font-semibold uppercase leading-tight tracking-[0.1em] text-mute">
                    {pillar.title}
                  </span>
                </div>

                {/* Reveal face — translucent light panel with explanation + points */}
                <div className="absolute inset-0 z-10 flex translate-y-2 flex-col justify-center gap-5 bg-paper/85 px-8 py-10 opacity-0 backdrop-blur-sm transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 lg:px-10 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                  <h3
                    id={titleId}
                    className="text-h2 font-semibold uppercase tracking-[0.08em] text-ink"
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
    </section>
  )
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
