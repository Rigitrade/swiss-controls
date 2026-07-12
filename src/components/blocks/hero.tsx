"use client"

import { useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { LinkButton } from "@/components/ui/link-button"
import { cn } from "@/lib/utils/cn"
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

// Renders each sentence of the headline as plain text (no trailing dot).
// Used as the reduced-motion / fallback headline.
function HeadlineWithSquareDots({ text }: { text: string }) {
  const phrases = text
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean)
  return (
    <>
      {phrases.map((phrase, i) => (
        <span key={i} className="inline">
          {phrase}
          {i < phrases.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  )
}

// The animated focal point: one big word at a time, cycling in and out.
// Falls back to a static list when the user prefers reduced motion.
function CyclingWords({ words }: { words: string[] }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce || words.length <= 1) return
    const id = setInterval(
      () => setIndex((n) => (n + 1) % words.length),
      2400,
    )
    return () => clearInterval(id)
  }, [reduce, words.length])

  // The longest word (by length) is the tallest once it wraps, so an invisible
  // copy of it reserves a stable slot — the cycling words are absolutely
  // positioned over that slot and never shift the layout around them.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a))
  const wordClass = "block font-hero font-black"

  if (reduce) {
    return (
      <span className="block tracking-[0.02em]" style={{ fontSize: "0.94em" }}>
        {words.map((word) => (
          <span key={word} className={wordClass}>
            {word}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span className="relative block tracking-[0.02em]" style={{ fontSize: "0.94em" }}>
      {/* Invisible sizer: fixes the height to the longest word at any width. */}
      <span aria-hidden="true" className={cn(wordClass, "invisible")}>
        {longest}
      </span>
      {/* Animated words, layered over the reserved slot. */}
      <span className="absolute inset-0 block overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: "55%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-55%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={wordClass}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

export function Hero({ hero, locale }: HeroProps) {
  const words = hero.rotatingWords

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
          className="max-w-[56rem]"
        >
          <Stack gap="6">
            {/* Big cycling words as the hero's focal point; a real, descriptive
                headline stays available to screen readers and search engines. */}
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.25rem,6vw,5rem)] font-black leading-[1.04] tracking-tight text-ink"
            >
              <span className="sr-only">{hero.headline}</span>
              <span aria-hidden="true" className="block">
                {words && words.length > 0 ? (
                  <CyclingWords words={words} />
                ) : (
                  <HeadlineWithSquareDots text={hero.headline} />
                )}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-[52ch] text-[clamp(1.125rem,1.4vw,1.375rem)] leading-relaxed text-mute"
            >
              {hero.subheadline}
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
