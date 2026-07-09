"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { Cluster } from "@/components/primitives/cluster"
import { LinkButton } from "@/components/ui/link-button"
import { VerticalRail } from "@/components/typography/vertical-rail"
import { cn } from "@/lib/utils/cn"
import type { HomeContent } from "@/lib/content/schema"

type HeroProps = {
  hero: HomeContent["hero"]
  locale: "en" | "de"
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const lineRevealVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
}

export function Hero({ hero, locale }: HeroProps) {
  // Split headline into balanced lines for the mask reveal
  const words = hero.headline.split(" ")
  const mid = Math.ceil(words.length / 2)
  const lineOne = words.slice(0, mid).join(" ")
  const lineTwo = words.slice(mid).join(" ")

  return (
    <section className="relative isolate flex min-h-[100vh] items-end overflow-hidden bg-ink text-paper">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-ink/95 via-ink/65 to-ink/30"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeVariants}
        className="absolute left-6 top-24 sm:left-8 lg:left-16"
      >
        <span className="font-mono text-micro uppercase tracking-[0.2em] text-paper/80">
          <span className="mr-2 inline-block h-1 w-6 align-middle bg-signal" />
          {hero.number} — {hero.label}
        </span>
      </motion.div>

      <Container className="pb-section-mobile pt-32 lg:pb-section-loose">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-12">
            <Stack gap="6">
              <h1 className="text-display-2xl font-medium tracking-tight text-balance">
                <span className="block overflow-hidden">
                  <motion.span variants={lineRevealVariants} className="block text-paper">
                    {lineOne}
                  </motion.span>
                </span>
                {lineTwo && (
                  <span className="block overflow-hidden">
                    <motion.span
                      variants={lineRevealVariants}
                      className={cn("block bg-gradient-to-r from-signal to-paper bg-clip-text text-transparent")}
                    >
                      {lineTwo}
                    </motion.span>
                  </span>
                )}
              </h1>

              <motion.p
                variants={fadeUpVariants}
                className="mt-2 font-mono text-caption uppercase tracking-[0.2em] text-paper/80 sm:text-body"
              >
                <span className="mr-3 inline-block h-px w-10 align-middle bg-signal" />
                {hero.subhead}
              </motion.p>

              <motion.p
                variants={fadeUpVariants}
                className="max-w-[60ch] text-body-l text-paper/85 lg:text-h3"
              >
                {hero.body}
              </motion.p>

              {hero.banner && (
                <motion.div
                  variants={fadeUpVariants}
                  className="max-w-[60ch] border-l-2 border-signal bg-paper/5 px-5 py-4 backdrop-blur-sm"
                >
                  <p className="text-body text-paper">
                    <span aria-hidden="true" className="mr-2 font-mono text-signal">
                      ▸
                    </span>
                    {hero.banner}
                  </p>
                </motion.div>
              )}

              <motion.div variants={fadeUpVariants}>
                <Cluster gap="3">
                  <LinkButton
                    href={`/${locale}${hero.primaryCta.href}`}
                    variant="primary"
                    size="lg"
                  >
                    {hero.primaryCta.label}
                  </LinkButton>
                  <LinkButton
                    href={`/${locale}${hero.secondaryCta.href}`}
                    variant="inverted"
                    size="lg"
                  >
                    {hero.secondaryCta.label}
                  </LinkButton>
                </Cluster>
              </motion.div>
            </Stack>
          </div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:flex flex-col items-center gap-2"
      >
        <Link
          href="#strategic-value"
          className="group flex flex-col items-center gap-3 text-paper/60 hover:text-paper"
          aria-label="Scroll to content"
        >
          <span className="font-mono text-micro uppercase tracking-[0.2em]">
            Scroll
          </span>
          <span className="relative block h-12 w-px bg-paper/30 overflow-hidden">
            <span className="absolute inset-0 block h-1/2 w-full bg-signal animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
          </span>
          <ArrowDown className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
        </Link>
      </motion.div>

      <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 xl:block">
        <VerticalRail className="!text-paper/50">
          API · ASTM · ASME · NACE
        </VerticalRail>
      </div>
    </section>
  )
}
