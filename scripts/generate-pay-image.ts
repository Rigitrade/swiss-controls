/**
 * Generates the non-copyable bank-details image for the /pay page.
 *
 * The payment details are rendered as a styled HTML card and screenshotted with
 * headless Chromium at 3x DPI, producing a crisp raster where the numbers exist
 * only as pixels (not selectable / scrapeable text).
 *
 * Run with:  npm run gen:pay-image
 *
 * To change the details, edit the DETAILS object below and re-run.
 */
import { chromium } from "@playwright/test"
import { mkdir, readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"

const OUT_PATH = resolve(process.cwd(), "public/pay/bank-details.png")

// Self-hosted Open Sans (from the @fontsource/open-sans package) embedded as
// base64 so rendering is fully offline and deterministic — the image is ALWAYS
// Open Sans, never a network-dependent fallback.
const FONT_DIR = resolve(process.cwd(), "node_modules/@fontsource/open-sans/files")
async function fontFace(weight: number): Promise<string> {
  const b64 = (await readFile(resolve(FONT_DIR, `open-sans-latin-${weight}-normal.woff2`))).toString("base64")
  return `@font-face{font-family:"Open Sans";font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/woff2;base64,${b64}) format("woff2");}`
}

// --- Source of truth for the rendered image ------------------------------------
const DETAILS: Array<{ label: string; value: string; mono?: boolean }> = [
  { label: "Beneficiary / Account Holder", value: "Rigitrade AG" },
  { label: "Beneficiary Address", value: "Tannenstrasse 16, 8424 Embrach, Switzerland" },
  { label: "Bank Name", value: "UBS Switzerland AG" },
  { label: "Bank Address", value: "Postfach, 8001 Zürich, Switzerland" },
  { label: "Currency", value: "CHF (Swiss Francs)" },
  { label: "IBAN", value: "CH65 0020 7207 1135 9501 Q", mono: true },
  { label: "BIC / SWIFT", value: "UBSWCHZH80A", mono: true },
  { label: "Payment Reference", value: "Please include your invoice number" },
]
// -------------------------------------------------------------------------------

// Swiss Controls palette (from globals.css)
const INK = "#141414"
const MUTE = "#6e6e73"
const LINE = "#e4e4e2"
const RED = "#da291c"
const SANS = `"Open Sans", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`

const rows = DETAILS.map(
  (d) => `
    <div class="row">
      <div class="label">${d.label}</div>
      <div class="value ${d.mono ? "mono" : ""}">${d.value}</div>
    </div>`,
).join("")

// Two font sizes only, a ~20% step apart (per design direction):
//   SMALL — eyebrow + field labels;  LARGE — title + values.
const SMALL = "15px"
const LARGE = "18px"

const buildHtml = (fontCss: string) => `<!doctype html>
<html><head><meta charset="utf-8">
  <style>
  ${fontCss}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: transparent; font-family: ${SANS}; }
  .card {
    width: 680px;
    background: #ffffff;
    border: 1px solid ${LINE};
    border-radius: 14px;
    overflow: hidden;
  }
  .seam { height: 4px; background: ${RED}; }
  .body { padding: 40px 44px 44px; }
  .eyebrow {
    font-size: ${SMALL}; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: ${RED}; margin-bottom: 6px;
  }
  .title { font-size: ${LARGE}; font-weight: 700; color: ${INK}; letter-spacing: -0.01em; }
  .rows { margin-top: 30px; }
  .row { padding: 14px 0; border-top: 1px solid ${LINE}; }
  .row:first-child { border-top: 0; padding-top: 0; }
  .label {
    font-size: ${SMALL}; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: ${MUTE}; margin-bottom: 5px;
  }
  .value { font-size: ${LARGE}; font-weight: 600; color: ${INK}; line-height: 1.35; }
  .value.mono { letter-spacing: 0.02em; font-feature-settings: "tnum"; }
</style></head>
<body>
  <div class="card" id="card">
    <div class="seam"></div>
    <div class="body">
      <div class="eyebrow">Rigitrade AG</div>
      <div class="title">Bank Payment Details</div>
      <div class="rows">${rows}</div>
    </div>
  </div>
</body></html>`

async function main() {
  // Embed the self-hosted Open Sans weights straight into the page CSS.
  const fontCss = (await Promise.all([fontFace(400), fontFace(600), fontFace(700)])).join("\n")
  const html = buildHtml(fontCss)

  const browser = await chromium.launch()
  const page = await browser.newPage({ deviceScaleFactor: 3 })
  await page.setContent(html, { waitUntil: "networkidle" })
  // Force the embedded weights to finish decoding, then assert Open Sans is
  // live. With the font baked into the page as base64 this needs no network and
  // must always succeed — the assertion is a guard against ever shipping a
  // fallback font (e.g. if the @fontsource package is missing).
  await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load('400 18px "Open Sans"'),
      document.fonts.load('600 18px "Open Sans"'),
      document.fonts.load('700 18px "Open Sans"'),
    ])
    await document.fonts.ready
  })
  const openSansLive = await page.evaluate(() => document.fonts.check('700 18px "Open Sans"'))
  if (!openSansLive) {
    throw new Error(
      "Open Sans failed to load — aborting so the image is never rendered in a fallback font. " +
        "Ensure @fontsource/open-sans is installed (npm install).",
    )
  }

  // Ground-truth check via Chrome DevTools protocol: ask the renderer which
  // font ACTUALLY painted the glyphs of every text node (not what CSS
  // requested). Abort unless every glyph was painted by Open Sans.
  const cdp = await page.context().newCDPSession(page)
  await cdp.send("DOM.enable")
  await cdp.send("CSS.enable")
  const { root } = await cdp.send("DOM.getDocument")
  const { nodeIds } = await cdp.send("DOM.querySelectorAll", {
    nodeId: root.nodeId,
    selector: ".eyebrow, .title, .label, .value",
  })
  const painted = new Set<string>()
  for (const nodeId of nodeIds) {
    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId })
    for (const f of fonts) painted.add(f.familyName)
  }
  const paintedList = [...painted].sort()
  // Face names include the style (e.g. "Open Sans SemiBold" for the 600 face) —
  // all are faces of the Open Sans family.
  if (paintedList.some((f) => !f.startsWith("Open Sans"))) {
    throw new Error(
      `Renderer painted glyphs with non-Open Sans font(s): ${paintedList.join(", ")} — aborting.`,
    )
  }
  console.log(`Renderer-verified: all glyphs painted with [${paintedList.join(", ")}]`)

  const card = page.locator("#card")
  await mkdir(dirname(OUT_PATH), { recursive: true })
  await card.screenshot({ path: OUT_PATH })
  await browser.close()
  console.log(`Wrote ${OUT_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
