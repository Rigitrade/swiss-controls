"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils/cn"

type Size = "sm" | "md" | "lg" | "xl"

const sizeClasses: Record<Size, string> = {
  sm: "text-caption",
  md: "text-body-l",
  lg: "text-h2",
  xl: "text-display-m",
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
}

const letterVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const WORD = "RIGITRADE"

type WordmarkProps = {
  size?: Size
  className?: string
  href?: string
}

export function Wordmark({ size = "md", className, href }: WordmarkProps) {
  const content = (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "group inline-flex items-baseline leading-none",
        sizeClasses[size],
        className,
      )}
    >
      <span className="flex font-logo font-black uppercase tracking-[0.01em] opacity-50 transition-opacity duration-300 group-hover:opacity-90">
        {WORD.split("").map((letter, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span variants={letterVariants} className="inline-block">
              {letter}
            </motion.span>
          </span>
        ))}
      </span>
      <motion.span
        aria-hidden="true"
        variants={dotVariants}
        className="ml-0.5 inline-block font-logo font-black text-signal transition-transform duration-500 group-hover:scale-125"
      >
        .
      </motion.span>
    </motion.span>
  )

  if (href) {
    return (
      <Link href={href} aria-label="Rigitrade home" className="inline-block">
        {content}
      </Link>
    )
  }

  return content
}
