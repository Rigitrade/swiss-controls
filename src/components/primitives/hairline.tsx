import { cn } from "@/lib/utils/cn"

type HairlineProps = {
  orientation?: "horizontal" | "vertical"
  className?: string
}

export function Hairline({ orientation = "horizontal", className }: HairlineProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px self-stretch",
        "bg-hairline",
        className,
      )}
    />
  )
}
