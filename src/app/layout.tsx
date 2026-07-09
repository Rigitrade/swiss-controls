// Root layout — only renders the redirect page at "/".
// The locale-aware layout is at src/app/[locale]/layout.tsx.

import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Swiss Controls",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
