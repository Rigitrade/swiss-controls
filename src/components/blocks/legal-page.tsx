import { MDXRemote } from "next-mdx-remote/rsc"
import type { ComponentPropsWithoutRef } from "react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { DisplayHeading } from "@/components/typography/display-heading"
import { cn } from "@/lib/utils/cn"
import type { PrivacyPageContent } from "@/lib/content/schema"

// A top-level section is a bold heading over a hairline rule; clause
// sub-headings stay quiet.
const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-16 mb-6 border-b border-line pb-4 text-[1.35rem] font-semibold leading-tight tracking-[-0.01em] text-ink first:mt-0"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 mb-3 text-[1.125rem] font-semibold leading-snug text-ink"
      {...props}
    >
      {children}
    </h3>
  ),
}

const articleClass = cn(
  "mx-auto max-w-[68ch] text-[1.0125rem] leading-relaxed text-ink/75",
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
 * Terms & Conditions, Cookie Policy): a centred title over a single centred
 * column of prose tuned for legal reading — sectioned headings, quiet body.
 */
export function LegalPage({ frontmatter, body }: LegalPageProps) {
  return (
    <Section>
      <Container>
        <DisplayHeading
          as="h1"
          size="display-xl"
          mode="mount"
          className="mx-auto max-w-4xl text-center"
        >
          {frontmatter.pageHeader.title}
        </DisplayHeading>
        <article className={cn(articleClass, "mt-12 lg:mt-16")}>
          <MDXRemote source={body} components={mdxComponents} />
        </article>
      </Container>
    </Section>
  )
}
