# Swiss Controls Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the swiss-controls.com marketing website by copying and re-skinning the proven `rigitrade_fe` Next.js project into a distinct "electric-signal" Swiss Controls brand.

**Architecture:** Static-export Next.js 16 / React 19 / Tailwind v4 site. Content lives in MDX frontmatter (validated by zod schemas) + `next-intl` `[locale]` routing with only `en` active. Presentational blocks are driven by typed content props. The 6 top-level services are rendered from a single dynamic `[slug]` route backed by per-service MDX files.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, next-intl, framer-motion, gray-matter + zod, react-hook-form + @hookform/resolvers, Formspree (client-side POST), lucide-react, Vitest + @testing-library/react, Playwright (+ axe).

## Global Constraints

- **Source project:** `D:\Personal\Rigitrade\rigitrade_fe` (copy from here). **Destination:** `D:\Personal\swiss-controls-website` (git repo already initialized; contains `docs/`, `.gitignore`, and source PDFs at root — do NOT delete these).
- **Static export only:** `next.config.ts` has `output: "export"`. No server routes, no `next/image` optimization (`images.unoptimized: true`), `trailingSlash: true`. Forms POST client-side to Formspree.
- **Next.js version warning:** This Next.js has breaking changes vs. training data. Read `node_modules/next/dist/docs/` before writing framework code (per `AGENTS.md`).
- **Locales:** `["en"]`, default `en`, `localePrefix: "always"` (URLs are `/en/...`). German deferred — keep structure i18n-ready.
- **Brand tokens (exact hex):** ink `#0b0f14`, paper `#f6f8fb`, steel `#1e293b`, stone `#e2e8f0`, signal `#1D4ED8`, signal-bright `#2563EB`, volt `#22D3EE`. The signal accent replaces every Rigitrade `forge` usage.
- **Contact facts (verbatim):** Swiss Controls, Schaffhauserstrasse 550, 8052 Zürich, Switzerland · +41 76 366 66 69 · info@swiss-controls.com · www.swiss-controls.com. Brand line: "A Brand by RIGITRADE AG".
- **Positioning line:** "Independent Engineering. Intelligent Integration. Reliable Performance."
- **Quality gates (must pass before "done"):** `npm run type-check` (tsc --noEmit), `npm run lint` (eslint max-warnings 0), `npm test` (vitest), `npm run build` (static export succeeds), `npm run test:e2e` (Playwright smoke).
- **Commit after every task** with a `feat:`/`chore:`/`test:` prefixed message.
- **No placeholders in code** — every service/industry/technology list uses the exact copy from the spec (`docs/superpowers/specs/2026-07-09-swiss-controls-website-design.md`).

---

## File Structure

```
swiss-controls-website/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                         # root <html> shell (adapt metadata)
│  │  ├─ page.tsx                           # "/" → redirect to /en
│  │  ├─ not-found.tsx
│  │  └─ [locale]/
│  │     ├─ layout.tsx                      # header/footer/JSON-LD (adapt)
│  │     ├─ page.tsx                        # Home
│  │     ├─ services/page.tsx               # Services overview
│  │     ├─ services/[slug]/page.tsx        # 6 service detail pages
│  │     ├─ about/page.tsx
│  │     ├─ industries/page.tsx
│  │     ├─ contact/page.tsx
│  │     ├─ privacy/page.tsx
│  │     └─ imprint/page.tsx
│  ├─ components/
│  │  ├─ primitives/                        # reuse as-is
│  │  ├─ typography/                        # reuse as-is
│  │  ├─ ui/                                # reuse as-is
│  │  ├─ interactive/                       # adapt header/footer/contact-form
│  │  └─ blocks/
│  │     ├─ hero.tsx                        # adapt
│  │     ├─ at-a-glance.tsx                 # NEW (metrics ribbon)
│  │     ├─ services-grid.tsx              # NEW (from core-capabilities)
│  │     ├─ process-timeline.tsx            # NEW
│  │     ├─ technology-wall.tsx             # NEW
│  │     ├─ industries-grid.tsx             # NEW (from industry-tiles)
│  │     ├─ why-choose.tsx                  # NEW
│  │     ├─ service-detail-catalog.tsx      # NEW
│  │     ├─ page-header.tsx                 # reuse as-is
│  │     ├─ final-cta.tsx                   # adapt
│  │     └─ mid-page-cta.tsx                # reuse as-is
│  ├─ lib/
│  │  ├─ content/schema.ts                  # REPLACE schemas
│  │  ├─ content/load.ts                    # adapt PageSlug + service loader
│  │  ├─ content/services.ts                # NEW (slug list + metadata)
│  │  ├─ fonts.ts                           # reuse (Inter/JetBrains/Jost)
│  │  └─ forms/                             # reuse contact-schema + client
│  ├─ i18n/routing.ts                       # locales → ["en"]
│  └─ i18n/request.ts                       # reuse
├─ content/en/
│  ├─ home.mdx  about.mdx  industries.mdx  contact.mdx  privacy.mdx  imprint.mdx
│  ├─ services/index.mdx
│  ├─ services/industrial-automation.mdx  (+ 5 more)
│  └─ shared/nav.mdx  footer.mdx
├─ messages/en.json
├─ public/                                  # placeholder assets
├─ tests/                                   # Playwright
└─ (config files copied from rigitrade_fe)
```

---

## Phase 0 — Scaffold & Theme

### Task 0.1: Copy and boot the project

**Files:**
- Create: entire `src/`, `content/`, `messages/`, `public/`, `tests/`, `scripts/`, and root config files by copying from source.

**Interfaces:**
- Produces: a buildable Next.js project rooted at `D:\Personal\swiss-controls-website`.

- [ ] **Step 1: Copy source files** (Bash tool, Git Bash)

```bash
cd /d/Personal/swiss-controls-website
SRC=/d/Personal/Rigitrade/rigitrade_fe
for item in src content messages public scripts tests \
  package.json package-lock.json next.config.ts next-sitemap.config.js \
  postcss.config.mjs eslint.config.mjs tsconfig.json playwright.config.ts \
  next-env.d.ts .env.example README.md AGENTS.md CLAUDE.md; do
  cp -r "$SRC/$item" ./ 2>/dev/null && echo "copied $item"
done
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: completes without errors; `node_modules/` present.

- [ ] **Step 3: Verify the copied project builds before any edits** (baseline)

Run: `npm run type-check`
Expected: PASS (no type errors) — confirms a clean copy.

- [ ] **Step 4: Update `package.json` name**

Change `"name": "rigitrade_fe"` → `"name": "swiss-controls-website"`.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "chore: scaffold from rigitrade_fe baseline"
```

---

### Task 0.2: Re-theme design tokens (electric-signal)

**Files:**
- Modify: `src/app/globals.css`
- Modify (mechanical rename): all files under `src/` referencing `forge`

**Interfaces:**
- Produces: Tailwind utilities `bg-signal`, `text-signal`, `border-signal`, `bg-volt`, `text-volt`, plus cool neutrals. No `forge` token remains.

- [ ] **Step 1: Rename `forge` → `signal` across the source tree**

Run (Bash):
```bash
cd /d/Personal/swiss-controls-website
grep -rl 'forge' src | while read f; do sed -i 's/forge/signal/g' "$f"; done
grep -rn 'forge' src || echo "no forge references remain"
```
Expected: "no forge references remain".

- [ ] **Step 2: Replace the color tokens block in `src/app/globals.css`**

Replace lines 8–19 (the `@theme` color + type-family opening) color tokens with:

```css
@theme {
  /* Color tokens — Swiss Controls "electric-signal" */
  --color-ink: #0b0f14;
  --color-paper: #f6f8fb;
  --color-stone: #e2e8f0;
  --color-steel: #1e293b;
  --color-signal: #1d4ed8;
  --color-signal-bright: #2563eb;
  --color-volt: #22d3ee;
```

(Keep the existing `--font-*`, type-scale, spacing, and motion tokens below unchanged.)

- [ ] **Step 3: Update base focus ring + selection to signal**

In `globals.css` `@layer base`, the `::selection` `background-color` and `*:focus-visible` `outline` already reference `--color-signal` after the rename in Step 1 (they were `--color-forge`). Verify they read `var(--color-signal)`. If any hardcoded orange hex (`#c2410c`) remains anywhere, replace with `#1d4ed8`.

Run: `grep -rn 'c2410c\|forge' src` → Expected: no matches.

- [ ] **Step 4: Add a hover token for buttons**

Open `src/components/ui/button.tsx` and `link-button.tsx`. Wherever the primary variant uses `hover:bg-signal/90` or similar, leave as-is (opacity hover works). If a distinct hover is desired, change primary hover to `hover:bg-signal-bright`. Confirm no build break.

- [ ] **Step 5: Verify theme compiles**

Run: `npm run build 2>&1 | tail -5`
Expected: build proceeds past CSS compilation (may fail later on content — that's fine at this stage; the CSS/Tailwind step must not error).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: apply electric-signal theme tokens"
```

---

### Task 0.3: Single-locale routing, sitemap, and metadata

**Files:**
- Modify: `src/i18n/routing.ts:5-8`
- Modify: `next-sitemap.config.js`
- Modify: `src/app/[locale]/layout.tsx:15-68`
- Modify: `.env.example`

**Interfaces:**
- Produces: `routing.locales === ["en"]`; org JSON-LD + metadata reflect Swiss Controls.

- [ ] **Step 1: Set locales to English-only**

In `src/i18n/routing.ts`, change:
```ts
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "always",
})
```

- [ ] **Step 2: Update `next-sitemap.config.js`**

Set `siteUrl` default to `https://www.swiss-controls.com`; remove the `de` entry from `alternateRefs` (keep only `en`).

- [ ] **Step 3: Update root metadata + Organization JSON-LD in `src/app/[locale]/layout.tsx`**

