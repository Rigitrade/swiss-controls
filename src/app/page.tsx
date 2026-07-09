import type { Metadata } from "next"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/en/" },
}

export default function RootRedirectPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <link rel="canonical" href="/en/" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace('/en/')`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `html,body{margin:0;background:#fafaf7;color:#fafaf7}a{color:inherit;text-decoration:none}`,
          }}
        />
      </head>
      <body>
        {/* This is a standalone redirect shell that renders its own <html>
            document (outside the app-router tree), not an in-app navigation,
            so next/link is inappropriate here. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/en/">Continue to Swiss Controls</a>
      </body>
    </html>
  )
}
