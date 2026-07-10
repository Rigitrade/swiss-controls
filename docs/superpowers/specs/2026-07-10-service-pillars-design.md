# OUR SERVICES — Four Business-Unit Pillars (home page)

**Date:** 2026-07-10
**Status:** Approved (client), building on `feat/service-pillars`

## Goal

Add a prominent "OUR SERVICES" section to the home page presenting the four
business-unit pillars as a full-bleed-feeling band of blocks. Each block shows a
large pillar title by default; on hover/focus it reveals a short explanation and
four capability points. Inspired by the full-width block band on primaswiss.com.

## Placement & numbering

Inserted directly after the "Engineering with Purpose" intro band, **before**
OUR SOLUTIONS — these pillars are the core offering (named in the hero line), so
they take the first numbered slot. Section numbers shift:

| Section | Old | New |
|---|---|---|
| OUR SERVICES (new) | — | 01 |
| OUR SOLUTIONS | 01 | 02 |
| AT A GLANCE | 02 | 03 |
| WHY … PARTNER | 03 | 04 |
| DELIVERY FRAMEWORK | 04 | 05 |
| PLATFORM FLUENCY | 05 | 06 |

## Layout & interaction

- Contained to the site's `Container` (matches the mockup's side margins and the
  site's rhythm — not a hard edge-to-edge breakout).
- `paper` (white) section surface; blocks are `stone` (light gray) so the gutters
  read white, matching the mockup.
- **2×2 grid** on desktop (`md:grid-cols-2`), single column stacked on mobile.
- Each block is tall (`min-h` ~20–22rem desktop) so the 2×2 band fills most of a
  viewport height.
- A solid **red bar across the top** of every block (persistent in both states).

### Reveal (pure CSS — static-export safe, no JS)

Two stacked faces, crossfaded:

- **Default face** (`aria-hidden`): `bg-stone`, large centered pillar title in
  muted gray (`text-mute`), uppercase, wide tracking.
- **Reveal face**: `bg-ink` (dark), fades + slides up on hover; contains the
  pillar title (light, smaller), the one-line explanation, and the four points in
  a 2-column grid.

State handling:
- Hover-capable devices: default face shown, reveal hidden; swap on
  `group-hover` / `group-focus-within`.
- No-hover devices (`[@media(hover:none)]`): reveal face shown by default so phone
  users see everything — nothing is hidden behind an unavailable hover.
- The block is `tabIndex={0}` with `aria-labelledby` → reveal title, so keyboard
  users focus it and trigger the reveal. Global `*:focus-visible` supplies the red
  outline. Reveal content is always in the DOM (opacity only), so screen readers
  read the full content regardless of state; the decorative default face is
  `aria-hidden`.
- Reduced motion: global rule already collapses transition durations; the reveal
  still works, just without animation.

## Content (client-approved draft)

| Pillar | Explanation | Points |
|---|---|---|
| AUTOMATION | Control systems engineered for uptime — from field instrumentation to plant-wide supervisory control. | PLC Systems · DCS Systems · SCADA Systems · Control Panels |
| ELECTRIFICATION | Robust power and drive infrastructure that cuts energy cost and guarantees power quality. | Power Distribution · Motor Control & Drives · Switchgear & Protection · Energy Management |
| DIGITAL TRANSFORMATION | Turning multi-vendor field data into a single, actionable view of your operation. | Industrial IoT · Data & Analytics · Industry 4.0 / MES · OT Cybersecurity |
| AI CONDITION MONITORING | Predictive intelligence that watches critical assets in real time — catching failures before downtime. | Predictive Maintenance · Anomaly Detection · Asset Health Monitoring · Real-Time Analytics |

## Files

- `src/lib/content/schema.ts` — add `services` to `homeSchema`.
- `content/en/home.mdx` — add `services:` block; renumber `metrics`, `whyPartner`,
  `deliveryFramework`, `partners`.
- `src/components/blocks/service-pillars.tsx` — new block component.
- `src/components/blocks/service-pillars.test.tsx` — render test.
- `src/app/[locale]/page.tsx` — wire in `ServicePillars` after the purpose band;
  bump `SolutionsGrid` number to `02`.
