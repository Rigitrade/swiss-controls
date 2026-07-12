import { MDXRemote } from "next-mdx-remote/rsc"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { PageHeader } from "@/components/blocks/page-header"
import type { PrivacyPageContent } from "@/lib/content/schema"

type LegalPageProps = {
  locale: string
  frontmatter: PrivacyPageContent
  body: string
  /** Final breadcrumb crumb label for this page. */
  breadcrumbLabel: string
}

/**
 * Shared layout for the site's legal documents (Legal Notice & Privacy Policy,
 * Terms & Conditions, Cookie Policy). Renders the page header plus a prose
 * article that styles the headings, lists and links used across these
 * long-form MDX documents.
 */
export function LegalPage({ locale, frontmatter, body, breadcrumbLabel }: LegalPageProps) {
  return (
    <>
      <PageHeader
        number={frontmatter.pageHeader.number}
        label={frontmatter.pageHeader.label}
        title={frontmatter.pageHeader.title}
        intro={frontmatter.pageHeader.intro}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: breadcrumbLabel }]}
      />
      <Section>
        <Container>
          <article className="max-w-3xl space-y-6 text-body-l text-ink/80 [&_a]:text-red [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-h2 [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-h3 [&_h3]:font-semibold [&_h3]:text-ink [&_li]:my-1 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
            <p className="font-mono text-micro uppercase tracking-[0.08em] text-ink/50">
              Last updated: {frontmatter.lastUpdated}
            </p>
            <MDXRemote source={body} />
          </article>
        </Container>
      </Section>
    </>
  )
}