Replace the `metadata` object title/description and the `orgJsonLd` object:
```ts
export const metadata: Metadata = {
  title: { default: "Swiss Controls", template: "%s · Swiss Controls" },
  description:
    "Independent Swiss engineering for industrial automation, electrical engineering, industrial electrification, and system integration. A brand by RIGITRADE AG.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: { type: "website", siteName: "Swiss Controls", locale: "en" },
  robots: { index: true, follow: true },
  authors: [{ name: "RIGITRADE AG" }],
}
```
```ts
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
```
Also set `baseUrl` default (line ~48) to `https://www.swiss-controls.com`.

- [ ] **Step 4: Update `WhatsappFloating` number**

In `layout.tsx`, the `<WhatsappFloating number="41763666669" />` already matches the Swiss Controls phone — leave as-is.

- [ ] **Step 5: Update `.env.example`**

```
NEXT_PUBLIC_SITE_URL=https://www.swiss-controls.com
NEXT_PUBLIC_FORMSPREE_CONTACT_ID=
```
(Remove the quote-form ID line — we use a single contact form.)

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: english-only routing and Swiss Controls metadata"
```

---

## Phase 1 — Content Model

### Task 1.1: Replace zod schemas

**Files:**
- Modify: `src/lib/content/schema.ts` (replace Rigitrade page schemas; keep `imageSchema`, `ctaSchema`, `navSchema`, `footerSchema` shapes, adjusting footer).
- Test: `src/lib/content/schema.test.ts` (Create)

**Interfaces:**
- Produces: `homeSchema`, `servicesIndexSchema`, `serviceDetailSchema`, `aboutPageSchema`, `industriesPageSchema`, `contactPageSchema`, `privacyPageSchema`, `navSchema`, `footerSchema`; and types `HomeContent`, `ServiceDetailContent`, etc.
- Consumes: `zod`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/content/schema.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import {
  homeSchema,
  serviceDetailSchema,
  servicesIndexSchema,
} from "./schema"

describe("homeSchema", () => {
  it("requires hero, metrics, services, process, technologies, industries, whyChoose, finalCta", () => {
    const result = homeSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})

describe("serviceDetailSchema", () => {
  it("accepts a service with a numbered catalog", () => {
    const ok = serviceDetailSchema.safeParse({
      pageHeader: { number: "01", label: "SERVICE", title: "T", intro: "i" },
      summary: "s",
      catalog: ["PLC Programming", "SCADA / HMI Development"],
    })
    expect(ok.success).toBe(true)
  })
  it("rejects an empty catalog", () => {
    const bad = serviceDetailSchema.safeParse({
      pageHeader: { number: "01", label: "S", title: "T", intro: "i" },
      summary: "s",
      catalog: [],
    })
    expect(bad.success).toBe(false)
  })
})

describe("servicesIndexSchema", () => {
  it("accepts a page header + intro", () => {
    const ok = servicesIndexSchema.safeParse({
      pageHeader: { number: "01", label: "SERVICES", title: "T", intro: "i" },
    })
    expect(ok.success).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/content/schema.test.ts`
Expected: FAIL (schemas not yet defined / wrong shape).

- [ ] **Step 3: Rewrite `src/lib/content/schema.ts`**

Keep `imageSchema`, `ctaSchema` at top. Replace all page schemas with:
```ts
import { z } from "zod"

export const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1, "Alt text is required for accessibility"),
})
export const ctaSchema = z.object({ label: z.string().min(1), href: z.string().min(1) })

const pageHeaderSchema = z.object({
  number: z.string(),
  label: z.string(),
  title: z.string(),
  intro: z.string(),
})

const heroSchema = z.object({
  eyebrow: z.string(),          // "A Brand by RIGITRADE AG"
  headline: z.string(),         // "Engineering the Future of Industry"
  wordmark: z.string(),         // "SWISS CONTROLS"
  body: z.string(),
  positioning: z.string(),      // the three-part line
  primaryCta: ctaSchema,
})

const metricSchema = z.object({
  value: z.string(),            // "20+", "5", "100%", "International"
  suffix: z.string().optional(),
  label: z.string(),
})

const serviceCardSchema = z.object({
  slug: z.string(),
  icon: z.string(),             // lucide icon name
  title: z.string(),
  summary: z.string(),
})

const processStepSchema = z.object({
  step: z.string(),             // "Discover"
  detail: z.string(),
})

const whyItemSchema = z.object({ title: z.string(), detail: z.string() })

const finalCtaSchema = z.object({
  headline: z.string(),
  body: z.string().optional(),
  primaryCta: ctaSchema,
})

export const homeSchema = z.object({
  hero: heroSchema,
  intro: z.object({ heading: z.string(), body: z.string() }),
  metrics: z.object({
    number: z.string(),
    label: z.string(),
    items: z.array(metricSchema).length(4),
  }),
  services: z.object({
    number: z.string(),
    label: z.string(),
    items: z.array(serviceCardSchema).min(1),
  }),
  process: z.object({
    number: z.string(),
    label: z.string(),
    steps: z.array(processStepSchema).min(1),
  }),
  technologies: z.object({
    number: z.string(),
    label: z.string(),
    note: z.string(),
    vendors: z.array(z.string()).min(1),
  }),
  industries: z.object({
    number: z.string(),
    label: z.string(),
    intro: z.string(),
    items: z.array(z.string()).min(1),
  }),
  whyChoose: z.object({
    number: z.string(),
    label: z.string(),
    items: z.array(whyItemSchema).min(1),
  }),
  finalCta: finalCtaSchema,
})

export const servicesIndexSchema = z.object({
  pageHeader: pageHeaderSchema,
})

export const serviceDetailSchema = z.object({
  pageHeader: pageHeaderSchema,
  summary: z.string(),
  catalog: z.array(z.string()).min(1),
})

export const aboutPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  sections: z
    .array(z.object({ number: z.string(), title: z.string(), body: z.string() }))
    .min(1),
  values: z.array(z.object({ title: z.string(), detail: z.string() })).min(1),
})

export const industriesPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  industries: z.array(z.string()).min(1),
  clientTypesLabel: z.string(),
  clientTypes: z.array(z.string()).min(1),
})

export const contactPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  office: z.object({
    address: z.string(),
    phone: z.string(),
    email: z.string().email(),
  }),
})

export const privacyPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  lastUpdated: z.string(),
})

export const navSchema = z.object({
  links: z.array(z.object({ label: z.string(), href: z.string() })),
  cta: ctaSchema,
})

export const footerSchema = z.object({
  tagline: z.string(),
  technologyTag: z.string(),
  office: z.object({
    label: z.string().optional(),
    company: z.string(),
    address: z.string(),
  }),
  contact: z.object({ email: z.string().email(), phone: z.string() }),
  legal: z.array(z.object({ label: z.string(), href: z.string() })),
  social: z.array(
    z.object({
      platform: z.enum(["linkedin", "twitter", "facebook", "instagram"]),
      href: z.string().url(),
    }),
  ),
})

export type ImageContent = z.infer<typeof imageSchema>
export type CtaContent = z.infer<typeof ctaSchema>
export type HomeContent = z.infer<typeof homeSchema>
export type ServicesIndexContent = z.infer<typeof servicesIndexSchema>
export type ServiceDetailContent = z.infer<typeof serviceDetailSchema>
export type AboutPageContent = z.infer<typeof aboutPageSchema>
export type IndustriesPageContent = z.infer<typeof industriesPageSchema>
export type ContactPageContent = z.infer<typeof contactPageSchema>
export type PrivacyPageContent = z.infer<typeof privacyPageSchema>
export type NavContent = z.infer<typeof navSchema>
export type FooterContent = z.infer<typeof footerSchema>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/content/schema.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Swiss Controls content schemas"
```

---

### Task 1.2: Service registry + loader update

**Files:**
- Create: `src/lib/content/services.ts`
- Modify: `src/lib/content/load.ts:9-16` (PageSlug) and `loadSharedContent` name union.
- Test: `src/lib/content/services.test.ts` (Create)

**Interfaces:**
- Produces: `SERVICES` (ordered array of `{ slug, title, icon, summary }`), `SERVICE_SLUGS: string[]`, `getService(slug)`.
- Consumes: nothing external.

- [ ] **Step 1: Write the failing test**

Create `src/lib/content/services.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { SERVICES, SERVICE_SLUGS, getService } from "./services"

describe("service registry", () => {
  it("has the six services in nav order", () => {
    expect(SERVICE_SLUGS).toEqual([
      "industrial-automation",
      "electrical-engineering",
      "system-integration",
      "engineering-consulting",
      "commissioning-lifecycle",
      "procurement-sourcing",
    ])
  })
  it("getService returns a known service", () => {
    expect(getService("system-integration")?.title).toBe("System Integration")
  })
  it("getService returns undefined for unknown slug", () => {
    expect(getService("nope")).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/content/services.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Create `src/lib/content/services.ts`**

```ts
export type ServiceMeta = {
  slug: string
  title: string
  icon: string // lucide-react icon name
  summary: string
}

export const SERVICES: ServiceMeta[] = [
  {
    slug: "industrial-automation",
    title: "Industrial Automation",
    icon: "Cpu",
    summary:
      "Intelligent automation that improves productivity, reliability, process safety, and digital transformation.",
  },
  {
    slug: "electrical-engineering",
    title: "Electrical Engineering & Industrial Electrification",
    icon: "Zap",
    summary:
      "Robust LV/MV electrical systems, power distribution, motor control, and power system studies.",
  },
  {
    slug: "system-integration",
    title: "System Integration",
    icon: "Network",
    summary:
      "Automation, electrical, instrumentation, and communication technologies unified into high-performance solutions.",
  },
  {
    slug: "engineering-consulting",
    title: "Engineering & Technical Consulting",
    icon: "DraftingCompass",
    summary:
      "Independent engineering from concept and FEED through detailed design and operational handover.",
  },
  {
    slug: "commissioning-lifecycle",
    title: "Commissioning & Lifecycle Services",
    icon: "RefreshCw",
    summary:
      "Commissioning, modernization, migration, and long-term support that maximize asset availability.",
  },
  {
    slug: "procurement-sourcing",
    title: "Procurement & Strategic Sourcing",
    icon: "Factory",
    summary:
      "Vendor-independent sourcing from a network of qualified European and international OEM manufacturers.",
  },
]

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug)

