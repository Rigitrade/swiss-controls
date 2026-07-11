import localFont from "next/font/local"
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

// Hero-only trial: Gotham (Senergic-style). Scoped to the Hero component via
// `heroFont.variable` on its own wrapper — NOT applied on <html> — so the
// rest of the site keeps the standard body/mono fonts above. Font files are
// self-hosted for preview; confirm Gotham licensing before shipping this.
export const heroFont = localFont({
  src: [
    { path: "../../public/fonts/Gotham/GothamLight.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Gotham/GothamBook.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Gotham/GothamMedium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Gotham/GothamBold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Gotham/Gotham-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-hero-face",
  display: "swap",
  preload: false,
})
