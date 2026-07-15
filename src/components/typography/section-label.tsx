import { cn } from "@/lib/utils/cn"

type SectionLabelProps = {
  number?: string
  label: string
  className?: string
  id?: string
}

export function SectionLabel({ number, label, className, id }: SectionLabelProps) {
  return (
    <div
      id={id}
      className={cn(
        "font-mono text-body font-bold uppercase tracking-[0.08em] text-ink/70",
        className,
      )}
    >
      {number ? (
        <>
          <span aria-hidden="true">{number}</span>
          <span className="mx-2" aria-hidden="true">—</span>
        </>
      ) : null}
      <span>{label}</span>
    </div>
  )
}