export function getService(slug: string): ServiceMeta | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
```

- [ ] **Step 4: Update `src/lib/content/load.ts`**

Replace the `PageSlug` union (lines 9–16) with:
```ts
export type PageSlug =
  | "home"
  | "services/index"
  | "about"
  | "industries"
  | "contact"
  | "privacy"
  | "imprint"
```
Change `loadSharedContent`'s `name` parameter type from `"nav" | "footer" | "trust-strip"` to `"nav" | "footer"`. (The loader already builds the path from `slug`, so `loadPageContent(locale, "services/${slug}", serviceDetailSchema)` works for service detail files.)

- [ ] **Step 5: Run tests**

Run: `npx vitest run src/lib/content/services.test.ts && npm run type-check`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: service registry and loader slugs"
```

---

### Task 1.3: Author all content files

**Files:**
- Create: `content/en/home.mdx`, `content/en/about.mdx`, `content/en/industries.mdx`, `content/en/contact.mdx`, `content/en/privacy.mdx`, `content/en/imprint.mdx`
- Create: `content/en/services/index.mdx` + 6 service files
- Create: `content/en/shared/nav.mdx`, `content/en/shared/footer.mdx`
- Delete: all old Rigitrade content (`materials.mdx`, `solutions.mdx`, `commodities.mdx`, `shared/trust-strip.mdx`, and the entire `content/de/` tree)
- Test: `src/lib/content/content.test.ts` (Create) — loads every content file through its schema.

**Interfaces:**
- Consumes: schemas from Task 1.1, `SERVICE_SLUGS` from Task 1.2.
- Produces: validated content on disk.

- [ ] **Step 1: Delete stale content**

```bash
cd /d/Personal/swiss-controls-website
rm -rf content/de
rm -f content/en/materials.mdx content/en/solutions.mdx content/en/commodities.mdx content/en/shared/trust-strip.mdx
```

- [ ] **Step 2: Write the failing test**

Create `src/lib/content/content.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { loadPageContent, loadSharedContent } from "./load"
import {
  homeSchema, aboutPageSchema, industriesPageSchema, contactPageSchema,
  privacyPageSchema, servicesIndexSchema, serviceDetailSchema,
  navSchema, footerSchema,
} from "./schema"
import { SERVICE_SLUGS } from "./services"

describe("content loads and validates", () => {
  it("home", async () => { await loadPageContent("en", "home", homeSchema) })
  it("about", async () => { await loadPageContent("en", "about", aboutPageSchema) })
  it("industries", async () => { await loadPageContent("en", "industries", industriesPageSchema) })
  it("contact", async () => { await loadPageContent("en", "contact", contactPageSchema) })
  it("privacy", async () => { await loadPageContent("en", "privacy", privacyPageSchema) })
  it("imprint", async () => { await loadPageContent("en", "imprint", privacyPageSchema) })
  it("services index", async () => { await loadPageContent("en", "services/index", servicesIndexSchema) })
  it("nav + footer", async () => {
    await loadSharedContent("en", "nav", navSchema)
    await loadSharedContent("en", "footer", footerSchema)
  })
  it("all six service detail files", async () => {
    for (const slug of SERVICE_SLUGS) {
      const { frontmatter } = await loadPageContent("en", `services/${slug}`, serviceDetailSchema)
      expect(frontmatter.catalog.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 3: Run to verify it fails**

Run: `npx vitest run src/lib/content/content.test.ts`
Expected: FAIL ("Content file not found").

- [ ] **Step 4: Author `content/en/home.mdx`**

```mdx
---
hero:
  wordmark: "SWISS CONTROLS"
  eyebrow: "A Brand by RIGITRADE AG"
  headline: "Engineering the Future of Industry"
  body: "Swiss Controls is a Swiss engineering and technology company delivering industrial automation, electrical engineering, industrial electrification, system integration, digital industrial solutions, and technical consulting for industrial, utility, infrastructure, and energy projects."
  positioning: "Independent Engineering. Intelligent Integration. Reliable Performance."
  primaryCta:
    label: "Discuss Your Project"
    href: "/contact"
intro:
  heading: "We Help Industry Perform Better"
  body: "We combine more than two decades of international engineering experience with Swiss quality standards to deliver independent, practical, and future-ready solutions for modern industry. Whether developing a new industrial facility, modernizing an existing plant, or integrating advanced automation technologies, Swiss Controls transforms complex technical challenges into reliable operational solutions."
metrics:
  number: "01"
  label: "AT A GLANCE"
  items:
    - value: "20"
      suffix: "+"
      label: "Years of Engineering Experience"
    - value: "5"
      label: "Core Engineering Disciplines"
    - value: "100"
      suffix: "%"
      label: "Independent Engineering"
    - value: "International"
      label: "Projects Across CH, EU, GCC, Middle East & Africa"
services:
  number: "02"
  label: "SERVICES"
  items:
    - slug: "industrial-automation"
      icon: "Cpu"
      title: "Industrial Automation"
      summary: "PLC & DCS engineering, SCADA/HMI, process and factory automation, motion control, and industrial communication networks."
    - slug: "electrical-engineering"
      icon: "Zap"
      title: "Electrical Engineering & Electrification"
      summary: "LV/MV systems, power distribution, motor control centres, protection, and power system studies."
    - slug: "system-integration"
      icon: "Network"
      title: "System Integration"
      summary: "Control panels, MCC/PCC, RTU, FAT/SAT, commissioning, and system optimization."
    - slug: "engineering-consulting"
      icon: "DraftingCompass"
      title: "Engineering & Technical Consulting"
      summary: "FEED, functional design specifications, control philosophies, owner's engineering, and technical audits."
    - slug: "commissioning-lifecycle"
      icon: "RefreshCw"
      title: "Commissioning & Lifecycle"
      summary: "Commissioning, modernization, migration, preventive maintenance, and long-term engineering support."
    - slug: "procurement-sourcing"
      icon: "Factory"
      title: "Procurement & Strategic Sourcing"
      summary: "Vendor-independent sourcing of switchgear, LV systems, transformers, MCCs, automation, and instrumentation."
process:
  number: "03"
  label: "OUR ENGINEERING PROCESS"
  steps:
    - step: "Discover"
      detail: "Understanding operational objectives, technical requirements, and business expectations."
    - step: "Engineer"
      detail: "Developing reliable, standards-compliant solutions optimized for safety, maintainability, and lifecycle cost."
    - step: "Integrate"
      detail: "Connecting automation, electrical, instrumentation, communication, and digital technologies into one coordinated environment."
    - step: "Deliver"
      detail: "Supporting manufacturing, Factory Acceptance Testing, commissioning, startup, and operational handover."
    - step: "Support"
      detail: "Providing lifecycle engineering, modernization, maintenance, troubleshooting, and continuous technical support."
technologies:
  number: "04"
  label: "TECHNOLOGY EXPERTISE"
  note: "Our technology-independent approach enables us to recommend the most appropriate platform for every application while protecting our clients' long-term operational interests."
  vendors:
    - "ABB"
    - "Siemens"
    - "Schneider Electric"
    - "Rockwell Automation"
    - "Beckhoff"
    - "Phoenix Contact"
    - "WAGO"
    - "Mitsubishi Electric"
    - "Omron"
    - "Cisco"
    - "Pepperl+Fuchs"
industries:
  number: "05"
  label: "INDUSTRIES"
  intro: "Swiss Controls supports projects across a broad range of industries."
  items:
    - "Manufacturing"
    - "Utilities"
    - "Power Generation"
    - "Renewable Energy"
    - "Water & Wastewater"
    - "Oil & Gas"
    - "Chemical & Petrochemical"
    - "Mining & Metals"
    - "Pharmaceutical"
    - "Food & Beverage"
    - "Infrastructure"
    - "Transportation"
    - "Data Centres"
whyChoose:
  number: "06"
  label: "WHY SWISS CONTROLS"
  items:
    - title: "Independent Engineering"
      detail: "Technology-neutral engineering based entirely on our clients' operational requirements."
    - title: "Swiss Quality"
      detail: "Precision, reliability, and engineering excellence define every project we undertake."
    - title: "Complete Project Lifecycle"
      detail: "From feasibility studies through commissioning and long-term operational support."
    - title: "Multidisciplinary Expertise"
      detail: "Automation, electrification, integration, consulting, and project management through one partner."
    - title: "International Perspective"
      detail: "Supporting projects throughout Switzerland, Europe, the GCC, the Middle East, and Africa."
    - title: "Long-Term Partnership"
      detail: "Lasting relationships built on engineering excellence, responsiveness, and continuous support."
finalCta:
  headline: "Let's Build the Future Together"
  body: "Whether you are planning a new industrial facility, modernizing an existing plant, or seeking an experienced engineering partner, Swiss Controls is ready to support your project."
  primaryCta:
    label: "Discuss Your Project"
    href: "/contact"
---
```

- [ ] **Step 5: Author the six service detail files under `content/en/services/`**

Each file has the same frontmatter shape; the data is below. Create one file per slug. Example — `content/en/services/industrial-automation.mdx`:
```mdx
---
pageHeader:
  number: "01"
  label: "SERVICE"
  title: "Industrial Automation"
  intro: "We engineer intelligent automation systems that improve productivity, operational reliability, process safety, and digital transformation. Every architecture is designed to remain scalable, secure, maintainable, and ready for future expansion."
summary: "PLC and DCS engineering, SCADA systems, HMI development, process automation, motion control, industrial communication networks, Industrial IoT, and manufacturing digitalization."
catalog:
  - "PLC Programming (Siemens, ABB, Schneider)"
  - "SCADA / HMI Development"
  - "DCS Engineering & Configuration"
  - "Process Automation"
  - "Factory Automation"
  - "Motion Control & Servo Systems"
  - "Industrial Robotics Integration"
  - "Industrial Communication Networks (PROFINET, PROFIBUS)"
  - "EtherNet/IP, Modbus RTU/TCP, OPC UA, MQTT"
  - "Virtual Commissioning & PLC Simulation"
  - "Industrial OT Network Architecture"
