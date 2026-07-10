"use client"

import { useEffect, useRef, useState } from "react"

type CountUpProps = {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      // One-time sync to the final value when motion is reduced. A lazy
      // useState initializer can't be used because matchMedia is unavailable
      // during SSR (static export prerenders this component on the server).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(to)
      return
    }
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setValue(Math.round(eased * to))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
          break
        }
      },
      // Inset only the vertical axis (trigger once ~15% scrolled into view).
      // A bare "-15%" also insets left/right, which pushed the leftmost,
      // left-aligned metric out of the observed area so it never fired.
      { rootMargin: "0px 0px -15% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
