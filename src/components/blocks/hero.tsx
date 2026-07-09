"use client"

import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { LinkButton } from "@/components/ui/link-button"
import type { HomeContent } from "@/lib/content/schema"

type HeroProps = { hero: HomeContent["hero"]; locale: "en" }

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const lineReveal: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero({ hero, locale }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[100vh] items-end overflow-hidden bg-ink text-paper">
      {/* Technical grid backdrop (placeholder abstract treatment) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.steel),theme(colors.ink))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.15] [background-image:linear-gradient(theme(colors.volt)_1px,transparent_1px),linear-gradient(90deg,theme(colors.volt)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="absolute left-6 top-24 sm:left-8 lg:left-16"
      >
        <span className="font-mono text-micro uppercase tracking-[0.2em] text-paper/80">
          <span className="mr-2 inline-block h-1 w-6 align-middle bg-volt" />
          {hero.eyebrow}
        </span>
      </motion.div>

      <Container className="pb-section-mobile pt-32 lg:pb-section-loose">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <Stack gap="6">
            <span className="font-logo text-caption uppercase tracking-[0.35em] text-volt">
              {hero.wordmark}
            </span>
            <h1 className="text-display-2xl font-medium tracking-tight text-balance">
              <span className="block overflow-hidden">
                <motion.span variants={lineReveal} className="block text-paper">
                  {hero.headline}
                </motion.span>
              </span>
            </h1>
            <motion.p variants={fadeUp} className="max-w-[60ch] text-body-l text-paper/85 lg:text-h3">
              {hero.subheadline}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-mono text-caption uppercase tracking-[0.2em] text-paper/80"
            >
              <span className="mr-3 inline-block h-px w-10 align-middle bg-signal" />
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:flex flex-col items-center gap-2"
      >
        <Link href="#at-a-glance" className="group flex flex-col items-center gap-3 text-paper/60 hover:text-paper" aria-label="Scroll to content">
          <span className="font-mono text-micro uppercase tracking-[0.2em]">Scroll</span>
          <span className="relative block h-12 w-px bg-paper/30 overflow-hidden">
            <span className="absolute inset-0 block h-1/2 w-full bg-volt animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
          </span>
          <ArrowDown className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  )
}
