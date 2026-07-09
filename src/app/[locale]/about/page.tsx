import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import Image from "next/image"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { PageHeader } from "@/components/blocks/page-header"
import { FinalCta } from "@/components/blocks/final-cta"
import { SectionLabel } from "@/components/typography/section-label"
import { DisplayHeading } from "@/components/typography/display-heading"
import { CountUp } from "@/components/interactive/count-up"
import { loadPageContent } from "@/lib/content/load"
import { homeSchema, aboutPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "About",
  description:
    "Rigitrade AG — Swiss-managed manufacturer of high-performance seamless pipes and superalloy components. British metallurgical heritage, AOD refining, UK + Egypt manufacturing.",
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { frontmatter } = await loadPageContent(
    locale as Locale,
    "about",
    aboutPageSchema,
  )
  const home = await loadPageContent(locale as Locale, "home", homeSchema)

  return (
    <>
      <PageHeader
        number={frontmatter.pageHeader.number}
        label={frontmatter.pageHeader.label}
        title={frontmatter.pageHeader.title}
        intro={frontmatter.pageHeader.intro}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "About" }]}
      />

      {/* Heritage narrative */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionLabel number="01" label="HERITAGE" />
            </div>
            <div className="lg:col-span-7">
              <Stack gap="6">
                <DisplayHeading as="h2" size="display-m" className="max-w-[20ch]">
                  {frontmatter.heritage.title}
                </DisplayHeading>
                <p className="max-w-[65ch] text-body-l text-ink/80">
                  {frontmatter.heritage.body}
                </p>
              </Stack>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats strip */}
      <Section surface="stone" density="tight" className="py-16">
        <Container>
          <ul className="grid grid-cols-2 gap-px bg-hairline lg:grid-cols-4">
            {frontmatter.stats.map((stat, i) => {
              const numeric = Number(stat.value)
              const animateNumber = !Number.isNaN(numeric) && numeric < 1000
              return (
                <li
                  key={`${stat.value}-${stat.unit}`}
                  className="bg-stone p-6 lg:p-8"
                >
                  <Stack gap="2">
                    <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink/50">
                      <span
                        className="mr-2 inline-block h-px w-4 align-middle bg-signal"
                        aria-hidden="true"
                      />
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-end gap-2 leading-none">
                      {animateNumber ? (
                        <CountUp
                          to={numeric}
                          className="font-mono text-display-l font-medium tabular-nums text-ink"
                        />
                      ) : (
                        <span className="font-mono text-display-l font-medium tabular-nums text-ink">
                          {stat.value}
                        </span>
                      )}
                      <span className="pb-2 font-mono text-caption uppercase tracking-[0.16em] text-signal">
                        {stat.unit}
                      </span>
                    </div>
                    <p className="text-caption text-ink/70">{stat.label}</p>
                  </Stack>
                </li>
              )
            })}
          </ul>
        </Container>
      </Section>

      {/* Facility cards with photos */}
      <Section>
        <Container>
          <div className="mb-12">
            <SectionLabel number="02" label="FACILITIES" />
            <DisplayHeading as="h2" size="display-m" className="mt-6 max-w-[18ch]">
              Three locations. One quality system.
            </DisplayHeading>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
            {frontmatter.facilities.map((facility, i) => (
              <article
                key={facility.location}
                className="group relative isolate flex h-full flex-col overflow-hidden bg-paper"
              >
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-stone">
                  <Image
                    src={facility.image.src}
                    alt={facility.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/40 to-ink/0"
                  />
                </div>
                <div className="flex flex-1 flex-col border-x border-b border-hairline p-6">
                  <Stack gap="3" className="flex-1">
                    <span className="font-mono text-micro uppercase tracking-[0.16em] text-signal">
                      {String(i + 1).padStart(2, "0")} — {facility.role}
                    </span>
                    <h3 className="text-h2 font-medium text-ink">
                      {facility.location}
                    </h3>
                    {facility.detail && (
                      <p className="text-body text-ink/70">{facility.detail}</p>
                    )}
                  </Stack>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Horizontal stepped timeline */}
      <Section surface="ink" className="text-paper">
        <Container>
          <div className="mb-12">
            <p className="font-mono text-micro uppercase tracking-[0.16em] text-paper/50">
              <span
                className="mr-2 inline-block h-1 w-6 align-middle bg-signal"
                aria-hidden="true"
              />
              03 — TIMELINE
            </p>
            <DisplayHeading
              as="h2"
              size="display-m"
              className="mt-6 max-w-[20ch] text-paper"
            >
              The next 18 months.
            </DisplayHeading>
          </div>

          <ol className="relative">
            {/* horizontal rule running through all milestones (desktop) */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[44px] hidden h-px bg-paper/20 md:block"
            />
            <div className="relative grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8">
              {frontmatter.timeline.map((m, i) => (
                <li key={m.milestone} className="relative">
                  {/* node dot */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-10 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal md:block"
                    style={{ left: 0 }}
                  />
                  <div className="md:pt-20">
                    <span className="font-mono text-caption uppercase tracking-[0.16em] text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-h3 font-medium text-paper">
                      {m.milestone}
                    </h3>
                    <p className="mt-1 font-mono text-body tabular-nums text-paper/70">
                      {m.date}
                    </p>
                    {m.detail && (
                      <p className="mt-3 text-body text-paper/70">{m.detail}</p>
                    )}
                  </div>
                </li>
              ))}
            </div>
          </ol>
        </Container>
      </Section>

      <FinalCta finalCta={home.frontmatter.finalCta} locale={locale as Locale} />
    </>
  )
}
