"use client"

import { motion, type Variants } from "framer-motion"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"

type StorySectionProps = { paragraphs: string[] }

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}

// A large outline "ghost" quotation mark — quiet brand texture on the right.
// A story is, literally, words in someone's own voice, so a big hollow quote
// mark reads more true to this section than an arbitrary numeral or icon.
// Purely decorative (aria-hidden), desktop-only, fades in on scroll.
function GhostQuoteMark() {
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
        className="font-sans text-[clamp(9rem,18vw,15rem)] font-bold leading-none text-transparent opacity-[0.16] [-webkit-text-stroke:1.5px_var(--color-ink)]"
      >
        &ldquo;
      </span>
      <span className="absolute bottom-[0.22em] right-[0.08em] h-3 w-3 bg-red" />
    </motion.div>
  )
}

export function StorySection({ paragraphs }: StorySectionProps) {
  return (
    <Section surface="stone" density="default">
      <Container>
        <SectionLabel label="OUR STORY" />
        <div className="mt-4 grid grid-cols-1 gap-8 lg:mt-6 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Stack gap="3" className="lg:col-span-8">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="max-w-[68ch] text-body-l leading-relaxed text-ink/90">
                {paragraph}
              </p>
            ))}
          </Stack>
          <div className="lg:col-span-4">
            <GhostQuoteMark />
          </div>
        </div>
      </Container>
    </Section>
  )
}