---
```
Data for the remaining five files (use `number` 02–06, `label: "SERVICE"`):

**`electrical-engineering.mdx`** — title "Electrical Engineering & Industrial Electrification"; intro: "Reliable industrial operations begin with robust electrical engineering. Every solution is developed to international standards, emphasizing reliability, maintainability, efficiency, and lifecycle performance."; summary: "Low- and medium-voltage systems, industrial power distribution, motor control centres, protection systems, power system studies, and energy optimization."; catalog:
`LV Distribution Systems` · `MV Interface Engineering` · `MCC & PCC Design` · `Motor Control Systems` · `VFD & Soft Starter Engineering (ABB, Siemens, Schneider)` · `Power Quality Analysis` · `Protection Coordination Studies` · `Load Flow Studies` · `Short Circuit Analysis` · `Arc Flash Studies` · `Electrical Design & Calculations`

**`system-integration.mdx`** — title "System Integration"; intro: "Modern facilities depend on seamless interaction between automation, electrical systems, instrumentation, and communication infrastructure. We integrate these into unified, high-performance solutions that improve plant availability, simplify maintenance, and reduce operational risk."; summary: "Control panels, motor and power control centres, RTU systems, FAT/SAT, commissioning, and system optimization."; catalog:
`PLC Control Panels` · `MCC Panels` · `PCC Panels` · `RTU Panels` · `Remote I/O Panels` · `Drive Panels` · `Operator Consoles` · `FAT / SAT` · `CE / IEC Compliance Documentation` · `Panel Retrofit & Upgrades` · `Site Installation Supervision` · `System Integration`

**`engineering-consulting.mdx`** — title "Engineering & Technical Consulting"; intro: "We support projects from concept development through detailed engineering and operational handover. Independent engineering ensures every recommendation is based on technical excellence, operational performance, and lifecycle value."; summary: "FEED, detailed engineering, instrumentation, functional design specifications, control philosophies, tender documentation, and owner's engineering."; catalog:
`Front-End Engineering Design (FEED)` · `Basic & Detailed Engineering` · `Electrical Engineering Design` · `Instrumentation Engineering` · `Functional Design Specifications (FDS)` · `Control Philosophy Development` · `Technical Specifications` · `Tender Documentation` · `Vendor Evaluation` · `Owner's Engineer Services` · `Design Reviews & Engineering Audits`

**`commissioning-lifecycle.mdx`** — title "Commissioning & Lifecycle Services"; intro: "Engineering excellence continues long after installation. We provide commissioning, startup assistance, modernization, migration, maintenance, and long-term support designed to maximize asset availability while protecting our clients' investments."; summary: "Site commissioning, startup, brownfield modernization, legacy migration, obsolescence management, maintenance agreements, and remote support."; catalog:
`Site Commissioning` · `Startup Assistance` · `FAT / SAT Support` · `Brownfield Modernization` · `Legacy PLC / DCS Migration (Siemens, ABB, Schneider)` · `Plant Expansion Projects` · `Obsolescence Management` · `Preventive Maintenance` · `Annual Maintenance Agreements (SLA)` · `Emergency Support` · `Spare Parts Management` · `Remote Technical Support`

**`procurement-sourcing.mdx`** — title "Procurement & Strategic Sourcing"; intro: "Engineering excellence requires qualified manufacturing partners. Through our international network of carefully selected European and international OEM manufacturers, we support sourcing and procurement. Every manufacturer is evaluated on engineering capability, quality systems, international certifications, export experience, and lifecycle support."; summary: "Vendor-independent sourcing of switchgear, LV systems, transformers, motor control centres, automation equipment, and instrumentation."; catalog:
`Medium Voltage Switchgear` · `Low Voltage Systems` · `Power Transformers` · `Motor Control Centres` · `Automation Equipment` · `Instrumentation` · `Industrial Control Systems`

- [ ] **Step 6: Author `content/en/services/index.mdx`**

```mdx
---
pageHeader:
  number: "00"
  label: "SERVICES"
  title: "Engineering Across the Full Industrial Lifecycle"
  intro: "From concept development and detailed engineering to commissioning and lifecycle support, Swiss Controls delivers six integrated engineering services for industrial, utility, infrastructure, and energy projects."
---
```

- [ ] **Step 7: Author `content/en/about.mdx`**

```mdx
---
pageHeader:
  number: "01"
  label: "ABOUT US"
  title: "Engineering Beyond Integration"
  intro: "Today's industrial facilities require more than quality equipment. They require engineering expertise capable of integrating electrical infrastructure, automation, instrumentation, industrial communication networks, and digital technologies into one reliable, efficient, and future-ready operating environment."
sections:
  - number: "01"
    title: "An Independent Swiss Engineering Brand"
    body: "Swiss Controls was created to bring together decades of engineering expertise under one independent Swiss engineering brand dedicated to industrial automation, electrification, and system integration. As a brand of RIGITRADE AG, we operate as an independent engineering partner supporting industrial clients, EPC contractors, utilities, and infrastructure developers throughout every phase of the project lifecycle."
  - number: "02"
    title: "Vendor-Independent by Design"
    body: "Unlike equipment manufacturers, Swiss Controls provides vendor-independent engineering and technology selection, allowing clients to implement the most appropriate technical solution without being limited to a single vendor ecosystem. Our philosophy is built on Swiss values: precision, quality, reliability, transparency, and long-term value."
  - number: "03"
    title: "Why Clients Trust Us"
    body: "Our engineering team brings more than 20 years of international experience in industrial electrification, automation, process control, and system integration — delivering projects with technologies from ABB, Siemens, Schneider Electric, Rockwell Automation, Beckhoff, Phoenix Contact, WAGO, Mitsubishi Electric, Omron, Cisco, and Pepperl+Fuchs across manufacturing, utilities, renewable energy, water, oil & gas, pharmaceuticals, infrastructure, and heavy industry."
values:
  - title: "Engineering Integrity"
    detail: "Every recommendation is based on technical excellence, operational performance, and long-term value."
  - title: "Quality"
    detail: "Swiss engineering principles guide every phase of every project."
  - title: "Partnership"
    detail: "Long-term relationships built on trust, transparency, responsiveness, and technical competence."
  - title: "Innovation"
    detail: "Applying modern technologies through practical, reliable, and sustainable engineering."
---
```

- [ ] **Step 8: Author `content/en/industries.mdx`**

```mdx
---
pageHeader:
  number: "01"
  label: "INDUSTRIES"
  title: "Industries We Serve"
  intro: "Swiss Controls supports projects across a broad range of industries, applying technically sound, commercially practical, and future-ready engineering to each sector's operational realities."
industries:
  - "Manufacturing"
  - "Utilities"
  - "Power Generation"
  - "Renewable Energy"
  - "Water & Wastewater"
  - "Oil & Gas"
  - "Chemical & Petrochemical"
  - "Mining & Metals"
  - "Pharmaceutical"
  - "Food & Beverage"
  - "Infrastructure"
  - "Transportation"
  - "Data Centres"
clientTypesLabel: "WHO WE WORK WITH"
clientTypes:
  - "Industrial Manufacturers"
  - "Utilities"
  - "EPC Contractors"
  - "Infrastructure Developers"
  - "Renewable Energy Developers"
  - "Water Authorities"
  - "OEMs"
  - "Machine Builders"
  - "Industrial Integrators"
---
```

- [ ] **Step 9: Author `content/en/contact.mdx`**

```mdx
---
pageHeader:
  number: "01"
  label: "CONTACT"
  title: "Discuss Your Project"
  intro: "Whether you are planning a new industrial facility, modernizing an existing plant, or seeking an experienced engineering partner for automation, electrification, and system integration, our engineering team is ready to help."
office:
  address: |-
    Swiss Controls
    Schaffhauserstrasse 550
    8052 Zürich
    Switzerland
  phone: "+41 76 366 66 69"
  email: "info@swiss-controls.com"
---
```

- [ ] **Step 10: Author `content/en/privacy.mdx` and `content/en/imprint.mdx`**

`privacy.mdx`:
```mdx
---
pageHeader:
  number: "01"
  label: "PRIVACY POLICY"
  title: "Privacy Policy"
  intro: "This policy explains how Swiss Controls, a brand of RIGITRADE AG, processes personal data submitted through this website."
lastUpdated: "2026-07-09"
---

Swiss Controls processes submissions from the contact form solely to respond to your inquiry. We do not sell personal data. For any request regarding your data, contact info@swiss-controls.com.
```
`imprint.mdx`:
```mdx
---
pageHeader:
  number: "01"
  label: "IMPRINT"
  title: "Impressum"
  intro: "Legal information for swiss-controls.com."
lastUpdated: "2026-07-09"
---

**Swiss Controls** — a brand of RIGITRADE AG
Schaffhauserstrasse 550, 8052 Zürich, Switzerland
Email: info@swiss-controls.com · Phone: +41 76 366 66 69
---
```
(Note: `imprint.mdx` and `privacy.mdx` both validate against `privacyPageSchema`.)

- [ ] **Step 11: Author `content/en/shared/nav.mdx` and `footer.mdx`**

`nav.mdx`:
```mdx
---
links:
  - label: "Services"
    href: "/services"
  - label: "Industries"
    href: "/industries"
  - label: "About"
    href: "/about"
  - label: "Contact"
    href: "/contact"
cta:
  label: "Discuss Your Project"
  href: "/contact"
---
```
`footer.mdx`:
```mdx
---
tagline: "Independent Engineering. Intelligent Integration. Reliable Performance."
technologyTag: "A BRAND BY RIGITRADE AG"
office:
  company: "Swiss Controls"
  address: |-
    Headquarters
    Schaffhauserstrasse 550
    8052 Zürich
    Switzerland
contact:
  email: "info@swiss-controls.com"
  phone: "+41 76 366 66 69"
legal:
  - label: "Imprint"
    href: "/imprint"
  - label: "Privacy"
    href: "/privacy"
social:
  - platform: linkedin
    href: "https://www.linkedin.com/company/swiss-controls"
---
```

