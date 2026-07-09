# Swiss Controls Website — v2 Content Repositioning Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`).

**Goal:** Rework the site to the updated content doc (`Website_Contet_Swiss_Controls_v1.pdf`, 2026-07-09): a strategic-advisory repositioning with a Solutions model (4), new nav, new pages, and new copy — reusing the existing Next.js/Tailwind/block system.

**Architecture:** Same static-export Next.js 16 stack, theme, i18n, and block conventions from v1. Content stays MDX-frontmatter + zod. This plan replaces the content model (Services→Solutions), nav/IA, home, and page set; most blocks are adaptations of existing ones.

**Tech Stack:** unchanged from v1 (see prior plan).

## Global Constraints

- Branch: continue on `feat/website-build`. v1 commits remain in history.
- The updated content doc governs. Copy must be used VERBATIM (headlines, challenge/approach text, capability names, metrics, pillar text, industries, platform lists, mission/vision, contact).
- **Nav (exact, in order):** Solutions (`/solutions`) · Who We Are (`/who-we-are`) · Technology Expertise (`/technology`) · Contact (`/contact`). Header CTA: **"Partner With Us"** → `/contact`.
- **Hero:** headline "Engineering Leadership. Swiss Precision. Industrial Transformation."; subheadline + strategic-positioning from doc; CTA "Partner With Us".
- **Home metrics (4, verbatim):** "100+ Years Combined Engineering Leadership" · "30+ Countries Served" · "20+ Industry Sectors Supported" · "End-to-End Industrial Asset Lifecycle".
- **4 Solution slugs (exact):** `operational-modernization`, `energy-transition`, `industrial-digitalization`, `capital-investment`.
- **Delivery Framework = 8 steps:** Discover · Assess · Design · Engineer · Validate · Commission · Optimize · Support.
- **Contact:** Head Office Schaffhauserstrasse 550, 8052 Zürich; Regional Operations: Switzerland · Dubai · Cairo · Saudi Arabia; +41 76 366 66 69; info@swiss-controls.com.
- **Remove** v1-only routes: `/services`, `/services/[slug]`, `/industries`, `/about`. Keep `/privacy`, `/imprint`.
- Quality gates unchanged: `npm run type-check`, `npm run build`, `npm test`, `npm run test:e2e` all pass; commit per task.
- Reuse existing blocks/primitives; keep the `cn.ts` twMerge fix from v1 Task 4.3.

## Solution content (verbatim)

**operational-modernization — Operational Modernization & Asset Lifecycle** (icon `RefreshCw`)
- Challenge: "Our critical infrastructure is aging, down-time risks are increasing, and we need to extend asset life without a total, costly rebuild."
- Approach: "We bridge the gap between legacy systems and modern efficiency. Instead of prescribing blanket replacements, we technically audit your existing footprint to systematically upgrade, retrofit, and migrate critical components—maximizing cumulative ROI and ensuring operational continuity."
- Capabilities: Plant Modernization & Automation Migration · Retrofit Engineering & Electrical Upgrades · Lifecycle Extension & Asset Optimization · Reliability Improvement & Performance Audits · Condition Assessment & Safety System Upgrades

**energy-transition — Energy Transition & Infrastructure Reliability** (icon `Zap`)
- Challenge: "We must reduce carbon footprints, lower soaring energy expenditures, and guarantee absolute power quality for mission-critical facilities."
- Approach: "True energy optimization requires a precise grasp of industrial power dynamics. We design robust electrical infrastructure, analyze power distribution networks, and implement intelligent drive technologies that radically drive down energy utilization while shielding your assets from power instability."
- Capabilities: Energy Transition Consulting & Energy Management · Industrial Power Distribution (Low Voltage & Medium Voltage Systems) · MCC & PCC Engineering & Protection Systems · Arc Flash Studies & Power Quality Analysis · Industrial Electrification & Hydrogen Technologies · Variable Frequency Drives (VFD) & Motion Control Optimization

