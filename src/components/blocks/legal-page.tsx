import { MDXRemote } from "next-mdx-remote/rsc"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { PageHeader } from "@/components/blocks/page-header"
import { LegalToc, type TocItem } from "@/components/interactive/legal-toc"
import { cn } from "@/lib/utils/cn"
import type { PrivacyPageContent } from "@/lib/content/schema"

// Show the sticky Contents index only for genuinely long documents.
const TOC_MIN_SECTIONS = 6

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function textOf(children: ReactNode): string {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(textOf).join("")
  if (children && typeof children === "object" && "props" in children) {
    return textOf((children as { props: { children?: ReactNode } }).props.children)
  }
  return ""
}

/** Extract the ##/### headings from the raw MDX so we can build the index. */
function buildToc(body: string): TocItem[] {
  const items: TocItem[] = []
  for (const line of body.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!match) continue
    const [, hashes, rawText] = match
    if (!hashes || rawText === undefined) continue
    const level = hashes.length as 2 | 3
    const text = rawText.replace(/\*\*/g, "").trim()
    items.push({ level, text, slug: slugify(text) })
  }
  return items
}

// Headings carry an id (for anchors) and scroll-margin so the sticky header
// doesn't clip them. A top-level section leads with a red square tick over a
// hairline; clause sub-headings stay quiet.
const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      id={slugify(textOf(children))}
      className="mt-16 mb-6 flex scroll-mt-28 items-center gap-3 border-b border-line pb-4 text-[1.375rem] font-semibold leading-tight tracking-[-0.01em] text-ink first:mt-0"
      {...props}
    >
      <span aria-hidden="true" className="inline-block h-3 w-3 shrink-0 bg-red" />
      <span>{children}</span>
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      id={slugify(textOf(children))}
      className="mt-10 mb-3 scroll-mt-28 text-[1.0625rem] font-semibold leading-snug text-ink"
      {...props}
    >
      {children}
    </h3>
  ),
}

const articleClass = cn(
  "text-body-l leading-relaxed text-ink/75",
  "[&>*:first-child]:mt-0",
  "[&_p]:my-4",
  "[&_strong]:font-semibold [&_strong]:text-ink",
  "[&_a]:font-medium [&_a]:text-red [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-red-dark",
  "[&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-ink/40",
  "[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:marker:font-medium [&_ol]:marker:text-ink/50",
  "[&_li]:pl-1",
)

type LegalPageProps = {
  frontmatter: PrivacyPageContent
  body: string
}

/**
 * Shared layout for the site's legal documents (Legal Notice & Privacy Policy,
 * Terms & Conditions, Cookie Policy). Long documents gain a sticky Contents
 * index; short ones render as a single centred column. Typography is tuned for
 * legal prose — sectioned headings, red-marked lists, quiet body text.
 */
export function LegalPage({ frontmatter, body }: LegalPageProps) {
  const toc = buildToc(body)
  const hasToc = toc.length >= TOC_MIN_SECTIONS

  return (
    <>
      <PageHeader
        title={frontmatter.pageHeader.title}
        intro={frontmatter.pageHeader.intro}
      />
      <Section>
        <Container>
          <div
            className={
              hasToc
                ? "lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-x-16 xl:gap-x-24"
                : undefined
            }
          >
            {hasToc && (
              <aside className="hidden lg:block">
                <LegalToc items={toc} />
              </aside>
            )}
            <article className={cn(articleClass, hasToc ? "max-w-[70ch]" : "mx-auto max-w-[68ch]")}>
              <MDXRemote source={body} components={mdxComponents} />
            </article>
          </div>
        </Container>
      </Section>
    </>
  )
}
