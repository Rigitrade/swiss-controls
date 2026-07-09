# Swiss Controls Website — Design Spec

**Date:** 2026-07-09
**Project:** swiss-controls.com marketing website
**Brand:** Swiss Controls — a brand by RIGITRADE AG
**Status:** Approved design — pending implementation plan

---

## 1. Overview

Swiss Controls is a Swiss (Zürich-HQ) independent engineering & technology brand
delivering industrial automation, electrical engineering, industrial electrification,
system integration, digital industrial solutions, and technical consulting. The site
is a premium B2B marketing website that inherits the design system, engineering, and
identity of the existing `rigitrade_fe` project, re-skinned and re-content'd with a
distinct "electric-signal" visual identity.

**Positioning line:** Independent Engineering. Intelligent Integration. Reliable Performance.
**Hero headline:** SWISS CONTROLS — Engineering the Future of Industry (A Brand by RIGITRADE AG)

### Goals
- Establish enterprise-grade credibility for a new brand (Swiss quality, vendor independence).
- Present 6 top-level services, each with a full detailed catalog, across dedicated pages.
- Drive project inquiries to a single contact form (→ info@swiss-controls.com).
- Ship English-first, with the architecture ready for German (and later Arabic) as drop-ins.

### Non-goals (YAGNI)
- No CMS / admin. Content lives in MDX + JSON, edited in-repo.
- No projects/case-studies section at launch (no case-study content exists yet).
- No German/Arabic content at launch (structure ready, content deferred).
- No blog/news feed (competitor's was a neglected liability).

---

## 2. Build approach

Copy the proven `D:\Personal\Rigitrade\rigitrade_fe` project into
`D:\Personal\swiss-controls-website\` (excluding `.git`, `node_modules`, `.next`, `out`),
then re-theme and re-content. This inherits:

- Next.js 16 / React 19 / Tailwind v4 stack
- `next-intl` `[locale]` routing (i18n-ready)
- framer-motion motion system (mask-reveal, fade-up, stagger)
- MDX content pipeline (`gray-matter` + `next-mdx-remote`)
- Formspree contact form (`@formspree/react`), react-hook-form + zod
- Vitest + Playwright (smoke + visual + axe a11y) test setup
- next-sitemap, image optimization scripts

> Note: `rigitrade_fe/AGENTS.md` warns this Next.js version has breaking changes vs.
> training data. Read `node_modules/next/dist/docs/` before writing framework code.

---

## 3. Content architecture — the 6 services = 5 business units + Procurement

The client's "6 services" (copy PDF) map 1:1 onto the 5 business units (A–E from the
supplied images) plus Procurement. Each service page's detailed catalog is drawn from
the matching business-unit image.

| # | Service (nav label) | Slug | Business unit | Catalog items |
|---|---|---|---|---|
| 1 | Industrial Automation | `industrial-automation` | A (Flagship) | 11 |
| 2 | Electrical Engineering & Industrial Electrification | `electrical-engineering` | B | 11 |
| 3 | System Integration | `system-integration` | C (Panels) | 12 |
| 4 | Engineering & Technical Consulting | `engineering-consulting` | D | 11 |
| 5 | Commissioning & Lifecycle Services | `commissioning-lifecycle` | E | 12 |
| 6 | Procurement & Strategic Sourcing | `procurement-sourcing` | — (copy) | 7 categories |

The "**5** Core Engineering Disciplines" metric refers to the 5 engineering units
(Procurement is sourcing, not an engineering discipline).

### 3.1 Full service catalogs

**1. Industrial Automation** (Unit A — Flagship)
PLC Programming (Siemens, ABB, Schneider) · SCADA / HMI Development · DCS Engineering &
Configuration · Process Automation · Factory Automation · Motion Control & Servo Systems ·
Industrial Robotics Integration (partner or in-house later) · Industrial Communication
Networks (PROFINET, PROFIBUS) · EtherNet/IP, Modbus RTU/TCP, OPC UA, MQTT · Virtual
Commissioning & PLC Simulation · Industrial OT Network Architecture

**2. Electrical Engineering & Industrial Electrification** (Unit B)
LV Distribution Systems · MV Interface Engineering · MCC & PCC Design · Motor Control
Systems · VFD & Soft Starter Engineering (ABB, Siemens, Schneider) · Power Quality Analysis ·
Protection Coordination Studies · Load Flow Studies · Short Circuit Analysis · Arc Flash
Studies (Phase 2) · Electrical Design & Calculations

**3. System Integration** (Unit C — Electrical Panels & System Integration)
PLC Control Panels · MCC Panels · PCC Panels · RTU Panels · Remote I/O Panels · Drive
Panels · Operator Consoles · FAT / SAT · CE / IEC Compliance Documentation · Panel Retrofit
& Upgrades · Site Installation Supervision · System Integration

**4. Engineering & Technical Consulting** (Unit D)
Front-End Engineering Design (FEED) · Basic & Detailed Engineering · Electrical Engineering
Design · Instrumentation Engineering · Functional Design Specifications (FDS) · Control
Philosophy Development · Technical Specifications · Tender Documentation · Vendor Evaluation ·
Owner's Engineer Services · Design Reviews & Engineering Audits

**5. Commissioning & Lifecycle Services** (Unit E — Commissioning, Modernization & Asset Lifecycle)
Site Commissioning · Startup Assistance · FAT / SAT Support · Brownfield Modernization ·
Legacy PLC / DCS Migration (Siemens, ABB, Schneider) · Plant Expansion Projects ·
Obsolescence Management · Preventive Maintenance · Annual Maintenance Agreements (SLA) ·
Emergency Support · Spare Parts Management · Remote Technical Support

**6. Procurement & Strategic Sourcing** (copy PDF)
Sourcing of: Medium Voltage Switchgear · Low Voltage Systems · Power Transformers · Motor
Control Centres · Automation Equipment · Instrumentation · Industrial Control Systems.
Each manufacturer evaluated on engineering capability, quality systems, international
certifications, export experience, and lifecycle support.

### 3.2 Supporting content (from copy PDF)
- **Engineering process:** Discover → Engineer → Integrate → Deliver → Support (5 steps)
- **Industries (13):** Manufacturing · Utilities · Power Generation · Renewable Energy ·
  Water & Wastewater · Oil & Gas · Chemical & Petrochemical · Mining & Metals ·
  Pharmaceutical · Food & Beverage · Infrastructure · Transportation · Data Centres
- **Who we work with:** Industrial Manufacturers · Utilities · EPC Contractors ·
  Infrastructure Developers · Renewable Energy Developers · Water Authorities · OEMs ·
  Machine Builders · Industrial Integrators
- **Technology platforms (11):** ABB · Siemens · Schneider Electric · Rockwell Automation ·
  Beckhoff · Phoenix Contact · WAGO · Mitsubishi Electric · Omron · Cisco · Pepperl+Fuchs
- **Values (4):** Engineering Integrity · Quality · Partnership · Innovation
- **Why Swiss Controls (6):** Independent Engineering · Swiss Quality · Complete Project
  Lifecycle · Multidisciplinary Expertise · International Perspective · Long-Term Partnership
- **Swiss values (5):** Precision · Quality · Reliability · Transparency · Long-Term Value

---

## 4. Visual identity — "electric-signal" (mirror of Rigitrade's "forge-fire")

Same industrial bones as Rigitrade, opposite temperature. Rigitrade = metallurgy/heat
(warm forge orange on warm paper); Swiss Controls = control/voltage (cool signal blue on
cool paper).

### Color tokens (Tailwind v4 `@theme`)
| Token | Value | Role |
|---|---|---|
| `--color-ink` | `#0b0f14` | Base dark (shared with Rigitrade) |
| `--color-paper` | `#f6f8fb` | Cool off-white (vs Rigitrade warm `#fafaf7`) |
| `--color-steel` | `#1e293b` | Secondary dark surface |
| `--color-stone` | `#e2e8f0` | Cool light border/surface (vs warm `#e8e4dd`) |
| `--color-signal` | `#1D4ED8` | **Primary accent** — CTAs, rails, section markers |
| `--color-signal-bright` | `#2563EB` | Hover/active |
| `--color-volt` | `#22D3EE` | **Electric-cyan micro-accent** — underlines, scroll cue, tick marks |

`signal` replaces every use of Rigitrade's `forge`. `volt` is a sparingly-used live-signal
highlight (thin voltage-style underlines, the animated scroll cue, mono tick marks).

### Typography (reused from Rigitrade)
- **Display/body:** Switzer (`--font-sans`)
- **Technical labels:** JetBrains Mono (`--font-mono`) — the mono-label-with-section-number
  system is core to the premium feel and is retained.
- Full modular type scale, spacing, motion tokens carried over unchanged.
- Strong H1/H2 hierarchy; body line-height 1.5–1.6 (per client checklist).

### Motion
Reuse Rigitrade's system: hero mask-reveal + scale-in image, `fade-up` on scroll,
staggered children, `--ease-out-expo`. Honor `prefers-reduced-motion`.

---

## 5. Sitemap & routing

Built on existing `src/app/[locale]/…` with **only `en` active** at launch.

```
/                            Home
/services                    Services overview (grid of 6)
/services/[slug]             6 detail pages (full catalog per service)
/about                       Who we are · philosophy · why clients trust us · values
/industries                  13 industries · who we work with
/contact                     Contact form + HQ details
/privacy                     Privacy policy
/imprint                     Swiss Impressum (legal)
```

`[slug]` ∈ { industrial-automation, electrical-engineering, system-integration,
engineering-consulting, commissioning-lifecycle, procurement-sourcing }.

---

## 6. Page compositions

### 6.1 Home
1. **Hero** — dark slate, "SWISS CONTROLS / Engineering the Future of Industry",
   "A Brand by RIGITRADE AG", CTA **Discuss Your Project** (anchors to /contact).
2. **Positioning** — "We Help Industry Perform Better" + the three-part positioning line.
3. **At a Glance** metrics ribbon — 20+ Years · 5 Core Engineering Disciplines ·
   100% Independent Engineering · International (CH/EU/GCC/ME & Africa).
4. **Services grid** — 6 cards, lucide line icons, signal-blue hover borders → detail pages.
5. **Engineering Process** — Discover → Engineer → Integrate → Deliver → Support timeline.
6. **Technology platform wall** — 11 monochrome vendor logos.
7. **Industries** — 13 sectors grid.
8. **Why Swiss Controls** — 6 differentiators.
9. **Final CTA** — "Let's Build the Future Together" → Contact.
10. **Footer**.

### 6.2 Services overview (`/services`)
Page header + 6 service cards (icon, title, one-line summary, item count) → detail pages.

### 6.3 Service detail (`/services/[slug]`)
Page header (service name + intro paragraph from copy) · numbered catalog list
(service-detail-catalog block) · mid-page CTA · related services.

### 6.4 About (`/about`)
"Engineering Beyond Integration" narrative · brand/RIGITRADE relationship · vendor
independence · Swiss values (5) · Why clients trust us (20+ years, vendor experience) ·
Our Values (4) · industries-served summary · CTA.

### 6.5 Industries (`/industries`)
13 industries grid + "Who we work with" (9 client types) + CTA.

### 6.6 Contact (`/contact`)
Formspree form (name, company, email, project type, message) → info@swiss-controls.com ·
HQ block: Schaffhauserstrasse 550, 8052 Zürich, Switzerland · +41 76 366 66 69 ·
info@swiss-controls.com · optional embedded map.

---

## 7. Components

**Reuse as-is** (from rigitrade_fe): all primitives (container, section, stack, cluster,
hairline, responsive-image), button, link-button, vertical-rail, page-header,
metrics ribbon (trust-strip), final-cta, mid-page-cta.

**Adapt:** hero (new headline/labels), services grid (from core-capabilities),
industries grid (from industry-tiles).

**New (4):**
- `process-timeline` — 5-step Discover→…→Support (horizontal chevron / vertical timeline).
- `technology-wall` — monochrome vendor logo grid/ticker.
- `service-detail-catalog` — numbered service list for detail pages.
- `why-choose` — 6-differentiator grid.

Each new component: single clear purpose, typed props, driven by content (MDX/JSON),
independently testable. Follows existing block conventions (`"use client"` only when motion
is needed; content passed as typed props).

---

## 8. Content & i18n
- Content in MDX under `content/en/…` (mirrors Rigitrade structure), plus structured JSON
  for repetitive lists (services, industries, technologies) where a schema fits better than prose.
- `messages/en.json` for UI strings. `de.json` kept as a stub for later.
- `next-intl` config: locales `['en']`, default `en` at launch.

---

## 9. Assets
- **Vendor logos (11):** clean monochrome text-lockup placeholders at launch; swap for real
  SVGs when provided. Rendered in a neutral gray, no color.
- **Hero / imagery:** abstract technical treatment (blueprint/OT-network motif) as placeholder;
  swap for licensed control-room/plant photography when provided.
- **Icons:** lucide-react (already a dependency) — line icons per wireframe tip.
- **Favicon / logo lockup:** simple "SWISS CONTROLS" wordmark treatment.

---

## 10. Contact / config
- HQ: Schaffhauserstrasse 550, 8052 Zürich, Switzerland
- Tel: +41 76 366 66 69 · Email: info@swiss-controls.com · Web: www.swiss-controls.com
- Formspree endpoint via env var (`.env.example` documents it).
- Pre-launch checklist (client): professional MX + SPF/DKIM/DMARC for info@; domain
  redirects — noted for handoff, out of scope for the build itself.

---

## 11. Quality bar
- Lighthouse: performance/SEO/a11y green; fast hero (no empty flash — a competitor weakness).
- Accessibility: axe checks pass; keyboard nav; `prefers-reduced-motion` honored; alt text.
- SEO: per-page metadata, sitemap, structured data for Organization.
- Tests: Vitest unit for content loaders/schema; Playwright smoke + visual snapshots.
- Type-check + lint clean (`tsc --noEmit`, eslint max-warnings 0).

---

## 12. Open items / deferred
- German & Arabic content (structure ready; content later).
- Real vendor logos and photography (placeholders until provided).
- Projects / case studies (when content exists).
- Embedded map on contact (optional; nice-to-have).
