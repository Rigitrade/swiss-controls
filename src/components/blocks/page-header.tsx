import Link from "next/link"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { DisplayHeading } from "@/components/typography/display-heading"
import { Hairline } from "@/components/primitives/hairline"

type Crumb = { label: string; href?: string }

// Renders a title with the brand's Swiss square full-stop: each sentence's
// period (and the end of the title) becomes a small red square.
function TitleWithSquareDots({ text }: { text: string }) {
  const phrases = text
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean)
  return (
    <>
      {phrases.map((phrase, i) => {
        // A newline inside a phrase is an explicit, authored line break.
        const lines = phrase.split("\n").map((l) => l.trim())
        return (
          <span key={i}>
            {lines.map((line, j) => (
              <span key={j}>
                {line}
                {j < lines.length - 1 ? <br /> : null}
              </span>
            ))}
            <span
              aria-hidden="true"
              className="ml-[0.06em] inline-block h-[0.14em] w-[0.14em] translate-y-[-0.05em] bg-red align-baseline"
            />
            {i < phrases.length - 1 ? " " : ""}
          </span>
        )
      })}
    </>
  )
}

// Renders the intro. A multi-line intro (authored with line breaks) becomes
// separate lines with a comfortable gap between them, rather than tight,
// single-spaced rows; a single-line intro stays one paragraph.
function IntroText({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length <= 1) {
    return <p className="max-w-[65ch] text-body-l text-ink/80">{text}</p>
  }
  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, i) => (
        <p key={i} className="max-w-[65ch] text-body-l text-ink/80">
          {line}
        </p>
      ))}
    </div>
  )
}

type PageHeaderProps = {
  // `number` is accepted (content still carries it) but not rendered — a bare
  // eyebrow reads better on standalone pages than a meaningless "01".
  number?: string
  // `label`/`intro` are optional: pass an empty string to drop the eyebrow (when
  // it would just echo the title) or the descriptive paragraph.
  label?: string
  title: string
  intro?: string
  breadcrumbs?: Crumb[]
  /** Fixed full-height hero band with vertically-centred content. Used on the
   *  main inner pages so their first section is a consistent height. */
  fill?: boolean
  /** Centre the header content (title + intro). Used on the Contact page. */
  centered?: boolean
  /** Compact left-aligned variant: title (with red square full-stops) over a
   *  hairline, no intro, no tall fill. Used on the inner content pages. */
  minimal?: boolean
}

export function PageHeader({
  label,
  title,
  intro,
  breadcrumbs,
  fill = false,
  centered = false,
  minimal = false,
}: PageHeaderProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swiss-controls.com"

  return (
    <Section
      density={fill ? "default" : "header"}
      className={
        fill
          ? "min-h-[80vh]"
          : centered
            ? "relative isolate flex min-h-[50vh] flex-col justify-start"
            : undefined
      }
    >
      {centered && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgb(20_20_20/1)_1px,transparent_1px),linear-gradient(90deg,rgb(20_20_20/1)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
        />
      )}
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
        <Stack gap="4" className={centered ? "items-center text-center" : undefined}>
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
          {label ? <SectionLabel label={label} /> : null}
          <DisplayHeading
            as="h1"
            size="display-l"
            mode="mount"
            className={
              centered
                ? "max-w-[34ch] text-[length:clamp(1.4rem,1.85vw,1.7rem)]"
                : "max-w-[24ch]"
            }
          >
            {minimal || centered ? <TitleWithSquareDots text={title} /> : title}
          </DisplayHeading>
          {intro && !minimal ? (
            <IntroText text={intro} />
          ) : null}
        </Stack>
        {minimal ? <Hairline className="mt-10 lg:mt-12" /> : null}
      </Container>
    </Section>
  )
}