**industrial-digitalization — Industrial Digitalization & Industry 4.0** (icon `Cpu`)
- Challenge: "We are burdened by fragmented, multi-vendor automation systems and siloed data that block real-time visibility and predictive operations."
- Approach: "We engineer intelligent industrial environments. By integrating multi-vendor ecosystems and embedding advanced Industrial IoT frameworks, we transform raw field data into actionable operational intelligence—enabling predictive maintenance and streamlined, autonomous processes."
- Capabilities: Digital Transformation Strategy & AI-Enabled Analytics · PLC, DCS, and SCADA Systems Engineering · HMI Development & Industrial Communication Networks · Process & Machine Automation · Industrial IoT & Remote Monitoring Systems · Predictive Maintenance Frameworks & Digital Manufacturing

**capital-investment — Capital Investment & Strategic Advisory** (icon `DraftingCompass`)
- Challenge: "We are planning a high-stakes industrial facility layout, expansion, or asset acquisition, and we require independent technical validation before committing capital."
- Approach: "We serve as your independent technical conscience. Free from vendor alignment, our executive multidisciplinary team conducts rigorous technical due diligence, master planning, and front-end engineering design to completely derisk your investments before capital deployment begins."
- Capabilities: Front-End Engineering Design (FEED) · Technical Due Diligence & Feasibility Studies · Owner's Engineering & Master Planning · Technology Assessment & Vendor Evaluation · Asset Performance Assessment & Risk Mitigation

## Other content (verbatim)

**Home > Why Driven Organizations Partner (4):**
- Executive Engineering Leadership — "Industrial expertise developed across global engineering organizations, infrastructure projects, and strategic industrial programs."
- Independent Engineering — "Vendor-neutral recommendations focused exclusively on technical suitability, operational requirements, and long-term performance."
- Swiss Engineering Standards — "Precision, transparency, reliability, and disciplined project governance woven into every phase of execution."
- Regional Execution Power — "Direct engineering expertise and boots-on-the-ground presence located in Switzerland, Dubai, Cairo, and Saudi Arabia."

**Home > Engineering with Purpose:** "We believe successful industrial projects begin long before equipment is selected. They begin with sound engineering decisions. Every solution we develop is driven by technical excellence, operational reliability, lifecycle value, and measurable business outcomes."

**Delivery Framework (8, step + detail):**
- Discover — "Understand business objectives, operational challenges, and project requirements."
- Assess — "Evaluate existing assets, risks, constraints, and opportunities."
- Design — "Develop independent engineering concepts and solution architectures."
- Engineer — "Produce detailed multidisciplinary engineering, software, and electrical designs."
- Validate — "Verify compliance, functionality, quality, and operational readiness through reviews and testing."
- Commission — "Support installation, FAT, SAT, startup, and performance verification."
- Optimize — "Improve performance, energy efficiency, reliability, and operational intelligence."
- Support — "Provide lifecycle engineering, modernization, troubleshooting, and continuous improvement."

**Who We Are narrative:** heading "More Than Engineers. Trusted Industrial Advisors."; body paragraphs from doc pages 4–5 (founder narrative + Swiss values culture).

**Foundational Pillars (5, title + detail):** Precision · Independence · Reliability · Innovation · Partnership (detail text from doc page 5).

**Industries (5 groups, category + items):**
- Energy & Utilities: Power Generation, Renewables, Utilities, Oil & Gas, Hydrogen
- Process Industries: Chemical, Petrochemical, Water, Wastewater, Food & Beverage, Pharmaceutical
- Heavy Industry: Mining, Steel, Cement, Metal Processing
- Logistics & Infrastructure: Ports, Marine, Transportation, Airports, Railways, Data Centres, Smart Infrastructure
- Manufacturing: Automotive, Machine Builders, OEMs, Packaging, Industrial Equipment

