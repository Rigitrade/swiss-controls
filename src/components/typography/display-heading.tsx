"use client"

import { motion, useReducedMotion } from "framer-motion"
import { type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type Size = "display-2xl" | "display-xl" | "display-l" | "display-m" | "h1" | "h2"

const sizeClasses: Record<Size, string> = {
  "display-2xl": "text-display-2xl font-black",
  "display-xl": "text-display-xl font-black",
  "display-l": "text-display-l font-black",
  "display-m": "text-display-m font-black",
  h1: "text-h1 font-bold",
  h2: "text-h2 font-bold",
}

type DisplayHeadingProps = {
  as: "h1" | "h2" | "h3"
  size?: Size
  children: ReactNode
  className?: string
  animate?: boolean
  /** "mount" → reveal on initial render (use for hero / above-the-fold).
   *  "scroll" → reveal when entering viewport (default). */
  mode?: "mount" | "scroll"
}

export function DisplayHeading({
  as,
  size = "display-l",
  children,
  className,
  animate = true,
  mode = "scroll",
}: DisplayHeadingProps) {
  const Tag = as as ElementType
  const reduce = useReducedMotion()
  // The line-reveal works with any children (plain text or an element such as a
  // title with red square full-stops); it's gated only on the `animate` flag and
  // the user's reduced-motion preference.
  const shouldAnimate = animate && !reduce

  if (!shouldAnimate) {
    return (
      <Tag
        className={cn(
          "font-sans text-balance",
          sizeClasses[size],
          className,
        )}
      >
        {children}
      </Tag>
    )
  }

  const motionProps =
    mode === "mount"
      ? {
          initial: { y: "100%" },
          animate: { y: "0%" },
        }
      : {
          initial: { y: "100%" },
          whileInView: { y: "0%" },
          viewport: { once: true, margin: "-10%" },
        }

  return (
    <Tag
      className={cn(
        "font-sans text-balance",
        sizeClasses[size],
        className,
      )}
    >
      <span className="block overflow-hidden">
        <motion.span
          className="block"
          {...motionProps}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  )
}
