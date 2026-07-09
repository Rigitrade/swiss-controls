import { ChevronRight } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { DisplayHeading } from "@/components/typography/display-heading"
import { DataChip } from "@/components/typography/data-chip"
import type { HomeContent } from "@/lib/content/schema"

type ManufacturingTechnologyProps = {
  content: HomeContent["manufacturing"]
}

export function ManufacturingTechnology({ content }: ManufacturingTechnologyProps) {
  return (
    <Section surface="ink" className="text-paper">
      <Container>
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-micro uppercase tracking-[0.16em] text-paper/50">
            <span className="mr-2 inline-block h-1 w-6 align-middle bg-signal" />
            {content.number} — {content.label}
          </p>
          <DisplayHeading
            as="h2"
            size="display-m"
            className="mt-6 max-w-[18ch] text-paper"
          >
            From melt to final product, fully controlled.
          </DisplayHeading>
        </div>

        {/* AOD refining details — narrower, story-led */}
        <article className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Stack gap="3">
              <DataChip tone="accent" className="self-start border-signal/60 text-signal">
                AOD Refining
              </DataChip>
              <h3 className="text-h2 font-medium text-paper">{content.aod.title}</h3>
            </Stack>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3 text-body-l text-paper/80">
              {content.aod.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-3 h-px w-5 shrink-0 bg-signal"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-caption uppercase tracking-[0.16em] text-signal">
              ▸ {content.aod.benefit}
            </p>
          </div>
        </article>

        <Hairline className="my-16 bg-paper/15" />

        {/* Production route — full-width step diagram */}
        <div>
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <DataChip tone="accent" className="self-start border-signal/60 text-signal">
                Production Route
              </DataChip>
              <h3 className="mt-3 text-h2 font-medium text-paper">
                {content.route.title}
              </h3>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {content.route.benefits.map((b) => (
                  <li
                    key={b}
                    className="font-mono text-micro uppercase tracking-[0.16em] text-paper/70"
                  >
                    <span className="mr-2 inline-block h-px w-4 align-middle bg-signal" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step flow diagram */}
          <ol className="grid grid-cols-1 gap-y-6 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-x-3">
            {content.route.steps.map((step, i) => (
              <li key={step.code} className="contents">
                {/* Step card */}
                <div className="group relative flex flex-col border border-paper/15 bg-paper/[0.03] p-5 transition-colors duration-300 hover:bg-paper/[0.06] hover:border-signal/40 md:p-6">
                  <span
                    aria-hidden="true"
                    className="font-mono text-micro uppercase tracking-[0.2em] text-signal"
                  >
                    Stage · {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-3 font-mono text-display-m font-medium leading-none text-paper">
                    {step.code}
                  </h4>
                  <p className="mt-2 text-body font-medium text-paper">
                    {step.name}
                  </p>
                  <p className="mt-3 text-caption text-paper/65">{step.detail}</p>
                </div>

                {/* Connector — desktop only, between steps */}
                {i < content.route.steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden items-center justify-center md:flex"
                  >
                    <span className="block h-px w-3 bg-paper/30" />
                    <ChevronRight className="h-4 w-4 text-signal" strokeWidth={2.5} />
                    <span className="block h-px w-3 bg-paper/30" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
