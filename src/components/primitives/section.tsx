import { type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type Surface = "paper" | "stone" | "ink"
type Density = "tight" | "default" | "loose" | "header" | "footer"

type SectionProps = {
  children: ReactNode
  className?: string
  surface?: Surface
  density?: Density
  id?: string
  ariaLabelledBy?: string
  as?: ElementType
}

const surfaceClasses: Record<Surface, string> = {
  paper: "bg-paper text-ink border-t border-hairline",
  stone: "bg-stone text-ink border-t border-hairline",
  ink: "bg-ink text-paper",
}

const densityClasses: Record<Density, string> = {
  // Top padding trimmed relative to bottom across the board — sections were
  // reading as too much empty space before any content appeared.
  tight: "pt-11 lg:pt-12 pb-section-tight",
  default: "pt-13 lg:pt-18 pb-section-mobile lg:pb-section",
  loose: "pt-17 lg:pt-27 pb-section lg:pb-section-loose",
  // Page-header rhythm: full top padding, minimal bottom — the following
  // section's top padding supplies the gap, avoiding a double-padded void.
  header: "pt-section-mobile pb-6 lg:pt-section lg:pb-8",
  // Footer rhythm: generous top to separate it from the section above, but a
  // trimmed bottom — nothing follows, so a full bottom pad is just dead space.
  footer: "pt-section-mobile pb-12 lg:pt-section-loose lg:pb-16",
}

export function Section({
  children,
  className,
  surface = "paper",
  density = "default",
  id,
  ariaLabelledBy,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(surfaceClasses[surface], densityClasses[density], className)}
    >
      {children}
    </Tag>
  )
}