**Executive Leadership (narrative):** doc page 6 — 100+ years combined; leadership roles at Schneider Electric, ABB, Siemens; bridges engineering/operations/digital/commercial.

**Mission & Vision:** Vision + Mission statements (doc page 7).

**Technology Expertise:** flow ["Automation","Power","Motion","Industrial Software","Networks","Digital"]; categories:
- Automation Platforms: PLC, SCADA, DCS, RTU, HMI, Industrial IoT
- Motion & Drives: VFD, VSD, Servo, Motion Control, Soft Starters
- Industrial Communication Networks: PROFINET, PROFIBUS, EtherNet/IP, EtherCAT, Modbus, OPC UA, Industrial Ethernet
- Electrical Infrastructure: LV Systems, MV Systems, Switchgear, Protection Relays, Power Distribution, Energy Management

**Commissioning & Lifecycle Quality:** heading "Precision Is Our Standard"; body (doc page 6); items: Factory Acceptance Testing (FAT) & Site Acceptance Testing (SAT) · Commissioning & Startup Assistance · Operator Training & Technical Knowledge Transfer · Troubleshooting & Long-Term Technical Lifecycle Support.

**Contact:** heading "Let's Engineer the Future Together"; body (doc page 7); office Schaffhauserstrasse 550 / 8052 Zürich; regions Switzerland·Dubai·Cairo·Saudi Arabia; +41 76 366 66 69; info@swiss-controls.com.

---

## Tasks

### Task V1: Replace content schemas (TDD)
**Files:** Modify `src/lib/content/schema.ts`; Test `src/lib/content/schema.test.ts` (rewrite).
Replace v1 page schemas with:
- `homeSchema`: `hero{eyebrow,wordmark,headline,subheadline,positioning,primaryCta}`, `purpose{heading,body}`, `metrics{number,label,items[4]{value,suffix?,label}}`, `whyPartner{number,label,items[]{title,detail}}`, `deliveryFramework{number,label,steps[]{step,detail}}`.
- `solutionsIndexSchema`: `{pageHeader}`.
- `solutionDetailSchema`: `{pageHeader, challenge, approach, capabilities:string[].min(1)}`.
- `whoWeAreSchema`: `{pageHeader, narrative:string[], pillars[]{title,detail}, industries[]{category,items:string[]}, executiveLeadership:string[], mission:string, vision:string}`.
- `technologySchema`: `{pageHeader, flow:string[], categories[]{category,items:string[]}, commissioning{heading,body,items:string[]}}`.
- `contactPageSchema`: `{pageHeader, office{address,phone,email}, regions:string[]}`.
- Keep `privacyPageSchema`, `navSchema`, `footerSchema` (footer unchanged), `imageSchema`, `ctaSchema`.
Export matching types. Write failing tests first (assert home requires the 5 sections; solutionDetail requires non-empty capabilities; whoWeAre requires pillars+industries), then implement. Downstream type errors expected. Commit `feat: v2 content schemas`.

### Task V2: Solutions registry + loader (TDD)
**Files:** Create `src/lib/content/solutions.ts`; Modify `src/lib/content/load.ts` (PageSlug); delete `src/lib/content/services.ts` + its test; Test `src/lib/content/solutions.test.ts`.
`SOLUTIONS: {slug,title,icon,summary}[]` (4, order above), `SOLUTION_SLUGS`, `getSolution(slug)`. Summaries: one-line each derived from the Approach (keep ≤160 chars). PageSlug set: `home`, `solutions/index`, `who-we-are`, `technology`, `contact`, `privacy`, `imprint`. Remove all `services`-related references. Failing test asserts the 4 slugs in order + getSolution. Commit `feat: solutions registry`.

