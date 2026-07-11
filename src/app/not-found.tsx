import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { LinkButton } from "@/components/ui/link-button"
import { SectionLabel } from "@/components/typography/section-label"
import { DisplayHeading } from "@/components/typography/display-heading"
import { bodyFont, monoFont } from "@/lib/fonts"
import { cn } from "@/lib/utils/cn"
import "./globals.css"

export default function NotFound() {
  return (
    <html lang="en" className={cn(bodyFont.variable, monoFont.variable)}>
      <body className="bg-paper text-ink antialiased">
        <Section density="loose">
          <Container>
            <Stack gap="6">
              <SectionLabel number="404" label="NOT FOUND" />
              <DisplayHeading as="h1" size="display-l" className="max-w-[18ch]" animate={false}>
                We couldn&apos;t find that page.
              </DisplayHeading>
              <p className="max-w-[60ch] text-body-l text-ink/80">
                The link may be outdated or mistyped. Use the navigation, or return to the
                homepage.
              </p>
              <div>
                <LinkButton href="/en/" variant="primary">
                  Back to home
                </LinkButton>
              </div>
            </Stack>
          </Container>
        </Section>
      </body>
    </html>
  )
}
