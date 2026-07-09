"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type ScrollRevealProps = {
  children: ReactNode
  delay?: number
  animate?: boolean
  className?: string
}

export function ScrollReveal({
  children,
  delay = 0,
  animate = true,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [revealed, setRevealed] = useState(!animate)

  useEffect(() => {
    if (!animate) return
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      // One-time reveal when motion is reduced. A lazy useState initializer
      // can't be used because matchMedia is unavailable during SSR (static
      // export prerenders this component on the server).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRevealed(true)
      return
    }
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => setRevealed(true), delay)
            observer.disconnect()
            break
          }
        }
      },
      { rootMargin: "-10%" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [animate, delay])

  return (
    <div
      ref={ref}
      className={cn(
        animate && "transition-[opacity,transform] duration-700 ease-out",
        animate && !revealed && "translate-y-4 opacity-0",
        animate && revealed && "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </div>
  )
}