### Task V3: Author all v2 content
**Files:** rewrite `content/en/home.mdx`, `shared/nav.mdx`, `shared/footer.mdx`, `contact.mdx`; create `content/en/solutions/index.mdx` + 4 solution files, `content/en/who-we-are.mdx`, `content/en/technology.mdx`; delete `content/en/services/` dir, `content/en/industries.mdx`, `content/en/about.mdx`; update `src/lib/content/content.test.ts` to load the v2 set (home, solutions/index, 4 solutions, who-we-are, technology, contact, privacy, imprint, nav, footer). Use verbatim copy from this plan's content sections. nav links = Solutions/Who We Are/Technology Expertise/Contact; cta "Partner With Us"→/contact. footer tagline can become the new positioning line; technologyTag "AN ENGINEERING BRAND OF RIGITRADE AG". Failing content test → author → green. Commit `feat: author v2 content`.

### Task V4: Hero (adapt)
**Files:** `src/components/blocks/hero.tsx` + test.
Adapt to `homeSchema["hero"]` new shape: render wordmark (SWISS CONTROLS), eyebrow (brand line), headline (the 3-part leadership line), subheadline (paragraph), positioning line, single CTA "Partner With Us". Keep motion + tokens. Update test to assert headline + CTA `/en/contact`. Commit `feat: v2 hero`.

### Task V5: SolutionsGrid (adapt ServicesGrid → new file)
**Files:** Create `src/components/blocks/solutions-grid.tsx` (+ test); it may replace `services-grid.tsx` — delete services-grid + its test.
2×2 (or responsive) card grid, icons via typed lucide map `{RefreshCw,Zap,Cpu,DraftingCompass,ArrowUpRight}`, each card links `/${locale}/solutions/${slug}`. Consumes `{number,label,items:{slug,icon,title,summary}[]}`. Test asserts a card href `/en/solutions/operational-modernization`. Commit `feat: solutions grid`.

### Task V6: DeliveryFramework (adapt ProcessTimeline for 8 steps)
**Files:** Create `src/components/blocks/delivery-framework.tsx` (+ test); delete `process-timeline.tsx` + test.
Dark section, renders 8 numbered steps in a responsive grid (`grid-cols-2 md:grid-cols-4` → 2 rows of 4), volt index + signal rule, step + detail. Consumes `homeSchema["deliveryFramework"]`. Test asserts "Discover" and "Support" render and all 8 present. Commit `feat: delivery framework`.

### Task V7: SolutionDetail (adapt ServiceDetailCatalog)
**Files:** Create `src/components/blocks/solution-detail.tsx` (+ test); delete `service-detail-catalog.tsx` + test.
Renders Challenge (labelled aside/callout), Approach (prose), and a numbered "Core Capabilities Engineered" list (two-column). Props `{challenge,approach,capabilities:string[]}`. Test asserts a capability + the approach text render. Commit `feat: solution detail block`.

### Task V8: IndustriesGroups (adapt IndustriesGrid → grouped)
**Files:** Create `src/components/blocks/industries-groups.tsx` (+ test); delete `industries-grid.tsx` + test.
Renders 5 category blocks, each with a heading + its item chips/list. Props `{number,label,intro,groups:{category,items:string[]}[]}`. Test asserts a category ("Energy & Utilities") and an item ("Hydrogen") render. Commit `feat: industries groups`.

