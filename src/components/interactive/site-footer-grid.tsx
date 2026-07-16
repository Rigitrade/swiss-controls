import Link from "next/link"
import type { ReactNode } from "react"
import { Mail } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Hairline } from "@/components/primitives/hairline"
import { Wordmark } from "@/components/typography/wordmark"
import type { FooterContent } from "@/lib/content/schema"

type SiteFooterGridProps = {
  locale: "en" | "de"
  content: FooterContent
}

const WHATSAPP_NUMBER = "41763666669"

function ColLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 font-mono text-[0.95rem] font-bold uppercase tracking-[0.12em] text-red">
      {children}
    </h3>
  )
}

/** Faded vertical divider that sits centred in the grid gap to a column's left. */
function ColDivider() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -left-6 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-paper/15 to-transparent md:block"
    />
  )
}

/**
 * Footer — the client's content set (identity, HQ, contact, locations, trade
 * registry, legal) laid out as an editorial column footer in the site's dark
 * theme. Contact channels are email + WhatsApp (no LinkedIn).
 */
export function SiteFooterGrid({ locale, content }: SiteFooterGridProps) {
  return (
    <Section as="footer" surface="ink" density="footer" className="relative isolate pt-12! text-paper lg:pt-16!">
      {/* Bright top seam — the site's footer signature */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-red" />
      <Container>
        <div className="mb-12 flex items-center justify-end gap-4 border-b border-paper/10 pb-8">
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

        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:items-start md:gap-x-8">
          {/* Identity — wordmark nudged up so it sits on the label line */}
          <div className="md:col-span-4 md:-mt-[1.5rem]">
            <Wordmark size="xl" />
            {content.parentLine && (
              <p className=" max-w-[24ch] text-body-l font-medium leading-loose text-paper/90">
                {content.parentLine}
              </p>
            )}
          </div>

          {/* Headquarter */}
          <div className="relative md:col-span-3">
            <ColDivider />
            <ColLabel>{content.office.label ?? "Headquarter"}</ColLabel>
            {content.office.mapUrl ? (
              <a
                href={content.office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the Swiss office location in Google Maps"
                className="block w-fit cursor-pointer space-y-2 text-body text-paper/80 transition-colors hover:text-red"
              >
                {content.office.address.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </a>
            ) : (
              <div className="space-y-2 text-body text-paper/80">
                {content.office.address.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="relative md:col-span-3">
            <ColDivider />
            <ColLabel>Contact</ColLabel>
            <div className="space-y-2">
              <a
                href={`https://wa.me/${content.contact.phone.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message us on WhatsApp at ${content.contact.phone}`}
                className="block font-mono text-body tabular-nums text-paper transition-colors hover:text-red"
              >
                {content.contact.phone}
              </a>
              <a
                href={`mailto:${content.contact.email}`}
                className="block text-body text-paper/80 transition-colors hover:text-red"
              >
                {content.contact.email}
              </a>
              {content.contact.website && (
                <a
                  href={`https://${content.contact.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-body text-paper/80 transition-colors hover:text-red"
                >
                  {content.contact.website}
                </a>
              )}
            </div>
          </div>

          {/* Locations */}
          <div className="relative md:col-span-2">
            <ColDivider />
            <ColLabel>Locations</ColLabel>
            <ul className="space-y-1.5 text-body text-paper/80">
              {(content.locations ?? []).map((loc) => (
                <li key={loc.name} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-red" />
                  {loc.mapUrl ? (
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${loc.name} office location in Google Maps`}
                      className="transition-colors hover:text-red"
                    >
                      {loc.name}
                    </a>
                  ) : (
                    loc.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Hairline className="mt-14 bg-paper/15" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            {/* Swiss flag → payment details (/pay). Standalone route outside the
                locale tree; plain next/link Link (no locale prefix added). */}
            <Link
              href="/pay/"
              aria-label="Payment details"
              className="relative -top-px inline-flex shrink-0 opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect width="24" height="24" rx="4" fill="#da291c" />
                <path
                  fill="#ffffff"
                  d="M10.4 5.6h3.2v4.8h4.8v3.2h-4.8v4.8h-3.2v-4.8H5.6v-3.2h4.8z"
                />
              </svg>
            </Link>
            {content.registry && (
              <p className="font-mono text-micro uppercase tracking-[0.08em] text-paper/50">
                {content.registry.label} ·{" "}
                {content.registry.url ? (
                  <a
                    href={content.registry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-red"
                  >
                    {content.registry.value}
                  </a>
                ) : (
                  content.registry.value
                )}
              </p>
            )}
          </div>

          <div className="flex items-center gap-6">
            <nav
              aria-label="Legal"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-micro uppercase tracking-[0.08em]"
            >
              {content.legal.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="text-paper/60 transition-colors hover:text-red"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <span aria-hidden="true" className="hidden h-4 w-px bg-paper/20 lg:block" />

            <div className="flex items-center gap-4">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${content.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email Swiss Controls"
                className="text-paper/60 transition-colors hover:text-red"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Swiss Controls on WhatsApp"
                className="text-paper/60 transition-colors hover:text-red"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
