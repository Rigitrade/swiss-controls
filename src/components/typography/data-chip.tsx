import { type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type Tone = "default" | "accent" | "muted"

const toneClasses: Record<Tone, string> = {
  default: "text-ink border-hairline",
  accent: "text-signal border-signal/30",
  muted: "text-ink/60 border-hairline",
}

type DataChipProps = {
  children: ReactNode
  tone?: Tone
  className?: string
}

export function DataChip({
  children,
  tone = "default",
  className,
}: DataChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-1 font-mono text-micro uppercase tracking-[0.04em]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
