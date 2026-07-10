"use client"

import { motion, type Variants } from "framer-motion"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { LinkButton } from "@/components/ui/link-button"
import { Wordmark } from "@/components/typography/wordmark"
import type { HomeContent } from "@/lib/content/schema"

type HeroProps = { hero: HomeContent["hero"]; locale: "en" }

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

// Renders the headline with Swiss-style square full-stops: each sentence's
// period becomes a small red square. The real text (with periods) is exposed
// to screen readers via an sr-only copy; the styled version is aria-hidden.
function HeadlineWithSquareDots({ text }: { text: string }) {
  const phrases = text
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean)
  return (
    <>
      <span aria-hidden="true">
        {phrases.map((phrase, i) => (
          <span key={i}>
            {phrase}
            <span className="ml-[0.05em] inline-block h-[0.16em] w-[0.16em] translate-y-[-0.04em] bg-red align-baseline" />
            {i < phrases.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </>
  )
}

export function Hero({ hero, locale }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-paper text-ink">
      {/* Technical net — a faint blueprint grid that decorates the light hero
          and sets it apart from the plain body below. Faded toward the edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(20_20_20/1)_1px,transparent_1px),linear-gradient(90deg,rgb(20_20_20/1)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]"
      />
      {/* Soft red wash in the upper-right to give the net a hint of brand color. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_50%_45%_at_100%_0%,rgb(218_41_28/0.06),transparent)]"
      />
      {/* Swiss red signature — a full-height rule down the left edge. */}
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-1.5 bg-red" />

      <Container className="py-section-mobile lg:py-section">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="max-w-[52rem]"
        >
          <Stack gap="6">
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <Wordmark size="md" tone="red" />
              <span className="font-sans text-caption uppercase tracking-[0.14em] text-mute">
                {hero.eyebrow}
              </span>
            </motion.div>

            {/* Headline sized ~15% below display-l, then −25% for Montserrat. */}
            <h1 className="text-[clamp(1.36rem,2.3vw,2.07rem)] font-bold leading-[1.08] tracking-tight text-balance text-ink">
              <span className="block overflow-hidden">
                <motion.span variants={lineReveal} className="block">
                  <HeadlineWithSquareDots text={hero.headline} />
                </motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="max-w-[56ch] text-body-l text-mute">
              {hero.subheadline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="flex items-center gap-3 font-sans text-caption uppercase tracking-[0.16em] text-ink/70"
            >
              <span aria-hidden="true" className="inline-block h-px w-10 bg-red" />
              {hero.positioning}
            </motion.p>

            <motion.div variants={fadeUp}>
              <LinkButton href={`/${locale}${hero.primaryCta.href}`} variant="primary" size="lg">
                {hero.primaryCta.label}
              </LinkButton>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>
    </section>
  )
}
