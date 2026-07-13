import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import { ResponsiveImage } from "@/components/primitives/responsive-image"

type Industry = { category: string; items: string[]; image: string }

type Props = {
  label: string
  heading: string
  groups: Industry[]
  surface?: "paper" | "stone"
}

/**
 * INDUSTRIES WE SERVE — photo cards, one per industry group (rigitrade
 * "Application Focus" style). Each card shows its photo with the group name
 * over a scrim by default and, on hover/focus, crossfades to a light panel
 * revealing the group's sub-items. Pure-CSS reveal (static-export safe):
 * hover-capable devices hide the reveal until group-hover / group-focus-within;
 * touch devices (no hover) show it by default; the card is focusable so keyboard
 * users trigger it, and all content stays in the DOM (opacity only) for AT.
 */
export function IndustriesFocus({ label, heading, groups, surface = "stone" }: Props) {
  return (
    <Section surface={surface} density="default">
      <Container>
        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8">
          <SectionLabel label={label} className="shrink-0" />
          <h2 className="text-h2 font-semibold text-ink lg:whitespace-nowrap lg:text-right">
            {heading}
          </h2>
        </div>
        <ul className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const titleId = `industry-${slug(group.category)}`
            return (
              <li key={group.category}>
                <article
                  tabIndex={0}
                  aria-labelledby={titleId}
                  className="group relative aspect-[3/4] overflow-hidden bg-ink"
                >
                  <ResponsiveImage
                    src={group.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover saturate-[0.7] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />

                  {/* Default face — bottom scrim + group name */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 flex items-end p-6 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-focus-within:opacity-0 [@media(hover:none)]:opacity-0"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 to-transparent"
                    />
                    <span className="relative text-[1.5rem] font-bold uppercase leading-tight tracking-[0.1em] text-paper">
                      {group.category}
                    </span>
                  </div>

                  {/* Reveal face — light panel with the sub-items */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-center gap-3 overflow-y-auto bg-paper/92 px-6 py-6 opacity-0 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100">
                    <h3
                      id={titleId}
                      className="text-h3 font-bold uppercase tracking-[0.1em] text-ink"
                    >
                      {group.category}
                    </h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-body text-ink/80">
                          <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-red" />
                          <span>{item}</span>
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
