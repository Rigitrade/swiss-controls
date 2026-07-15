/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.swiss-controls.com",
  generateRobotsTxt: true,
  outDir: "out",
  // /pay carries bank details — keep it out of the sitemap and disallow it in
  // robots.txt (reinforced by a noindex meta tag and an X-Robots-Tag header).
  exclude: ["/404", "/_not-found", "/pay", "/pay/"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/", disallow: ["/pay", "/pay/"] }],
  },
}
