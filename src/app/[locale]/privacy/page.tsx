import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { PageHeader } from "@/components/blocks/page-header"
import { loadPageContent } from "@/lib/content/load"
import { privacyPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy and data protection policy for swiss-controls.com.",
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const { frontmatter, body } = await loadPageContent(
    locale as Locale,
    "privacy",
    privacyPageSchema,
  )

  return (
    <>
      <PageHeader
        number={frontmatter.pageHeader.number}
        label={frontmatter.pageHeader.label}
        title={frontmatter.pageHeader.title}
        intro={frontmatter.pageHeader.intro}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Privacy" }]}
      />
      <Section>
        <Container>
          <article className="max-w-3xl space-y-6 text-body-l text-ink/80 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-h2 [&_h2]:font-semibold [&_h2]:text-ink [&_p]:my-4">
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
