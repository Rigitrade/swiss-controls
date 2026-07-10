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

export function Hero({ hero, locale }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden bg-ink text-paper">
      {/* Dark charcoal ground sets the hero apart from the light body below. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,theme(colors.steel),theme(colors.ink))]"
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
              <span className="font-sans text-caption uppercase tracking-[0.14em] text-paper/65">
                {hero.eyebrow}
              </span>
            </motion.div>

            <h1 className="text-display-l font-semibold tracking-tight text-balance text-paper">
              <span className="block overflow-hidden">
                <motion.span variants={lineReveal} className="block">
                  {hero.headline}
                </motion.span>
              </span>
            </h1>

            <motion.p variants={fadeUp} className="max-w-[56ch] text-body-l text-paper/80">
              {hero.subheadline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="flex items-center gap-3 font-sans text-caption uppercase tracking-[0.16em] text-paper/70"
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
