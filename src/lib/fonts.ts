import localFont from "next/font/local"
import { JetBrains_Mono } from "next/font/google"

// Senergic-style pairing: Gotham (body + headings) + Helvetica Neue Light (labels).
// Font files are self-hosted for preview; confirm Gotham licensing before production.
export const bodyFont = localFont({
  src: [
    {
      path: "../../public/fonts/Gotham/GothamLight.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gotham/GothamBook.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gotham/GothamMedium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gotham/GothamBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Gotham/Gotham-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  preload: true,
})

export const labelFont = localFont({
  src: "../../public/fonts/Helvetica/HelveticaNeueLt.ttf",
  weight: "300",
  variable: "--font-label-face",
  display: "swap",
  preload: false,
})

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
  preload: false,
})
