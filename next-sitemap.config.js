/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://rigitrade.com",
  generateRobotsTxt: true,
  outDir: "out",
  exclude: ["/404", "/_not-found"],
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || "https://rigitrade.com"}/en`,
      hreflang: "en",
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || "https://rigitrade.com"}/de`,
      hreflang: "de",
    },
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
}
