import Link from "next/link"
import { cn } from "@/lib/utils/cn"

type Size = "sm" | "md" | "lg" | "xl"

// Explicit sizes (not the heading scale) so the wordmark stays fixed regardless
// of any heading-scale tuning. Values match the original h2 / h1 / display-m.
const sizeClasses: Record<Size, string> = {
  sm: "text-body-l",
  md: "text-[1.5rem]",
  lg: "text-[1.875rem]",
  xl: "text-[clamp(1.875rem,2.6vw,2.375rem)]",
}

// The Swiss Controls wordmark: lowercase Helvetica bold in Swiss red with a
// superscript ©, matching the master logo.
const WORD = "swiss controls"

type WordmarkProps = {
  size?: Size
  className?: string
  href?: string
  /** Override the mark color (defaults to Swiss red). Use for dark surfaces. */
  tone?: "red" | "paper"
}

export function Wordmark({ size = "md", className, href, tone = "red" }: WordmarkProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-start font-logo font-bold lowercase leading-none tracking-[0.03em] mb-[-0.19em]",
        tone === "red" ? "text-red" : "text-paper",
        sizeClasses[size],
        className,
      )}
    >
      {WORD}
      <span
        aria-hidden="true"
        className="-ml-[0.28em] mt-[0.68em] text-[0.4em] font-normal leading-none"
      >
        ©
      </span>
    </span>
  )

  if (href) {
    return (
      <Link href={href} aria-label="Swiss Controls home" className="inline-block">
        {content}
      </Link>
    )
  }

  return content
}
