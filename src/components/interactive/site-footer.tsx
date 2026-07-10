import Link from "next/link"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Wordmark } from "@/components/typography/wordmark"
import { Hairline } from "@/components/primitives/hairline"
import { DisplayHeading } from "@/components/typography/display-heading"
import type { FooterContent } from "@/lib/content/schema"

type SiteFooterProps = {
  locale: "en" | "de"
  content: FooterContent
}

export function SiteFooter({ locale, content }: SiteFooterProps) {
  return (
    <Section
      as="footer"
      surface="ink"
      density="loose"
      className="relative isolate text-paper"
    >
      {/* Bright top seam — separates the footer from whatever sits above it,
          including the dark final-CTA section on the home page. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red via-red to-red"
      />
      {/* Cool top sheen lifts the footer's top edge into slate so it reads as a
          distinct machined plate even against a near-black section above. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-steel/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-red/[0.06] to-transparent"
      />
      <Container>
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-paper/10 pb-8">
          <span className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.16em] text-paper/70">
            <span aria-hidden="true" className="inline-block h-1 w-1 rounded-full bg-red" />
            A RIGITRADE AG Brand
          </span>
          <a
            href="#main"
            className="group inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.16em] text-paper/50 transition-colors hover:text-red"
          >
            Back to top
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </a>
        </div>

        <div className="mb-16">
          <Wordmark size="xl" className="text-paper" />
          <DisplayHeading
            as="h2"
            size="display-m"
            className="mt-8 max-w-[20ch] text-paper"
            animate={false}
          >
            {content.tagline}
          </DisplayHeading>
          <p className="mt-6 inline-flex items-center gap-3 font-mono text-micro uppercase tracking-[0.16em] text-paper/80">
            <span aria-hidden="true" className="inline-block h-2 w-2 bg-red" />
            {content.technologyTag}
          </p>
        </div>

        <Hairline className="bg-paper/20" />

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-mono text-micro uppercase tracking-[0.08em] text-paper/60">
              {content.office.label ?? "Office"}
            </h3>
            <p className="text-body text-paper">{content.office.company}</p>
            <p className="mt-1 whitespace-pre-line text-body text-paper/80">
              {content.office.address}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-micro uppercase tracking-[0.08em] text-paper/60">
              Contact
            </h3>
            <a
              href={`mailto:${content.contact.email}`}
              className="block text-body text-paper hover:text-red"
            >
              {content.contact.email}
            </a>
            <a
              href={`tel:${content.contact.phone.replace(/\s+/g, "")}`}
              className="mt-1 block font-mono text-body tabular-nums text-paper hover:text-red"
            >
              {content.contact.phone}
            </a>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-micro uppercase tracking-[0.08em] text-paper/60">
              Legal
            </h3>
            <ul className="space-y-2">
              {content.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-body text-paper/80 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <Hairline className="bg-paper/20" />
          <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="font-mono text-micro uppercase tracking-[0.08em] text-paper/50">
              © Swiss Controls {new Date().getFullYear()} · Switzerland
            </p>
            <div className="flex items-center gap-3">
              {content.social.map((s) =>
                s.platform === "linkedin" ? (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-paper/60 hover:text-paper"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 11-.001-4.122 2.06 2.06 0 01.001 4.122zM3.56 20.45h3.55V9H3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  </a>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
