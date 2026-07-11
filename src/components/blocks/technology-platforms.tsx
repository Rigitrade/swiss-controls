import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"

type Category = { category: string; items: string[] }
type Props = {
  label: string
  flow: string[]
  categories: Category[]
}

export function TechnologyPlatforms({ label, flow, categories }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="mb-14 text-center">
          <SectionLabel label={label} />
        </div>

        {/* Coverage areas — a centred set (not a sequence), each marked with the
            brand's red square. No connecting line: these are parallel domains,
            not ordered steps. */}
        <ul className="mb-20 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {flow.map((step) => (
            <li key={step} className="flex flex-col items-center gap-4 text-center">
              <span aria-hidden className="h-2 w-2 shrink-0 bg-red" />
              <span className="text-h3 font-bold leading-tight tracking-wide text-balance text-ink">
                {step}
              </span>
            </li>
          ))}
        </ul>

        {/* Platform categories — centred headers over a red accent, refined chips. */}
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.category}
              className="flex flex-col gap-6 border-t-2 border-red/80 bg-paper p-6 sm:p-8"
            >
              <h3 className="text-center text-h3 font-semibold text-ink">
                {cat.category}
              </h3>
              <ul className="flex flex-wrap justify-center gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-hairline bg-stone/40 px-3 py-1.5 text-caption text-ink/80 transition-colors hover:border-red hover:bg-paper hover:text-red"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
