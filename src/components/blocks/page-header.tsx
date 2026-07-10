import Link from "next/link"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { DisplayHeading } from "@/components/typography/display-heading"

type Crumb = { label: string; href?: string }

type PageHeaderProps = {
  // `number` is accepted (content still carries it) but not rendered — a bare
  // eyebrow reads better on standalone pages than a meaningless "01".
  number?: string
  label: string
  title: string
  intro: string
  breadcrumbs?: Crumb[]
  /** Fixed full-height hero band with vertically-centred content. Used on the
   *  main inner pages so their first section is a consistent height. */
  fill?: boolean
}

export function PageHeader({
  label,
  title,
  intro,
  breadcrumbs,
  fill = false,
}: PageHeaderProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swiss-controls.com"

  return (
    <Section
      density={fill ? "default" : "header"}
      className={fill ? "min-h-[80vh]" : undefined}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.label,
                ...(c.href ? { item: `${baseUrl}${c.href}` } : {}),
              })),
            }),
          }}
        />
      )}
      <Container>
        <Stack gap="4">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap gap-2 font-mono text-micro uppercase tracking-[0.08em] text-ink/60">
                {breadcrumbs.map((crumb, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-ink">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                    {i < breadcrumbs.length - 1 && (
                      <span aria-hidden="true">/</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <SectionLabel label={label} />
          <DisplayHeading as="h1" size="display-l" className="max-w-[20ch]">
            {title}
          </DisplayHeading>
          <p className="max-w-[65ch] whitespace-pre-line text-body-l text-ink/80">{intro}</p>
        </Stack>
      </Container>
    </Section>
  )
}