- [ ] **Step 12: Run the content test**

Run: `npx vitest run src/lib/content/content.test.ts`
Expected: PASS (all files load and validate).

- [ ] **Step 13: Commit**

```bash
git add -A && git commit -m "feat: author Swiss Controls content (en)"
```

---

## Phase 2 — Components

> Convention for all new blocks: follow `core-capabilities.tsx` / `industry-tiles.tsx` — server component unless motion requires `"use client"`; use `Section`/`Container`/`Stack`/`SectionLabel` primitives; content passed as typed props from `HomeContent[...]`. Icons via `lucide-react` looked up by name.

### Task 2.1: Adapt the Hero

**Files:**
- Modify: `src/components/blocks/hero.tsx`
- Test: `src/components/blocks/hero.test.tsx` (Create)

**Interfaces:**
- Consumes: `HomeContent["hero"]` (Task 1.1) — `{ wordmark, eyebrow, headline, body, positioning, primaryCta }`.
- Produces: `<Hero hero={...} locale="en" />`.

- [ ] **Step 1: Write the failing render test**

Create `src/components/blocks/hero.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Hero } from "./hero"

const hero = {
  wordmark: "SWISS CONTROLS",
  eyebrow: "A Brand by RIGITRADE AG",
  headline: "Engineering the Future of Industry",
  body: "We deliver independent engineering.",
  positioning: "Independent Engineering. Intelligent Integration. Reliable Performance.",
  primaryCta: { label: "Discuss Your Project", href: "/contact" },
}

describe("Hero", () => {
  it("renders wordmark, headline and CTA to the localized contact route", () => {
    render(<Hero hero={hero} locale="en" />)
    expect(screen.getByText("SWISS CONTROLS")).toBeInTheDocument()
    expect(screen.getByText("Engineering the Future of Industry")).toBeInTheDocument()
    const cta = screen.getByRole("link", { name: "Discuss Your Project" })
    expect(cta).toHaveAttribute("href", "/en/contact")
  })
})
```

- [ ] **Step 2: Run to verify it fails**

Run: `npx vitest run src/components/blocks/hero.test.tsx`
Expected: FAIL (Hero props mismatch / old shape).

- [ ] **Step 3: Rewrite `hero.tsx` for the new content shape**

Keep the dark full-bleed section, mask-reveal headline, and motion. Replace the props type and body:
```tsx
"use client"

import { motion, type Variants } from "framer-motion"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { LinkButton } from "@/components/ui/link-button"
import type { HomeContent } from "@/lib/content/schema"

type HeroProps = { hero: HomeContent["hero"]; locale: "en" }

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
const lineReveal: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero({ hero, locale }: HeroProps) {
  return (
    <section className="relative isolate flex min-h-[100vh] items-end overflow-hidden bg-ink text-paper">
      {/* Technical grid backdrop (placeholder abstract treatment) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.steel),theme(colors.ink))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.15] [background-image:linear-gradient(theme(colors.volt)_1px,transparent_1px),linear-gradient(90deg,theme(colors.volt)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="absolute left-6 top-24 sm:left-8 lg:left-16"
      >
        <span className="font-mono text-micro uppercase tracking-[0.2em] text-paper/80">
          <span className="mr-2 inline-block h-1 w-6 align-middle bg-volt" />
          {hero.eyebrow}
        </span>
      </motion.div>

      <Container className="pb-section-mobile pt-32 lg:pb-section-loose">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <Stack gap="6">
            <span className="font-logo text-caption uppercase tracking-[0.35em] text-volt">
              {hero.wordmark}
            </span>
            <h1 className="text-display-2xl font-medium tracking-tight text-balance">
              <span className="block overflow-hidden">
                <motion.span variants={lineReveal} className="block text-paper">
                  {hero.headline}
                </motion.span>
              </span>
            </h1>
            <motion.p variants={fadeUp} className="max-w-[60ch] text-body-l text-paper/85 lg:text-h3">
              {hero.body}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-mono text-caption uppercase tracking-[0.2em] text-paper/80"
            >
              <span className="mr-3 inline-block h-px w-10 align-middle bg-signal" />
              {hero.positioning}
            </motion.p>
            <motion.div variants={fadeUp}>
              <LinkButton href={`/${locale}${hero.primaryCta.href}`} variant="primary" size="lg">
                {hero.primaryCta.label}
              </LinkButton>
            </motion.div>
          </Stack>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:flex flex-col items-center gap-2"
      >
        <Link href="#at-a-glance" className="group flex flex-col items-center gap-3 text-paper/60 hover:text-paper" aria-label="Scroll to content">
          <span className="font-mono text-micro uppercase tracking-[0.2em]">Scroll</span>
          <span className="relative block h-12 w-px bg-paper/30 overflow-hidden">
            <span className="absolute inset-0 block h-1/2 w-full bg-volt animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
          </span>
          <ArrowDown className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npx vitest run src/components/blocks/hero.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Swiss Controls hero"
```

---

### Task 2.2: At a Glance metrics ribbon

**Files:**
- Create: `src/components/blocks/at-a-glance.tsx`
- Test: `src/components/blocks/at-a-glance.test.tsx` (Create)

**Interfaces:**
- Consumes: `HomeContent["metrics"]` — `{ number, label, items: {value, suffix?, label}[] }`, `CountUp` from `@/components/interactive/count-up`.
- Produces: `<AtAGlance content={...} />` rendering a 4-column ribbon with `id="at-a-glance"`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AtAGlance } from "./at-a-glance"

const content = {
  number: "01", label: "AT A GLANCE",
  items: [
    { value: "20", suffix: "+", label: "Years of Engineering Experience" },
    { value: "5", label: "Core Engineering Disciplines" },
    { value: "100", suffix: "%", label: "Independent Engineering" },
    { value: "International", label: "Projects Across CH, EU, GCC, Middle East & Africa" },
  ],
}

