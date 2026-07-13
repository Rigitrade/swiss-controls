"use client"

import { useEffect, useRef } from "react"

type NetworkGraphProps = { className?: string }

type Node = {
  bx: number
  by: number
  x: number
  y: number
  phase: number
  amp: number
  speed: number
  r: number
}

/**
 * Lightweight animated red network graph — brand texture for the Solutions
 * "OUR SOLUTIONS" block, echoing the connected-node motif. Nodes drift gently
 * and nearby ones link with fading edges. Purely decorative (aria-hidden) and
 * desktop-only; renders a single static frame when reduced motion is set.
 */
export function NetworkGraph({ className }: NetworkGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const RED = "218,41,28"
    let width = 0
    let height = 0
    let nodes: Node[] = []

    function build() {
      if (!canvas || !ctx) return
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (width === 0 || height === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cx = width / 2
      const cy = height / 2
      const R = Math.min(width, height) / 2 - 6
      const count = 46
      nodes = Array.from({ length: count }, () => {
        // Distribute within a disc, biased toward the centre for a denser core.
        const radius = R * Math.sqrt(Math.random()) * (0.2 + 0.8 * Math.random())
        const ang = Math.random() * Math.PI * 2
        const bx = cx + Math.cos(ang) * radius
        const by = cy + Math.sin(ang) * radius
        return {
          bx,
          by,
          x: bx,
          y: by,
          phase: Math.random() * Math.PI * 2,
          amp: 2 + Math.random() * 4,
          speed: 0.3 + Math.random() * 0.6,
          r: radius < R * 0.4 ? 2.2 + Math.random() * 1.6 : 1.1 + Math.random() * 1.1,
        }
      })
    }

    function draw(t: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      const threshold = Math.min(width, height) * 0.3

      for (const n of nodes) {
        n.x = n.bx + Math.cos(t * 0.001 * n.speed + n.phase) * n.amp
        n.y = n.by + Math.sin(t * 0.001 * n.speed + n.phase) * n.amp
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (!a) continue
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          if (!b) continue
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < threshold) {
            ctx.strokeStyle = `rgba(${RED},${0.32 * (1 - d / threshold)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = `rgba(${RED},0.9)`
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    build()
    let raf = 0
    if (reduce) {
      draw(0)
    } else {
      const loop = (t: number) => {
        draw(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      build()
      if (reduce) draw(0)
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <div aria-hidden="true" className={className}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
