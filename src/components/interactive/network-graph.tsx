"use client"

import { useEffect, useRef } from "react"

type NetworkGraphProps = { className?: string }

type Node = {
  // Anchor in the path's own viewBox coordinates.
  ax: number
  ay: number
  x: number
  y: number
  phase: number
  amp: number
  r: number // eased dot radius (for hover bubble)
}

// senergic.ch's "geometric.svg" — an ornamental circular lattice. Their hero
// samples particles equidistant along this exact path; we do the same. The
// viewBox is 25.988 square, so the shape centres on 12.994.
const VIEWBOX = 25.988
const PATH_D =
  "M22.186,3.802c-5.068-5.069-13.315-5.068-18.384,0c-5.069,5.068-5.069,13.316,0,18.384c5.069,5.069,13.316,5.068,18.384,0C27.255,17.119,27.256,8.87,22.186,3.802z M12.107,2.764c0.099-0.406,0.179-0.839,0.242-1.323l0.057-0.428l0.433-0.005c2.877-0.037,5.671,0.958,7.865,2.801l0.418,0.352l-3.008,3.007l-0.353-0.323c-1.68-1.536-3.532-2.747-5.358-3.5l-0.396-0.164L12.107,2.764z M10.402,7.604c1.119,0.91,2.284,1.951,3.464,3.093l0.364,0.354l-3.179,3.178l-0.354-0.363c-1.143-1.18-2.184-2.345-3.093-3.464L7.286,10.01L7.68,9.696c0.861-0.687,1.329-1.155,2.016-2.015l0.314-0.394L10.402,7.604z M10.292,6.874L10.524,6.5c0.47-0.75,0.857-1.538,1.152-2.342l0.183-0.493l0.482,0.206c1.727,0.735,3.467,1.874,5.033,3.294l0.39,0.352l-3.181,3.18l-0.354-0.339c-0.842-0.809-2.148-2.021-3.598-3.205L10.292,6.874z M10.357,14.23l0.339,0.354l-3.18,3.18l-0.352-0.391c-1.401-1.552-2.529-3.297-3.264-5.046l-0.202-0.48l0.489-0.182c0.796-0.296,1.574-0.679,2.312-1.14l0.374-0.234l0.278,0.342C8.329,12.074,9.544,13.384,10.357,14.23z M11.405,15.291l0.353,0.339c0.847,0.813,2.157,2.029,3.598,3.205l0.343,0.278l-0.233,0.374c-0.461,0.737-0.845,1.516-1.141,2.312l-0.183,0.488l-0.479-0.202c-1.749-0.734-3.495-1.862-5.046-3.263L8.225,18.47L11.405,15.291z M15.587,18.383c-1.119-0.91-2.284-1.951-3.464-3.093l-0.365-0.354l3.179-3.178l0.354,0.364c1.143,1.18,2.184,2.345,3.093,3.464l0.318,0.392l-0.395,0.314c-0.86,0.687-1.329,1.155-2.016,2.015l-0.314,0.395L15.587,18.383z M15.631,11.757l-0.339-0.353l3.18-3.18l0.353,0.389c1.421,1.565,2.56,3.306,3.294,5.032l0.206,0.483l-0.493,0.182c-0.804,0.295-1.592,0.684-2.342,1.152l-0.374,0.234l-0.278-0.343C17.652,13.906,16.439,12.598,15.631,11.757z M9.418,1.548c0.568-0.177,1.182-0.313,1.821-0.407l0.677-0.099l-0.111,0.674c-0.042,0.262-0.089,0.524-0.147,0.783L11.54,3.017l-0.509-0.15C10.481,2.706,9.966,2.59,9.495,2.521l-2.174-0.32L9.418,1.548z M6.188,3.218c1.314-0.433,2.936-0.389,4.688,0.127l0.514,0.15l-0.186,0.502c-0.276,0.749-0.614,1.456-1.005,2.1L9.913,6.571L9.471,6.237c-1.297-0.979-2.417-1.682-3.33-2.088L4.955,3.623L6.188,3.218z M4.522,4.495L4.792,4.26l0.302,0.013C5.953,4.48,7.451,5.354,9.205,6.669l0.411,0.31L9.294,7.383C8.972,7.787,8.687,8.11,8.398,8.397c-0.287,0.288-0.61,0.573-1.015,0.896L6.981,9.615l-0.31-0.412C5.356,7.45,4.482,5.952,4.275,5.093L4.211,4.826L4.522,4.495z M3.226,6.216L3.62,4.952l0.541,1.209c0.408,0.912,1.106,2.025,2.077,3.31l0.335,0.442L6.098,10.2c-0.63,0.382-1.324,0.715-2.062,0.99L3.53,11.378l-0.15-0.518C2.876,9.119,2.823,7.514,3.226,6.216z M1.141,11.239c0.094-0.641,0.231-1.254,0.408-1.821L2.2,7.32l0.32,2.174c0.069,0.471,0.186,0.988,0.346,1.535l0.15,0.509l-0.518,0.119c-0.259,0.059-0.521,0.106-0.784,0.148l-0.673,0.108L1.141,11.239z M3.809,20.704c-1.844-2.194-2.839-4.987-2.802-7.866l0.005-0.432l0.429-0.058c0.489-0.065,0.923-0.145,1.323-0.242l0.415-0.101l0.164,0.396c0.755,1.825,1.965,3.68,3.501,5.358l0.323,0.353l-3.008,3.007L3.809,20.704z M13.881,23.224c-0.097,0.4-0.177,0.833-0.242,1.323l-0.058,0.428l-0.433,0.005c-2.877,0.037-5.67-0.958-7.864-2.801l-0.418-0.352l3.008-3.007l0.352,0.322c1.68,1.536,3.533,2.746,5.36,3.501l0.396,0.164L13.881,23.224z M16.571,24.439c-0.567,0.178-1.182,0.313-1.821,0.408l-0.675,0.1l0.108-0.673c0.042-0.265,0.089-0.525,0.148-0.785l0.119-0.517l0.509,0.149c0.547,0.16,1.062,0.277,1.535,0.346l2.174,0.32L16.571,24.439z M19.772,22.761c-1.298,0.404-2.902,0.351-4.646-0.153l-0.519-0.15l0.188-0.505c0.275-0.737,0.609-1.432,0.991-2.062l0.286-0.475l0.441,0.334c1.284,0.971,2.397,1.67,3.311,2.078l1.209,0.541L19.772,22.761z M21.479,21.478l-0.281,0.248l-0.303-0.013c-0.858-0.208-2.356-1.081-4.11-2.396l-0.411-0.311l0.321-0.402c0.646-0.809,1.103-1.265,1.91-1.911l0.402-0.321l0.311,0.412c1.314,1.753,2.188,3.251,2.396,4.109l0.064,0.268L21.479,21.478z M22.77,19.8l-0.405,1.232l-0.526-1.186c-0.405-0.914-1.108-2.034-2.087-3.331l-0.335-0.441l0.475-0.287c0.646-0.391,1.353-0.729,2.102-1.004l0.502-0.186l0.149,0.514C23.16,16.866,23.204,18.487,22.77,19.8z M24.847,14.749c-0.093,0.64-0.229,1.253-0.407,1.821l-0.65,2.098l-0.32-2.174c-0.069-0.47-0.186-0.987-0.347-1.535l-0.149-0.509l0.519-0.119c0.259-0.06,0.521-0.105,0.781-0.148l0.676-0.109L24.847,14.749z M24.548,13.637c-0.484,0.064-0.917,0.145-1.323,0.242l-0.416,0.101l-0.163-0.396c-0.755-1.827-1.966-3.68-3.501-5.359l-0.322-0.352l3.008-3.007l0.351,0.417c1.845,2.194,2.838,4.987,2.802,7.865l-0.006,0.432L24.548,13.637z"