describe("AtAGlance", () => {
  it("renders all four metric labels", () => {
    render(<AtAGlance content={content} />)
    expect(screen.getByText("Core Engineering Disciplines")).toBeInTheDocument()
    expect(screen.getByText("International")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run — expect FAIL** (`npx vitest run src/components/blocks/at-a-glance.test.tsx`)

- [ ] **Step 3: Implement `at-a-glance.tsx`**

```tsx
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import { CountUp } from "@/components/interactive/count-up"
import type { HomeContent } from "@/lib/content/schema"

type Props = { content: HomeContent["metrics"] }

export function AtAGlance({ content }: Props) {
  return (
    <Section id="at-a-glance" surface="stone" density="tight">
      <Container>
        <div className="mb-8">
          <SectionLabel number={content.number} label={content.label} />
        </div>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {content.items.map((m) => {
            const numeric = /^\d+$/.test(m.value)
            return (
              <div key={m.label} className="border-l-2 border-signal pl-4">
                <dd className="text-display-m font-medium text-ink">
                  {numeric ? (
                    <CountUp to={Number(m.value)} suffix={m.suffix ?? ""} />
                  ) : (
                    <span>{m.value}</span>
                  )}
                </dd>
                <dt className="mt-2 font-mono text-micro uppercase tracking-[0.08em] text-ink/60">
                  {m.label}
                </dt>
              </div>
            )
          })}
        </dl>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 4: Run — expect PASS**

- [ ] **Step 5: Commit** — `git commit -am "feat: at-a-glance metrics ribbon"`

---

### Task 2.3: Services grid (with lucide icons + links)

**Files:**
- Create: `src/components/blocks/services-grid.tsx`
- Test: `src/components/blocks/services-grid.test.tsx` (Create)

**Interfaces:**
- Consumes: `HomeContent["services"]` — `{ number, label, items: {slug, icon, title, summary}[] }`.
- Produces: `<ServicesGrid content={...} locale="en" />` — a 2×3 grid of cards linking to `/en/services/{slug}`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ServicesGrid } from "./services-grid"

const content = {
  number: "02", label: "SERVICES",
  items: [
    { slug: "industrial-automation", icon: "Cpu", title: "Industrial Automation", summary: "…" },
    { slug: "system-integration", icon: "Network", title: "System Integration", summary: "…" },
  ],
}

describe("ServicesGrid", () => {
  it("links each card to the localized service route", () => {
    render(<ServicesGrid content={content} locale="en" />)
    expect(screen.getByRole("link", { name: /Industrial Automation/ }))
      .toHaveAttribute("href", "/en/services/industrial-automation")
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

- [ ] **Step 3: Implement `services-grid.tsx`** (icon lookup via a typed map — do NOT dynamically index all of lucide)

```tsx
import Link from "next/link"
import { Cpu, Zap, Network, DraftingCompass, RefreshCw, Factory, ArrowUpRight, type LucideIcon } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

const ICONS: Record<string, LucideIcon> = {
  Cpu, Zap, Network, DraftingCompass, RefreshCw, Factory,
}

type Props = { content: HomeContent["services"]; locale: "en" }

export function ServicesGrid({ content, locale }: Props) {
  return (
    <Section surface="paper">
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={content.number} label={content.label} />
        </div>
        <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Cpu
            return (
              <Link
                key={item.slug}
                href={`/${locale}/services/${item.slug}`}
                className="group relative flex flex-col bg-paper p-8 transition-colors hover:bg-stone/40"
              >
                <Stack gap="4">
                  <div className="flex items-center justify-between">
                    <Icon className="h-8 w-8 text-signal" aria-hidden="true" strokeWidth={1.5} />
                    <ArrowUpRight className="h-5 w-5 text-ink/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-micro uppercase tracking-[0.16em] text-ink/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-h3 font-medium text-ink">{item.title}</h3>
                  <p className="text-body text-ink/70">{item.summary}</p>
                </Stack>
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
```

- [ ] **Step 4: Run — expect PASS**

- [ ] **Step 5: Commit** — `git commit -am "feat: services grid"`

---

### Task 2.4: Process timeline

**Files:**
- Create: `src/components/blocks/process-timeline.tsx`
- Test: `src/components/blocks/process-timeline.test.tsx` (Create)

**Interfaces:**
- Consumes: `HomeContent["process"]` — `{ number, label, steps: {step, detail}[] }`.
- Produces: `<ProcessTimeline content={...} />`.

- [ ] **Step 1: Failing test** — renders all step names (`Discover`…`Support`) and numbers.
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProcessTimeline } from "./process-timeline"
const content = { number: "03", label: "PROCESS", steps: [
  { step: "Discover", detail: "a" }, { step: "Support", detail: "b" } ] }
describe("ProcessTimeline", () => {
  it("renders each step", () => {
    render(<ProcessTimeline content={content} />)
    expect(screen.getByText("Discover")).toBeInTheDocument()
    expect(screen.getByText("Support")).toBeInTheDocument()
  })
})
```
- [ ] **Step 2: Run — expect FAIL**
- [ ] **Step 3: Implement** (dark section; horizontal on lg, vertical on mobile; connective rule in signal, step index in volt)
```tsx
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

type Props = { content: HomeContent["process"] }

export function ProcessTimeline({ content }: Props) {
  return (
    <Section surface="ink">
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={content.number} label={content.label} className="!text-paper/60" />
        </div>
        <ol className="grid grid-cols-1 gap-px bg-paper/10 md:grid-cols-5">
          {content.steps.map((s, i) => (
            <li key={s.step} className="bg-ink p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-micro text-volt">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px flex-1 bg-signal/40" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-h3 font-medium text-paper">{s.step}</h3>
              <p className="mt-2 text-body text-paper/70">{s.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
```
- [ ] **Step 4: Run — expect PASS**
- [ ] **Step 5: Commit** — `git commit -am "feat: process timeline"`

---

### Task 2.5: Technology wall

**Files:**
- Create: `src/components/blocks/technology-wall.tsx`
- Test: `src/components/blocks/technology-wall.test.tsx` (Create)

**Interfaces:**
- Consumes: `HomeContent["technologies"]` — `{ number, label, note, vendors: string[] }`.
- Produces: `<TechnologyWall content={...} />` — monochrome text-lockup grid (placeholder for real logos).

- [ ] **Step 1: Failing test** — renders all vendor names + the note.
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TechnologyWall } from "./technology-wall"
const content = { number: "04", label: "TECH", note: "Independent.", vendors: ["ABB", "Siemens"] }
describe("TechnologyWall", () => {
  it("renders vendors", () => {
    render(<TechnologyWall content={content} />)
    expect(screen.getByText("ABB")).toBeInTheDocument()
    expect(screen.getByText("Siemens")).toBeInTheDocument()
  })
})
```
- [ ] **Step 2: Run — expect FAIL**
- [ ] **Step 3: Implement**
```tsx
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import type { HomeContent } from "@/lib/content/schema"

type Props = { content: HomeContent["technologies"] }

export function TechnologyWall({ content }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number={content.number} label={content.label} />
          </div>
          <p className="text-body text-ink/70 lg:col-span-7">{content.note}</p>
        </div>
        <ul className="grid grid-cols-2 gap-px bg-hairline sm:grid-cols-3 lg:grid-cols-4">
          {content.vendors.map((v) => (
            <li
              key={v}
              className="flex items-center justify-center bg-paper px-4 py-8 text-center font-mono text-caption uppercase tracking-[0.12em] text-ink/50 grayscale transition-colors hover:text-ink"
            >
              {v}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
```
- [ ] **Step 4: Run — expect PASS**
- [ ] **Step 5: Commit** — `git commit -am "feat: technology wall"`

---

### Task 2.6: Industries grid

**Files:**
- Create: `src/components/blocks/industries-grid.tsx`
- Test: `src/components/blocks/industries-grid.test.tsx` (Create)

**Interfaces:**
- Consumes: a plain props object `{ number, label, intro, items: string[] }` (used by both home `industries` and the industries page). No photography — text tiles on a hairline grid.
- Produces: `<IndustriesGrid number label intro items />`.

- [ ] **Step 1: Failing test** — renders intro + all industry names.
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { IndustriesGrid } from "./industries-grid"
describe("IndustriesGrid", () => {
  it("renders items", () => {
    render(<IndustriesGrid number="05" label="INDUSTRIES" intro="x" items={["Oil & Gas", "Utilities"]} />)
    expect(screen.getByText("Oil & Gas")).toBeInTheDocument()
    expect(screen.getByText("Utilities")).toBeInTheDocument()
  })
})
```
- [ ] **Step 2: Run — expect FAIL**
- [ ] **Step 3: Implement**
```tsx
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"

type Props = { number: string; label: string; intro: string; items: string[] }

export function IndustriesGrid({ number, label, intro, items }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel number={number} label={label} />
          </div>
          <p className="text-body-l text-ink/80 lg:col-span-7">{intro}</p>
        </div>
        <ul className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={item} className="group flex items-center justify-between bg-paper p-6">
              <span className="text-h3 font-medium text-ink">{item}</span>
              <span className="font-mono text-micro text-signal/60 group-hover:text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
```
- [ ] **Step 4: Run — expect PASS**
- [ ] **Step 5: Commit** — `git commit -am "feat: industries grid"`

---

### Task 2.7: Why-choose grid

**Files:**
- Create: `src/components/blocks/why-choose.tsx`
- Test: `src/components/blocks/why-choose.test.tsx` (Create)

**Interfaces:**
- Consumes: `{ number, label, items: {title, detail}[] }` (used by home `whyChoose` and about `values`).
- Produces: `<WhyChoose number label items />`.

- [ ] **Step 1: Failing test** — renders each item title + detail.
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { WhyChoose } from "./why-choose"
describe("WhyChoose", () => {
  it("renders items", () => {
    render(<WhyChoose number="06" label="WHY" items={[{ title: "Swiss Quality", detail: "d" }]} />)
    expect(screen.getByText("Swiss Quality")).toBeInTheDocument()
  })
})
```
- [ ] **Step 2: Run — expect FAIL**
- [ ] **Step 3: Implement**
```tsx
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"

type Item = { title: string; detail: string }
type Props = { number: string; label: string; items: Item[] }

export function WhyChoose({ number, label, items }: Props) {
  return (
    <Section surface="stone" density="default">
      <Container>
        <div className="mb-12 max-w-2xl">
          <SectionLabel number={number} label={label} />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="border-t-2 border-signal pt-4">
              <h3 className="text-h3 font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-body text-ink/70">{item.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
```
- [ ] **Step 4: Run — expect PASS**
- [ ] **Step 5: Commit** — `git commit -am "feat: why-choose grid"`

---

### Task 2.8: Service detail catalog

**Files:**
- Create: `src/components/blocks/service-detail-catalog.tsx`
- Test: `src/components/blocks/service-detail-catalog.test.tsx` (Create)

**Interfaces:**
- Consumes: `{ summary: string; catalog: string[] }`.
- Produces: `<ServiceDetailCatalog summary catalog />` — numbered two-column list.

- [ ] **Step 1: Failing test** — renders every catalog item, numbered.
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ServiceDetailCatalog } from "./service-detail-catalog"
describe("ServiceDetailCatalog", () => {
  it("renders all items", () => {
    render(<ServiceDetailCatalog summary="s" catalog={["PLC Programming", "SCADA / HMI Development"]} />)
    expect(screen.getByText("PLC Programming")).toBeInTheDocument()
    expect(screen.getByText("SCADA / HMI Development")).toBeInTheDocument()
  })
})
```
- [ ] **Step 2: Run — expect FAIL**
- [ ] **Step 3: Implement**
```tsx
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"

type Props = { summary: string; catalog: string[] }

export function ServiceDetailCatalog({ summary, catalog }: Props) {
  return (
    <Section surface="paper" density="default">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <Stack gap="4">
              <SectionLabel number="01" label="SCOPE" />
              <p className="text-body-l text-ink/80">{summary}</p>
            </Stack>
          </aside>
          <div className="lg:col-span-8">
            <ol className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
              {catalog.map((item, i) => (
                <li key={item} className="flex items-start gap-4 bg-paper p-5">
                  <span className="font-mono text-micro text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-body text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  )
}
```
- [ ] **Step 4: Run — expect PASS**
- [ ] **Step 5: Commit** — `git commit -am "feat: service detail catalog"`

---

### Task 2.9: Adapt shared chrome (final-cta, footer, contact form, cleanup)

**Files:**
- Modify: `src/components/blocks/final-cta.tsx`
- Modify: `src/components/interactive/site-footer.tsx`
- Modify: `src/components/interactive/contact-form.tsx`
- Delete: `src/components/interactive/quote-form.tsx`, `src/lib/forms/quote-schema.ts`, `src/components/interactive/lang-switcher.tsx` (single locale — remove switcher) and its usage in `site-header.tsx`.
- Delete unused Rigitrade blocks: `strategic-value.tsx`, `metallurgy-authority.tsx`, `manufacturing-technology.tsx`, `production-capacity.tsx`, `core-capabilities.tsx`, `industry-tiles.tsx`, `trust-strip.tsx`, `aod-banner.tsx`, `application-focus.tsx`, `feature-break.tsx`, `manufacturing-gallery.tsx`, `material-comparison-table.tsx`, `rotating-seal.tsx`.

**Interfaces:**
- Produces: `<FinalCta finalCta={HomeContent["finalCta"]} locale="en" />` (single CTA); footer + contact form referencing Swiss Controls.

- [ ] **Step 1: Simplify `final-cta.tsx`**

Remove the `<Image>` background (no asset yet) and the secondary CTA. Use a signal gradient on ink:
```tsx
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { LinkButton } from "@/components/ui/link-button"
import { DisplayHeading } from "@/components/typography/display-heading"
import type { HomeContent } from "@/lib/content/schema"

type FinalCtaProps = { finalCta: HomeContent["finalCta"]; locale: "en" }

export function FinalCta({ finalCta, locale }: FinalCtaProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-section-mobile text-paper lg:py-section-loose">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,theme(colors.signal)/0.35,theme(colors.ink))]" />
      <Container>
        <div className="max-w-3xl">
          <Stack gap="6">
            <span className="font-mono text-micro uppercase tracking-[0.2em] text-paper/70">
              <span className="mr-2 inline-block h-1 w-6 align-middle bg-volt" aria-hidden="true" />
              Get in Touch
            </span>
            <DisplayHeading as="h2" size="display-l" className="text-paper">
              {finalCta.headline}
            </DisplayHeading>
            {finalCta.body && (
              <p className="max-w-[60ch] text-body-l text-paper/85 lg:text-h3">{finalCta.body}</p>
            )}
            <LinkButton href={`/${locale}${finalCta.primaryCta.href}`} variant="primary" size="lg">
              {finalCta.primaryCta.label}
            </LinkButton>
          </Stack>
        </div>
      </Container>
    </section>
  )
}
```

- [ ] **Step 2: Update `site-footer.tsx`** to match the new `footerSchema` (no `branchOffice`, no `cheNumber`). Open the file, remove any rendering of `content.office.cheNumber` and `content.branchOffice`. Verify remaining fields (`tagline`, `technologyTag`, `office.company`, `office.address`, `contact.email`, `contact.phone`, `legal`, `social`) still render. Run `npm run type-check` to confirm no missing-field errors.

- [ ] **Step 3: Update `contact-form.tsx`** — replace the two hardcoded "Rigitrade" strings: the consent text "I consent to Rigitrade processing…" → "Swiss Controls", the privacy link `/en/privacy` (already locale-correct), and the fallback error "email info@rigitrade.com directly." → "info@swiss-controls.com". Leave the form fields and Formspree wiring intact.

- [ ] **Step 4: Remove the language switcher** from `site-header.tsx` — delete the `LangSwitcher` import and its two usages (desktop + mobile). Then delete `lang-switcher.tsx`. Run `npm run type-check`.

- [ ] **Step 5: Delete unused blocks/forms** (listed in Files above).
```bash
cd /d/Personal/swiss-controls-website
rm -f src/components/interactive/quote-form.tsx src/lib/forms/quote-schema.ts
rm -f src/components/blocks/strategic-value.tsx src/components/blocks/metallurgy-authority.tsx \
  src/components/blocks/manufacturing-technology.tsx src/components/blocks/production-capacity.tsx \
  src/components/blocks/core-capabilities.tsx src/components/blocks/industry-tiles.tsx \
  src/components/blocks/trust-strip.tsx src/components/blocks/aod-banner.tsx \
  src/components/blocks/application-focus.tsx src/components/blocks/feature-break.tsx \
  src/components/blocks/manufacturing-gallery.tsx src/components/blocks/material-comparison-table.tsx \
  src/components/interactive/rotating-seal.tsx
```
Also fix `src/lib/forms/index.ts` if it re-exports `quote-schema` (remove that export).

- [ ] **Step 6: Verify nothing imports the deleted files**

Run: `npm run type-check`
Expected: PASS (any dangling import is a real error to fix now).

- [ ] **Step 7: Commit** — `git commit -am "feat: adapt shared chrome, remove Rigitrade-specific blocks"`

---

## Phase 3 — Pages

### Task 3.1: Home page

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Test: covered by Playwright smoke (Task 4.3).

**Interfaces:**
- Consumes: all Phase 2 blocks; `homeSchema`.

- [ ] **Step 1: Rewrite `page.tsx`**

```tsx
import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/blocks/hero"
import { AtAGlance } from "@/components/blocks/at-a-glance"
import { ServicesGrid } from "@/components/blocks/services-grid"
import { ProcessTimeline } from "@/components/blocks/process-timeline"
import { TechnologyWall } from "@/components/blocks/technology-wall"
import { IndustriesGrid } from "@/components/blocks/industries-grid"
import { WhyChoose } from "@/components/blocks/why-choose"
import { FinalCta } from "@/components/blocks/final-cta"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { loadPageContent } from "@/lib/content/load"
import { homeSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Engineering the Future of Industry",
  description:
    "Independent Swiss engineering for industrial automation, electrical engineering, industrial electrification, and system integration.",
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "home", homeSchema)
  const c = frontmatter

  return (
    <>
      <Hero hero={c.hero} locale="en" />
      <Section surface="paper" density="default">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-h1 font-medium text-ink">{c.intro.heading}</h2>
            <p className="mt-6 text-body-l text-ink/80">{c.intro.body}</p>
          </div>
        </Container>
      </Section>
      <AtAGlance content={c.metrics} />
      <ServicesGrid content={c.services} locale="en" />
      <ProcessTimeline content={c.process} />
      <TechnologyWall content={c.technologies} />
      <IndustriesGrid number={c.industries.number} label={c.industries.label} intro={c.industries.intro} items={c.industries.items} />
      <WhyChoose number={c.whyChoose.number} label={c.whyChoose.label} items={c.whyChoose.items} />
      <FinalCta finalCta={c.finalCta} locale="en" />
    </>
  )
}
```

- [ ] **Step 2: Verify it renders in dev**

Run: `npm run dev` then load `http://localhost:3000/en`. Expected: home renders with all sections; no console errors. (Use the Chrome tools or curl the built HTML in Task 4.)

- [ ] **Step 3: Commit** — `git commit -am "feat: home page composition"`

---

### Task 3.2: Services overview page

**Files:**
- Create: `src/app/[locale]/services/page.tsx`

**Interfaces:**
- Consumes: `servicesIndexSchema`, `ServicesGrid`, `SERVICES`.

- [ ] **Step 1: Implement**

```tsx
import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { ServicesGrid } from "@/components/blocks/services-grid"
import { loadPageContent } from "@/lib/content/load"
import { servicesIndexSchema } from "@/lib/content/schema"
import { SERVICES } from "@/lib/content/services"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Services",
  description: "Six integrated engineering services across the full industrial lifecycle.",
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "services/index", servicesIndexSchema)
  const items = SERVICES.map((s) => ({ slug: s.slug, icon: s.icon, title: s.title, summary: s.summary }))

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Services" }]}
      />
      <ServicesGrid content={{ number: "01", label: "OUR SERVICES", items }} locale="en" />
    </>
  )
}
```

- [ ] **Step 2: Verify** `http://localhost:3000/en/services` renders 6 cards.
- [ ] **Step 3: Commit** — `git commit -am "feat: services overview page"`

---

### Task 3.3: Service detail dynamic route

**Files:**
- Create: `src/app/[locale]/services/[slug]/page.tsx`

**Interfaces:**
- Consumes: `serviceDetailSchema`, `SERVICE_SLUGS`, `getService`, `ServiceDetailCatalog`, `MidPageCta` (reused), `PageHeader`.
- Produces: static params for all 6 slugs (required for `output: export`).

- [ ] **Step 1: Implement**

```tsx
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { ServiceDetailCatalog } from "@/components/blocks/service-detail-catalog"
import { MidPageCta } from "@/components/blocks/mid-page-cta"
import { loadPageContent } from "@/lib/content/load"
import { serviceDetailSchema } from "@/lib/content/schema"
import { SERVICE_SLUGS, getService } from "@/lib/content/services"
import { routing, type Locale } from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const svc = getService(slug)
  return { title: svc?.title ?? "Service", description: svc?.summary }
}

export default async function ServiceDetailPage({
  params,
}: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  if (!getService(slug)) notFound()
  const { frontmatter } = await loadPageContent(locale as Locale, `services/${slug}`, serviceDetailSchema)

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[
          { label: "Home", href: `/${locale}` },
          { label: "Services", href: `/${locale}/services` },
          { label: frontmatter.pageHeader.title },
        ]}
      />
      <ServiceDetailCatalog summary={frontmatter.summary} catalog={frontmatter.catalog} />
      <MidPageCta
        heading="Have a project in this area?"
        cta={{ label: "Discuss Your Project", href: `/${locale}/contact` }}
      />
    </>
  )
}
```
> Note: inspect `mid-page-cta.tsx`'s actual prop names first; adapt the `<MidPageCta … />` call to match. If its API differs, pass the equivalent props (heading + single CTA).

- [ ] **Step 2: Verify** each of the 6 routes renders its full catalog, e.g. `http://localhost:3000/en/services/system-integration` shows 12 items.
- [ ] **Step 3: Commit** — `git commit -am "feat: service detail pages"`

---

### Task 3.4: About page

**Files:**
- Create/Modify: `src/app/[locale]/about/page.tsx`

- [ ] **Step 1: Implement**
```tsx
import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { WhyChoose } from "@/components/blocks/why-choose"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { loadPageContent } from "@/lib/content/load"
import { aboutPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "About",
  description: "Swiss Controls — an independent Swiss engineering brand by RIGITRADE AG.",
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "about", aboutPageSchema)

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "About" }]}
      />
      <Section surface="paper" density="default">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {frontmatter.sections.map((s) => (
              <article key={s.number}>
                <Stack gap="3">
                  <SectionLabel number={s.number} label="ABOUT" />
                  <h2 className="text-h2 font-medium text-ink">{s.title}</h2>
                  <p className="text-body text-ink/75">{s.body}</p>
                </Stack>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <WhyChoose number="04" label="OUR VALUES" items={frontmatter.values} />
    </>
  )
}
```
- [ ] **Step 2: Verify** `http://localhost:3000/en/about`.
- [ ] **Step 3: Commit** — `git commit -am "feat: about page"`

---

### Task 3.5: Industries page

**Files:**
- Create: `src/app/[locale]/industries/page.tsx`

- [ ] **Step 1: Implement**
```tsx
import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { IndustriesGrid } from "@/components/blocks/industries-grid"
import { Section } from "@/components/primitives/section"
import { Container } from "@/components/primitives/container"
import { SectionLabel } from "@/components/typography/section-label"
import { loadPageContent } from "@/lib/content/load"
import { industriesPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Industries",
  description: "Industries served by Swiss Controls across Switzerland, Europe, the GCC, the Middle East, and Africa.",
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "industries", industriesPageSchema)

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Industries" }]}
      />
      <IndustriesGrid number="01" label="SECTORS" intro={frontmatter.pageHeader.intro} items={frontmatter.industries} />
      <Section surface="stone" density="default">
        <Container>
          <div className="mb-8"><SectionLabel number="02" label={frontmatter.clientTypesLabel} /></div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-caption uppercase tracking-[0.08em] text-ink/70">
            {frontmatter.clientTypes.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </Container>
      </Section>
    </>
  )
}
```
- [ ] **Step 2: Verify** `http://localhost:3000/en/industries`.
- [ ] **Step 3: Commit** — `git commit -am "feat: industries page"`

---

### Task 3.6: Contact page (single form)

**Files:**
- Modify: `src/app/[locale]/contact/page.tsx`

- [ ] **Step 1: Rewrite** removing the QuoteForm, keeping ContactForm + office block; match the new `contactPageSchema` (`office.address/phone/email`).
```tsx
import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { Stack } from "@/components/primitives/stack"
import { Hairline } from "@/components/primitives/hairline"
import { PageHeader } from "@/components/blocks/page-header"
import { SectionLabel } from "@/components/typography/section-label"
import { LeaderDots } from "@/components/typography/leader-dots"
import { ContactForm } from "@/components/interactive/contact-form"
import { loadPageContent } from "@/lib/content/load"
import { contactPageSchema } from "@/lib/content/schema"
import type { Locale } from "@/i18n/routing"

export const metadata: Metadata = {
  title: "Contact",
  description: "Discuss your project with the Swiss Controls engineering team.",
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const { frontmatter } = await loadPageContent(locale as Locale, "contact", contactPageSchema)
  const contactId = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID ?? ""

  return (
    <>
      <PageHeader
        {...frontmatter.pageHeader}
        breadcrumbs={[{ label: "Home", href: `/${locale}` }, { label: "Contact" }]}
      />
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <Stack gap="4">
                <SectionLabel number="01" label="HEADQUARTERS" />
                <p className="whitespace-pre-line text-body-l text-ink">{frontmatter.office.address}</p>
                <Hairline className="my-2" />
                <LeaderDots left="Email" right={frontmatter.office.email} />
                <LeaderDots left="Phone" right={frontmatter.office.phone} />
              </Stack>
            </aside>
            <div className="lg:col-span-8">
              <Stack gap="6">
                <SectionLabel number="02" label="SEND US A MESSAGE" />
                <ContactForm formspreeId={contactId} />
              </Stack>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
```
- [ ] **Step 2: Verify** the form renders and validates (empty submit shows errors); a real send requires `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` in `.env.local`.
- [ ] **Step 3: Commit** — `git commit -am "feat: contact page"`

---

### Task 3.7: Privacy, Imprint, root redirect, not-found

**Files:**
- Modify: `src/app/[locale]/privacy/page.tsx` (already exists — align to new schema; it renders MDX body via `next-mdx-remote`).
- Create: `src/app/[locale]/imprint/page.tsx` (same pattern as privacy, loads `imprint` + `privacyPageSchema`).
- Verify: `src/app/page.tsx` (root) redirects to `/en`; `src/app/not-found.tsx` exists.

- [ ] **Step 1: Align privacy page** — open `privacy/page.tsx`; ensure it loads `privacyPageSchema` and renders `pageHeader` + MDX body. Remove any Rigitrade-specific fields no longer in the schema.
- [ ] **Step 2: Create imprint page** by copying the privacy page and changing the loaded slug to `"imprint"` and the metadata title to "Imprint".
- [ ] **Step 3: Verify root redirect** — open `src/app/page.tsx`; confirm it redirects to `/${defaultLocale}`. If it hardcodes `/en`, that's fine. For static export, ensure it uses `redirect("/en")` from `next/navigation` at the top level or a generateStaticParams-free redirect page.
- [ ] **Step 4: Verify** `http://localhost:3000/` → `/en`; `/en/privacy`, `/en/imprint` render.
- [ ] **Step 5: Commit** — `git commit -am "feat: privacy, imprint, root redirect"`

---

## Phase 4 — Assets, SEO, Tests, Verification

### Task 4.1: Placeholder assets & cleanup public/

**Files:**
- Modify: `public/` — remove Rigitrade imagery; add minimal placeholders.

- [ ] **Step 1: Remove Rigitrade images** that are no longer referenced.
```bash
cd /d/Personal/swiss-controls-website
rm -rf public/img/hero public/img/solutions public/img/industries public/img/featured public/img/manufacturing 2>/dev/null || true
```
- [ ] **Step 2: Add `public/og-default.png`** — a simple 1200×630 placeholder (solid ink background with "SWISS CONTROLS" wordmark). If image generation isn't available, create a minimal SVG at `public/og-default.svg` and reference it instead in metadata; note the swap-for-real-asset in a code comment.
- [ ] **Step 3: Confirm no `<Image src=...>` points to a missing file.**
Run: `grep -rn 'img/' src` → verify each referenced path exists in `public/`, or remove/replace the reference. (The hero and final-cta were de-imaged in Phase 2, so there should be none left except industries — which we made text-only.)
- [ ] **Step 4: Commit** — `git commit -am "chore: placeholder assets, remove Rigitrade imagery"`

---

### Task 4.2: SEO — sitemap, robots, canonical

**Files:**
- Verify: `next-sitemap.config.js`, per-page `metadata`.

- [ ] **Step 1: Confirm every page exports `metadata`** with a unique title/description (home, services, each service via `generateMetadata`, about, industries, contact, privacy, imprint).
- [ ] **Step 2: Build and confirm sitemap generation.**
Run: `npm run build`
Expected: build succeeds; `out/sitemap.xml` and `out/robots.txt` generated; all `/en/...` routes (incl. 6 service pages) present in the sitemap.
- [ ] **Step 3: Commit** — `git commit -am "chore: verify SEO output"`

---

### Task 4.3: Playwright smoke + a11y tests

**Files:**
- Modify/Create: `tests/` — update the existing smoke test route list; keep the axe a11y check.

**Interfaces:**
- Consumes: the built/served site.

- [ ] **Step 1: Update the smoke test** to assert 200 + key heading for each route:
```
/en, /en/services, /en/services/industrial-automation,
/en/services/electrical-engineering, /en/services/system-integration,
/en/services/engineering-consulting, /en/services/commissioning-lifecycle,
/en/services/procurement-sourcing, /en/about, /en/industries,
/en/contact, /en/privacy, /en/imprint
```
Open the existing test under `tests/`, replace the Rigitrade route array with the list above, and assert each page has a visible `h1`/`h2`. Keep the existing axe scan on `/en`.

- [ ] **Step 2: Run smoke tests**
Run: `npm run test:e2e`
Expected: PASS for all routes; axe reports no serious/critical violations. Fix any a11y violations surfaced (contrast on signal/volt, alt text, heading order).

- [ ] **Step 3: Commit** — `git commit -am "test: smoke + a11y across all routes"`

---

### Task 4.4: Full verification gate

- [ ] **Step 1: Type-check** — `npm run type-check` → PASS
- [ ] **Step 2: Lint** — `npm run lint` → PASS (0 warnings)
- [ ] **Step 3: Unit tests** — `npm test` → PASS (schema, services, content, component render tests)
- [ ] **Step 4: Build** — `npm run build` → static export to `out/` succeeds
- [ ] **Step 5: Smoke** — `npm run test:e2e` → PASS
- [ ] **Step 6: Manual visual pass** — serve `out/` (or `npm run dev`) and click through every route on desktop + mobile widths; confirm the electric-signal palette, hero, metrics count-up, services links, process timeline, tech wall, and contact form all read correctly.
- [ ] **Step 7: Final commit** — `git commit -am "chore: verification gate passing"`

---

## Self-Review — Spec Coverage

- **§1 overview / positioning / hero** → Tasks 1.3 (home.mdx), 2.1 (hero). ✅
- **§2 build approach (copy & reskin)** → Task 0.1. ✅
- **§3 6 services = 5 units + procurement, full catalogs** → Tasks 1.2, 1.3 (6 service files), 3.3. ✅
- **§3.2 process / industries / technologies / values / why / who-we-work-with** → home.mdx + industries.mdx + about.mdx; blocks 2.4–2.8; pages 3.1/3.4/3.5. ✅
- **§4 identity tokens (signal/volt, cool paper), fonts, motion** → Task 0.2; motion retained in hero/blocks. ✅
- **§5 sitemap / en-only routing** → Task 0.3 + Phase 3 pages. ✅
- **§6 page compositions** → Phase 3 (all pages). ✅
- **§7 components (reuse/adapt/new)** → Phase 2. ✅
- **§8 content & i18n (MDX + en.json, de stub deferred)** → Tasks 1.1–1.3. (messages/en.json inherited; verify no missing keys in Task 4.4 build.) ✅
- **§9 assets (placeholders)** → Tasks 2.1/2.9 (de-imaged), 4.1. ✅
- **§10 contact/config** → Tasks 0.3 (.env), 1.3 (contact.mdx), 3.6. ✅
- **§11 quality bar** → Task 4.3/4.4. ✅
- **§12 deferred (de/ar, real logos, projects, map)** → intentionally out of scope. ✅

No placeholders remain in code steps; all service/industry/tech data is inlined. Type names are consistent across tasks (`HomeContent`, `ServiceDetailContent`, `ServiceMeta`, `SERVICE_SLUGS`, `getService`).

> **Adaptation note for the implementer:** several tasks say "open X and adjust to match its real API" (`mid-page-cta.tsx`, `site-footer.tsx`, `privacy/page.tsx`, the Playwright smoke test, `forms/index.ts`). These are existing Rigitrade files whose exact internals should be read at execution time and adapted to the new schemas — the required end state is specified; the mechanical edits follow from reading the current file.
