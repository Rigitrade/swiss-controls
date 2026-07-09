import { cn } from "@/lib/utils/cn"

type RotatingSealProps = {
  text: string
  size?: number
  className?: string
}

export function RotatingSeal({
  text,
  size = 140,
  className,
}: RotatingSealProps) {
  const chars = text.split("")
  const angleStep = 360 / chars.length
  const radius = size / 2 - 12

  return (
    <div
      aria-hidden="true"
      className={cn("relative motion-reduce:[&>div]:animate-none", className)}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 animate-[spin-slow_30s_linear_infinite]"
        style={{ width: size, height: size }}
      >
        {chars.map((ch, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 font-mono text-micro uppercase tracking-[0.16em] text-ink/70"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * angleStep}deg) translateY(-${radius}px)`,
              transformOrigin: "0 0",
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  )
}
