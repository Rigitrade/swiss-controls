import { Montserrat, JetBrains_Mono } from "next/font/google"

// Site typography is provisional — the client will supply the licensed site
// fonts (plus letter-spacing / spacing specs) later. Until then we keep the
// existing neutral defaults so the design-system tokens are wired and a swap
// is a one-line change in globals.css (--font-sans / --font-mono).
//
// The LOGO/wordmark is separate: it uses Helvetica (matching the master logo),
// served via a system stack in globals.css (--font-logo) — no JS font needed.

export const bodyFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  preload: true,
})

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
  preload: false,
})
