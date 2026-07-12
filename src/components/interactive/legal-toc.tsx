"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils/cn"

export type TocItem = { level: 2 | 3; text: string; slug: string }

/**
 * Sticky "Contents" index for long legal documents. Mirrors the document's
 * existing section headings as anchor links and highlights the section
 * currently in view. Desktop-only aid — the document reads linearly on mobile.
 */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string>(items[0]?.slug ?? "")

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => el !== null)
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )
        const topmost = visible[0]
        if (topmost) setActiveSlug(topmost.target.id)
      },
      // Trigger when a heading sits just below the sticky offset and treat the
      // lower two-thirds of the viewport as "already read".
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      aria-label="Contents"
      className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto overscroll-contain"
    >
      <p className="mb-4 font-mono text-micro font-medium uppercase tracking-[0.16em] text-ink/50">
        Contents
      </p>
      <ul className="border-l border-line">
        {items.map((item) => {
          const isActive = activeSlug === item.slug
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 text-caption leading-snug transition-colors",
                  item.level === 3 ? "pl-6" : "pl-4 font-medium",
                  isActive
                    ? "border-red text-red"
                    : "border-transparent text-ink/55 hover:border-line hover:text-ink",
                )}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
