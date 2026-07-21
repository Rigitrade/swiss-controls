import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { Analytics } from "@vercel/analytics/next"
import { routing, type Locale } from "@/i18n/routing"
import { bodyFont, monoFont } from "@/lib/fonts"
import { cn } from "@/lib/utils/cn"
import { SiteHeader } from "@/components/interactive/site-header"
import { SiteFooterGrid as SiteFooter } from "@/components/interactive/site-footer-grid"
import { WhatsappFloating } from "@/components/interactive/whatsapp-floating"
import { loadSharedContent } from "@/lib/content/load"
import { footerSchema, navSchema } from "@/lib/content/schema"

export const metadata: Metadata = {
  title: { default: "Swiss Controls", template: "%s · Swiss Controls" },
  description:
    "Independent Swiss engineering for industrial automation, electrification, and digital transformation—advancing decarbonization, energy efficiency, and a reliable electrical network through smart power, energy management, and asset performance monitoring. An engineering brand of RIGITRADE AG.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: { type: "website", siteName: "Swiss Controls", locale: "en" },
  robots: { index: true, follow: true },
  authors: [{ name: "RIGITRADE AG" }],
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const messages = await getMessages()
  const nav = await loadSharedContent(locale as Locale, "nav", navSchema)
  const footer = await loadSharedContent(locale as Locale, "footer", footerSchema)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swiss-controls.com"
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Swiss Controls",
    url: baseUrl,
    logo: `${baseUrl}/og-default.png`,
    parentOrganization: { "@type": "Organization", name: "RIGITRADE AG" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Schaffhauserstrasse 550",
      addressLocality: "Zürich",
      addressRegion: "ZH",
      postalCode: "8052",
      addressCountry: "CH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "info@swiss-controls.com",
      telephone: "+41 76 366 66 69",
    },
  }

  return (
    <html
      lang={locale}
      className={cn(bodyFont.variable, monoFont.variable)}
    >
      <body className="bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider locale={locale as Locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          <SiteHeader
            locale={locale as Locale}
            links={nav.links}
            cta={nav.cta}
          />
          <main id="main">{children}</main>
          <SiteFooter locale={locale as Locale} content={footer} />
          <WhatsappFloating number="41763666669" />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
