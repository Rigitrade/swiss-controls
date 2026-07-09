import { type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type Gap = "1" | "2" | "3" | "4" | "6"
type Align = "start" | "center" | "end" | "baseline"
type Justify = "start" | "center" | "end" | "between"

const gapClasses: Record<Gap, string> = {
  "1": "gap-2",
  "2": "gap-4",
  "3": "gap-6",
  "4": "gap-8",
  "6": "gap-12",
}

const alignClasses: Record<Align, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
}

const justifyClasses: Record<Justify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
}

type ClusterProps = {
  children: ReactNode
  className?: string
  gap?: Gap
  align?: Align
  justify?: Justify
}

export function Cluster({
  children,
  className,
  gap = "2",
  align = "start",
  justify = "start",
}: ClusterProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap",
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        className,
      )}
    >
      {children}
    </div>
  )
}
