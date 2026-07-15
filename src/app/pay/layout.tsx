import type { Metadata } from "next"
import { bodyFont, monoFont } from "@/lib/fonts"
import { cn } from "@/lib/utils/cn"

// Standalone, un-localized route (outside the [locale] tree) so the URL is
// exactly /pay — no /en/ prefix. The root layout is a pass-through that returns
// children, so this layout supplies its own <html>/<body>, mirroring the
// locale layout's shell.
//
// noindex/nofollow keeps the bank details out of search results; it is
// reinforced by robots.txt (next-sitemap) and an X-Robots-Tag header (vercel.json).
export const metadata: Metadata = {
  title: "Payment Details · Swiss Controls",
  robots: { index: false, follow: false },
}

export default function PayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(bodyFont.variable, monoFont.variable)}>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  )
}