/**
 * Animated red network — brand texture for the Solutions block, ported from
 * senergic.ch's hero. Particles are sampled equidistant along senergic's own
 * ornamental lattice path (see PATH_D); each shimmers gently around its anchor
 * and links to spatially-near neighbours with fading red edges, tracing the
 * lattice into a woven medallion. Purely decorative (aria-hidden) and
 * desktop-only; renders one static frame when reduced motion is set. Hovering
 * magnifies the dots under the cursor.
 */
export function NetworkGraph({ className }: NetworkGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const path = pathRef.current
    if (!canvas || !path) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const RED = "218,41,28"
    const LINK = 0.34 // link reach as a fraction of the radius
    const SPEED = 0.52
    const FILL = 0.1 // fraction of points spread inside the disc to close gaps

    let width = 0
    let height = 0
    let cx = 0
    let cy = 0
    let scale = 1
    let nodes: Node[] = []
    let edges: Array<{ a: Node; b: Node; alpha: number }> = []

    const pointer = { x: 0, y: 0, active: false }

    // Anchor in viewBox space → screen pixels.
    const px = (ax: number) => cx + (ax - VIEWBOX / 2) * scale
    const py = (ay: number) => cy + (ay - VIEWBOX / 2) * scale

    function build() {
      if (!canvas || !ctx || !path) return
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (width === 0 || height === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cx = width / 2
      cy = height / 2
      const R = Math.min(width, height) / 2
      scale = (2 * R) / VIEWBOX

      const total = path.getTotalLength()
      // ~125 particles at the on-page size; scale with area for other sizes.
      const n = Math.round(Math.min(200, Math.max(80, (width * height) / 431)))
      const fillN = Math.round(n * FILL)
      const pathN = n - fillN
      const C = VIEWBOX / 2
      const Rvb = VIEWBOX / 2 - 0.3
      const golden = Math.PI * (3 - Math.sqrt(5))
      nodes = []
      const pushNode = (ax: number, ay: number) => {
        const k = nodes.length
        nodes.push({
          ax,
          ay,
          x: 0,
          y: 0,
          phase: (k * 2.399963) % (Math.PI * 2),
          amp: 0.12 + ((k * 0.618) % 1) * 0.2, // viewBox units
          r: 1,
        })
      }
      // On-path points trace senergic's lattice.
      for (let i = 0; i < pathN; i++) {
        const pt = path.getPointAtLength((total * i) / Math.max(1, pathN))
        pushNode(pt.x, pt.y)
      }
      // Interior points (sunflower spread) fill the empty gaps between strokes.
      for (let k = 0; k < fillN; k++) {
        const r = Rvb * Math.sqrt((k + 0.5) / fillN)
        const th = k * golden
        pushNode(C + r * Math.cos(th), C + r * Math.sin(th))
      }

      // Link spatially-near neighbours (following the lattice), edges fixed so
      // the mesh stays stable rather than flickering.
      const linkDist = R * LINK
      const ld2 = linkDist * linkDist
      const e: Array<{ a: Node; b: Node; alpha: number }> = []
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        if (!a) continue
        const axs = px(a.ax)
        const ays = py(a.ay)
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          if (!b) continue
          const dx = axs - px(b.ax)
          const dy = ays - py(b.ay)
          const d2 = dx * dx + dy * dy
          if (d2 < ld2) {
            e.push({ a, b, alpha: 0.8 * (1 - Math.sqrt(d2) / linkDist) })
          }
        }
      }
      edges = e
    }

    function draw(t: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        const jx = reduce ? 0 : Math.cos(t * 0.001 * SPEED + n.phase) * n.amp
        const jy = reduce ? 0 : Math.sin(t * 0.0013 * SPEED + n.phase) * n.amp
        n.x = px(n.ax + jx)
        n.y = py(n.ay + jy)
      }

      ctx.lineWidth = 1.05
      for (const { a, b, alpha } of edges) {
        ctx.strokeStyle = `rgba(${RED},${alpha})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      const bubbleDist = Math.min(width, height) * 0.28
      for (const n of nodes) {
        let target = 1
        if (pointer.active) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y)
          if (d < bubbleDist) target += (1 - d / bubbleDist) * 2.8
        }
        n.r += (target - n.r) * 0.15
        ctx.fillStyle = `rgba(${RED},0.9)`
        ctx.beginPath()
        ctx.arc(n.x, n.y, Math.max(0.1, n.r), 0, Math.PI * 2)
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
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
    }
    window.addEventListener("resize", onResize)
    if (!reduce) {
      canvas.addEventListener("pointermove", onPointerMove)
      canvas.addEventListener("pointerleave", onPointerLeave)
    }
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      canvas.removeEventListener("pointermove", onPointerMove)
      canvas.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <div aria-hidden="true" className={className}>
      {/* Hidden source path — sampled for particle anchors, never painted. */}
      <svg width="0" height="0" viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} className="absolute h-0 w-0">
        <path ref={pathRef} d={PATH_D} />
      </svg>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
