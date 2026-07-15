import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import { ResponsiveImage } from "@/components/primitives/responsive-image"

type TechGroup = { group: string; subtitle: string; image: string; items: string[] }

type Props = {
  label: string
  groups: TechGroup[]
  surface?: "paper" | "stone"
}

/**
 * CORE TECHNOLOGIES — the hardware and software layers as photo flip-cards.
 * Each card shows its photo with the layer name over a scrim by default and,
 * on hover/focus, crossfades to a light panel listing its technologies. Pure
 * CSS reveal (static-export safe): touch devices show the list by default and
 * the card is focusable for keyboard users; all content stays in the DOM.
 */
export function CoreTechnologies({ label, groups, surface = "paper" }: Props) {
  return (
    <Section surface={surface} density="default">
      <Container>
        <div className="mb-10">
          <SectionLabel label={label} />
        </div>
        <ul className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
          {groups.map((group) => {
            const titleId = `tech-${slug(group.group)}`
            return (
              <li key={group.group}>
                <article
                  tabIndex={0}
                  aria-labelledby={titleId}
                  className="group relative aspect-[1/1] overflow-hidden bg-ink"
                >
                  <ResponsiveImage
                    src={group.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover saturate-[0.7] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />

                  {/* Default face — bottom scrim + layer name */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 z-10 flex items-end p-6 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-focus-within:opacity-0 sm:p-8 [@media(hover:none)]:opacity-0"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 to-transparent"
                    />
                    <span className="relative flex flex-col gap-2">
                      <span className="text-[2rem] font-bold uppercase leading-tight tracking-[0.08em] text-paper">
                        {group.group}
                      </span>
                      <span className="font-mono text-caption uppercase tracking-[0.12em] text-red">
                        {group.subtitle}
                      </span>
                    </span>
                  </div>

                  {/* Reveal face — light panel listing the technologies */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-center gap-4 overflow-y-auto bg-paper/92 px-6 py-6 opacity-0 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-within:opacity-100 sm:px-8 [@media(hover:none)]:opacity-100">
                    <div>
                      <h3 id={titleId} className="text-h2 font-bold uppercase tracking-[0.1em] text-ink">
                        {group.group}
                      </h3>
                      <p className="mt-1 font-mono text-micro uppercase tracking-[0.08em] text-red">
                        {group.subtitle}
                      </p>
                    </div>
                    <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
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
