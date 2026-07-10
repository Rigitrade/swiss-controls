import { type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type Surface = "paper" | "stone" | "ink"
type Density = "tight" | "default" | "loose" | "header"

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
  tight: "py-section-tight",
  default: "py-section-mobile lg:py-section",
  loose: "py-section lg:py-section-loose",
  // Page-header rhythm: full top padding, minimal bottom — the following
  // section's top padding supplies the gap, avoiding a double-padded void.
  header: "pt-section-mobile pb-6 lg:pt-section lg:pb-8",
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
