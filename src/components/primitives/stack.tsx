import { type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type Gap = "1" | "2" | "3" | "4" | "6" | "8"

const gapClasses: Record<Gap, string> = {
  "1": "gap-2",
  "2": "gap-4",
  "3": "gap-6",
  "4": "gap-8",
  "6": "gap-12",
  "8": "gap-16",
}

type StackProps = {
  children: ReactNode
  className?: string
  gap?: Gap
}

export function Stack({ children, className, gap = "2" }: StackProps) {
  return (
    <div className={cn("flex flex-col", gapClasses[gap], className)}>
      {children}
    </div>
  )
}
