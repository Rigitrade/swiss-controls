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
import { mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"

const OUT_PATH = resolve(process.cwd(), "public/pay/bank-details.png")

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

const html = `<!doctype html>
<html><head><meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
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
  const browser = await chromium.launch()
  const page = await browser.newPage({ deviceScaleFactor: 3 })
  await page.setContent(html, { waitUntil: "networkidle" })
  await page.evaluate(() => document.fonts.ready)
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
