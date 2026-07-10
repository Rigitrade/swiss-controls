import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Hairline } from "@/components/primitives/hairline"

type MidPageCtaProps = {
  text: string
  href: string
}

export function MidPageCta({ text, href }: MidPageCtaProps) {
  return (
    <Section density="tight">
      <Container>
        <Hairline />
        <Link
          href={href}
          className="flex items-center justify-between py-8 text-h3 font-semibold text-ink hover:text-red"
        >
          <span>{text}</span>
          <ArrowRight className="h-6 w-6" aria-hidden="true" />
        </Link>
        <Hairline />
      </Container>
    </Section>
  )
}
