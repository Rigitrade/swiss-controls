import { cn } from "@/lib/utils/cn"

type LeaderDotsProps = {
  left: string
  right: string
  className?: string
}

export function LeaderDots({ left, right, className }: LeaderDotsProps) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-3 font-sans text-body",
        className,
      )}
    >
      <span className="shrink-0">{left}</span>
      <span
        aria-hidden="true"
        className="grow translate-y-[-3px] border-b border-dotted border-hairline"
      />
      <span className="shrink-0 font-mono tabular-nums">{right}</span>
    </div>
  )
}
