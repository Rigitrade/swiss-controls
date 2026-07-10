import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"

type Category = { category: string; items: string[] }
type Props = {
  number: string
  label: string
  flow: string[]
  categories: Category[]
}

export function TechnologyPlatforms({ number, label, flow, categories }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="mb-12">
          <SectionLabel number={number} label={label} />
        </div>

        {/* Capability spine — a connected numbered pipeline that reads as the
            end-to-end automation → digital flow. */}
        <ol className="mb-20 flex flex-col gap-6 sm:flex-row">
          {flow.map((step, i) => (
            <li
              key={step}
              className="flex flex-1 items-center gap-4 sm:flex-col sm:items-start sm:gap-5"
            >
              <div className="flex items-center gap-3 sm:w-full">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red font-mono text-caption font-medium text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < flow.length - 1 ? (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-gradient-to-r from-red/50 to-hairline sm:block"
                  />
                ) : null}
              </div>
              <span className="text-h3 font-medium leading-tight tracking-tight text-ink">
                {step}
              </span>
            </li>
          ))}
        </ol>

        {/* Platform categories — number-led headers over a red accent, refined chips. */}
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
          {categories.map((cat, i) => (
            <div
              key={cat.category}
              className="flex flex-col gap-6 border-t-2 border-red/80 bg-paper p-6 sm:p-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-body-l font-medium tabular-nums text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3 font-medium text-ink">{cat.category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
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
