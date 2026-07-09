import Link from "next/link"
import { cn } from "@/lib/utils/cn"

type LangSwitcherProps = {
  current: "en" | "de"
  deActive?: boolean
  pathname?: string
  className?: string
}

export function LangSwitcher({
  current,
  deActive = false,
  pathname = "",
  className,
}: LangSwitcherProps) {
  const stripped = pathname.replace(/^\/(en|de)/, "")

  return (
    <div
      className={cn(
        "flex items-center gap-2 font-mono text-micro tracking-[0.08em]",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <Link
        href={`/en${stripped}`}
        aria-current={current === "en" ? "true" : undefined}
        className={cn(
          "uppercase",
          current === "en" ? "text-ink" : "text-ink/40 hover:text-ink",
        )}
      >
        EN
      </Link>
      <span className="text-ink/30" aria-hidden="true">
        |
      </span>
      {deActive ? (
        <Link
          href={`/de${stripped}`}
          aria-current={current === "de" ? "true" : undefined}
          className={cn(
            "uppercase",
            current === "de" ? "text-ink" : "text-ink/40 hover:text-ink",
          )}
        >
          DE
        </Link>
      ) : (
        <span className="uppercase text-ink/30" aria-disabled="true">
          DE
        </span>
      )}
    </div>
  )
}
