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
  wordmark: z.string(),         // "SWISS CONTROLS"
  headline: z.string(),         // accessible H1 text (also the reduced-motion fallback)
  // Big words cycled in/out as the hero's animated focal point.
  rotatingWords: z.array(z.string()).min(1).optional(),
  subheadline: z.string(),
  positioning: z.string(),      // the three-part positioning line
  primaryCta: ctaSchema,
})

const metricSchema = z.object({
  value: z.string(),            // "100+", "30+", "End-to-End"
  suffix: z.string().optional(),
  label: z.string(),
})

const whyItemSchema = z.object({ title: z.string(), detail: z.string() })

const deliveryStepSchema = z.object({
  step: z.string(),             // "Discover"
  detail: z.string(),
})

const pillarSchema = z.object({ title: z.string(), detail: z.string() })

const industryGroupSchema = z.object({
  category: z.string(),
  items: z.array(z.string()).min(1),
})

export const homeSchema = z.object({
  hero: heroSchema,
  purpose: z.object({ heading: z.string(), body: z.string() }),
  services: z.object({
    number: z.string(),
    label: z.string(),
    items: z
      .array(
        z.object({
          title: z.string(),
          summary: z.string(),
          points: z.array(z.string()).min(1),
          image: z.string().optional(),
        }),
      )
      .length(4),
  }),
  metrics: z.object({
    number: z.string(),
    label: z.string(),
    items: z.array(metricSchema).length(4),
  }),
  whyPartner: z.object({
    number: z.string(),
    label: z.string(),
    items: z.array(whyItemSchema).min(1),
  }),
  deliveryFramework: z.object({
    number: z.string(),
    label: z.string(),
    steps: z.array(deliveryStepSchema).min(1),
  }),
  partners: z.object({
    number: z.string(),
    label: z.string(),
    statement: z.string(),
    cta: ctaSchema,
    items: z.array(z.object({ name: z.string(), logo: z.string() })).min(1),
  }),
})

export const solutionsIndexSchema = z.object({
  pageHeader: pageHeaderSchema,
})

export const solutionDetailSchema = z.object({
  pageHeader: pageHeaderSchema,
  challenge: z.string(),
  approach: z.string(),
  capabilities: z.array(z.string()).min(1),
})

export const whoWeAreSchema = z.object({
  pageHeader: pageHeaderSchema,
  narrative: z.array(z.string()).min(1),
  pillars: z.array(pillarSchema).min(1),
  industries: z.array(industryGroupSchema).min(1),
  executiveLeadership: z.array(z.string()).min(1),
  mission: z.string(),
  vision: z.string(),
})

export const technologySchema = z.object({
  pageHeader: pageHeaderSchema,
  coreTechnologies: z
    .array(
      z.object({
        group: z.string(),
        subtitle: z.string(),
        image: z.string(),
        items: z.array(z.string()).min(1),
      }),
    )
    .min(1),
  openEcosystem: z.object({
    heading: z.string(),
    body: z.string(),
  }),
})

export const contactPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  office: z.object({
    address: z.string(),
    phone: z.string(),
    email: z.string().email(),
  }),
  regions: z.array(z.string()).min(1),
})

export const privacyPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  lastUpdated: z.string(),
})

export const navSchema = z.object({
  links: z.array(z.object({ label: z.string(), href: z.string() })),
  cta: ctaSchema.optional(),
})

export const footerSchema = z.object({
  tagline: z.string(),
  technologyTag: z.string(),
  parentLine: z.string().optional(),
  office: z.object({
    label: z.string().optional(),
    company: z.string(),
    address: z.string(),
    mapUrl: z.string().url().optional(),
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    website: z.string().optional(),
  }),
  registry: z
    .object({ label: z.string(), value: z.string(), url: z.string().url().optional() })
    .optional(),
  locations: z
    .array(z.object({ name: z.string(), mapUrl: z.string().url().optional() }))
    .optional(),
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
export type SolutionsIndexContent = z.infer<typeof solutionsIndexSchema>
export type SolutionDetailContent = z.infer<typeof solutionDetailSchema>
export type WhoWeAreContent = z.infer<typeof whoWeAreSchema>
export type TechnologyContent = z.infer<typeof technologySchema>
export type ContactPageContent = z.infer<typeof contactPageSchema>
export type PrivacyPageContent = z.infer<typeof privacyPageSchema>
export type NavContent = z.infer<typeof navSchema>
export type FooterContent = z.infer<typeof footerSchema>
