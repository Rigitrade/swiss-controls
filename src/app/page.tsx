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
        <a href="/en/">Continue to Swiss Controls</a>
      </body>
    </html>
  )
}
