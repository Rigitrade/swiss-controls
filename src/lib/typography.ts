// Canonical treatment for a page's main title (the H1 in a page header / legal
// header): uppercase, wide tracking, tight leading. Bold comes from the
// DisplayHeading component itself. Shared so every page title matches exactly.
//
// Lives in a plain (non-"use client") module on purpose: it is imported by
// Server Components (PageHeader, LegalPage), and a non-component value exported
// from a "use client" module resolves to `undefined` across the RSC boundary.
export const PAGE_TITLE_CLASS =
  "text-[clamp(1.32rem,2.63vw,1.97rem)] uppercase leading-[1.05] tracking-[0.12em]"
