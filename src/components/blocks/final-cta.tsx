import Image from "next/image"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { Cluster } from "@/components/primitives/cluster"
import { LinkButton } from "@/components/ui/link-button"
import { DisplayHeading } from "@/components/typography/display-heading"
import type { HomeContent } from "@/lib/content/schema"

type FinalCtaProps = {
  finalCta: HomeContent["finalCta"]
  locale: "en" | "de"
}

export function FinalCta({ finalCta, locale }: FinalCtaProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-section-mobile text-paper lg:py-section-loose">
      <Image
        src="/img/featured/aod-furnace.jpg"
        alt=""
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/40"
      />

      <Container>
        <div className="max-w-3xl">
          <Stack gap="6">
            <span className="font-mono text-micro uppercase tracking-[0.2em] text-paper/70">
              <span
                className="mr-2 inline-block h-1 w-6 align-middle bg-forge"
                aria-hidden="true"
              />
              Final · Get in Touch
            </span>
            <DisplayHeading as="h2" size="display-l" className="text-paper">
              {finalCta.headline}
            </DisplayHeading>
            {finalCta.body && (
              <p className="max-w-[60ch] text-body-l text-paper/85 lg:text-h3">
                {finalCta.body}
              </p>
            )}
            <Cluster gap="3">
              <LinkButton
                href={`/${locale}${finalCta.primaryCta.href}`}
                variant="primary"
                size="lg"
              >
                {finalCta.primaryCta.label}
              </LinkButton>
              <LinkButton
                href={`/${locale}${finalCta.secondaryCta.href}`}
                variant="inverted"
                size="lg"
              >
                {finalCta.secondaryCta.label}
              </LinkButton>
            </Cluster>
          </Stack>
        </div>
      </Container>
    </section>
  )
}
