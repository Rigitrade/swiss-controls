import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"

type Group = { category: string; items: string[] }
type Props = { number: string; label: string; intro: string; groups: Group[] }

export function IndustriesGroups({ number, label, intro, groups }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number={number} label={label} />
          </div>
          <p className="text-body-l text-ink/80 lg:col-span-7">{intro}</p>
        </div>
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.category} className="flex flex-col gap-5 bg-paper p-6">
              <div className="flex items-baseline justify-between border-b border-hairline pb-4">
                <h3 className="text-h3 font-semibold text-ink">{group.category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
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
