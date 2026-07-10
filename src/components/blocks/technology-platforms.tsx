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
        <div className="mb-10">
          <SectionLabel number={number} label={label} />
        </div>
        <ul className="mb-12 flex flex-wrap items-center gap-x-3 gap-y-3 border-y border-hairline py-6">
          {flow.map((step, i) => (
            <li key={step} className="flex items-center gap-x-3">
              <span className="font-mono text-caption uppercase tracking-[0.12em] text-ink/80">
                {step}
              </span>
              {i < flow.length - 1 ? (
                <span aria-hidden className="text-red">
                  &rarr;
                </span>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
          {categories.map((cat, i) => (
            <div key={cat.category} className="flex flex-col gap-5 bg-paper p-6">
              <div className="flex items-baseline justify-between border-b border-hairline pb-4">
                <h3 className="text-h3 font-medium text-ink">{cat.category}</h3>
                <span className="font-mono text-micro text-ink/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-hairline px-3 py-1 text-body text-ink/80 transition-colors hover:border-red hover:text-red"
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
