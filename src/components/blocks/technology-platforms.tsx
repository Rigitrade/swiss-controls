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

        {/* Capability spine — the end-to-end automation → digital story,
            as a numbered pipeline rather than a caption. */}
        <ol className="mb-16 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {flow.map((step, i) => (
            <li key={step} className="group relative pt-6">
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/15" />
              <span
                aria-hidden
                className="absolute left-0 top-0 h-2 w-2 -translate-y-1/2 rounded-full bg-red"
              />
              <span className="font-mono text-micro text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-h3 font-medium leading-tight tracking-tight text-ink">
                {step}
              </span>
            </li>
          ))}
        </ol>

        {/* Platform categories — number-led headers, refined chips. */}
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2">
          {categories.map((cat, i) => (
            <div key={cat.category} className="flex flex-col gap-6 bg-paper p-6 sm:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-caption font-medium text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3 font-medium text-ink">{cat.category}</h3>
              </div>
              <span aria-hidden className="h-px w-full bg-hairline" />
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-hairline px-3 py-1.5 text-body text-ink/80 transition-colors hover:border-red hover:text-red"
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
