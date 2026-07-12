"use client"

import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils/cn"

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}

type GhostMarkProps = { glyph?: string; mono?: boolean; size?: string }

// A large outline "ghost" glyph — quiet brand texture on the right of a
// section intro. Hollow stroke, low opacity, small red square accent.
// Purely decorative (aria-hidden), desktop-only, fades in on scroll.
// `mono` switches to the site's numbering typeface — use for numerals so
// they echo SectionLabel / step-numbering elsewhere, rather than the
// display sans used for quote-mark-style glyphs.
export function GhostMark({
  glyph = "“",
  mono = false,
  size = "clamp(9rem,18vw,15rem)",
}: GhostMarkProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={fadeIn}
      aria-hidden="true"
      className="pointer-events-none relative hidden h-full items-center justify-end lg:flex"
    >
      <span
        style={{ fontSize: size }}
        className={cn(
          mono ? "font-mono font-medium" : "font-sans font-bold",
          "leading-none text-transparent opacity-[0.16] [-webkit-text-stroke:1.5px_var(--color-ink)]",
        )}
      >
        {glyph}
      </span>
      <span className="absolute bottom-[0.22em] right-[0.08em] h-3 w-3 bg-red" />
    </motion.div>
  )
}