### Task V9: TechnologyPlatforms (adapt TechnologyWall)
**Files:** Create `src/components/blocks/technology-platforms.tsx` (+ test); delete `technology-wall.tsx` + test.
Renders the flow strip (Automation→…→Digital) + 4 platform category blocks (category heading + item list). Props `{number,label,flow:string[],categories:{category,items:string[]}[]}`. Test asserts a category ("Automation Platforms") + an item ("OPC UA"). Commit `feat: technology platforms`.
(WhyChoose and AtAGlance are reused unchanged; the "End-to-End" metric renders via AtAGlance's text branch. No block change.)

### Task V10: Home page (rewrite)
**Files:** `src/app/[locale]/page.tsx`.
Compose: Hero · intro Section (Engineering with Purpose) · AtAGlance (metrics) · WhyChoose (Why Partner, 4) · DeliveryFramework (8). Load `home` via `homeSchema`. metadata title = "Engineering Leadership. Swiss Precision. Industrial Transformation." type-check + build; `/en` generates. Commit `feat: v2 home`.

### Task V11: Solutions overview + detail route
**Files:** Create `src/app/[locale]/solutions/page.tsx` and `src/app/[locale]/solutions/[slug]/page.tsx`; delete `src/app/[locale]/services/` dir.
Overview: PageHeader + SolutionsGrid from `SOLUTIONS`. Detail: `generateStaticParams` over locales×SOLUTION_SLUGS, `generateMetadata` via getSolution, notFound guard, loads `solutions/${slug}` via `solutionDetailSchema`, renders PageHeader + SolutionDetail + MidPageCta(text "Discuss this solution with our engineers", href `/${locale}/contact`). Build generates 4 solution routes. Commit `feat: solutions pages`.

### Task V12: Who We Are page
**Files:** Create `src/app/[locale]/who-we-are/page.tsx`; delete `src/app/[locale]/about/` dir.
Loads `who-we-are` via `whoWeAreSchema`. Renders PageHeader + narrative Section + WhyChoose(Foundational Pillars, 5) + IndustriesGroups + an Executive Leadership prose Section + a Mission/Vision Section (two callouts). type-check + build; `/en/who-we-are` generates. Commit `feat: who we are page`.

### Task V13: Technology Expertise page
**Files:** Create `src/app/[locale]/technology/page.tsx`.
Loads `technology` via `technologySchema`. Renders PageHeader + TechnologyPlatforms + a Commissioning & Lifecycle Quality Section (heading/body + items list, reuse WhyChoose or a simple list). `/en/technology` generates. Commit `feat: technology expertise page`.

### Task V14: Contact page (update) + nav/footer already in V3
**Files:** `src/app/[locale]/contact/page.tsx`.
Update heading "Let's Engineer the Future Together"; office block + a Regional Operations line (regions joined) + ContactForm. Loads `contact` via updated `contactPageSchema`. `/en/contact` generates. Commit `feat: v2 contact page`.

### Task V15: Cleanup, tests, verification
**Files:** `tests/e2e/smoke.spec.ts`; `messages/en.json` (drop dead keys); any stale refs.
- Update smoke test route list to v2: `/en/`, `/en/solutions/`, `/en/solutions/{operational-modernization,energy-transition,industrial-digitalization,capital-investment}/`, `/en/who-we-are/`, `/en/technology/`, `/en/contact/`, `/en/privacy/`, `/en/imprint/`. Keep axe scan on `/en/`.
- Grep for any lingering `/services`, `/industries`, `/about`, `serviceDetailSchema`, `SERVICES` references and remove.
- Full gate: `npm run type-check`, `npm test`, `npm run build`, `npm run test:e2e` all pass; fix any serious/critical axe violations. Commit `test: v2 routes, verification gate`.

## Self-review — coverage
- Nav/IA (Solutions/Who We Are/Technology/Contact) → V2 (nav), V3 (content), V11/V12/V13/V14 (pages). ✅
- 4 Solutions w/ Challenge/Approach/Capabilities → V1 schema, V3 content, V7 block, V11 pages. ✅
- Home (hero/metrics/purpose/why/8-step) → V1, V3, V4, V6, V10. ✅
- Who We Are (narrative/pillars/industries/exec/mission-vision) → V1, V3, V8, V12. ✅
- Technology Expertise (+commissioning) → V1, V3, V9, V13. ✅
- Contact (regions) → V1, V3, V14. ✅
- Remove services/industries/about → V2, V3, V11, V12. ✅
- Verify → V15. ✅
Reused unchanged: AtAGlance, WhyChoose, PageHeader, MidPageCta, FinalCta(optional), primitives, cn.ts fix.
