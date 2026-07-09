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
