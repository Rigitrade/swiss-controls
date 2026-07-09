import { type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type VerticalRailProps = {
  children: ReactNode
  className?: string
}

export function VerticalRail({ children, className }: VerticalRailProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "select-none whitespace-nowrap font-mono text-micro uppercase tracking-[0.16em] text-ink/50",
        "[writing-mode:vertical-rl] rotate-180",
        className,
      )}
    >
      {children}
    </span>
  )
}
