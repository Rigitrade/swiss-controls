import { z } from "zod"

export const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1, "Alt text is required for accessibility"),
})

export const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
})

const heroSchema = z.object({
  number: z.string(),
  label: z.string(),
  headline: z.string(),
  subhead: z.string(),
  body: z.string(),
  banner: z.string().optional(),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  image: imageSchema,
})

const strategicValueSchema = z.object({
  number: z.string(),
  label: z.string(),
  headline: z.string(),
  intro: z.string(),
  drivers: z.array(z.string()).min(1),
  body: z.string(),
})

const capabilityItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  detail: z.string().optional(),
  image: imageSchema.optional(),
})

const capabilitiesSchema = z.object({
  number: z.string(),
  label: z.string(),
  items: z.array(capabilityItemSchema).min(1),
  standards: z.string(),
})

const alloyFamilySchema = z.object({
  name: z.string(),
  alloys: z.array(z.string()).min(1),
  benefit: z.string(),
})

const metallurgyAuthoritySchema = z.object({
  number: z.string(),
  label: z.string(),
  families: z.array(alloyFamilySchema).min(1),
})

const manufacturingSchema = z.object({
  number: z.string(),
  label: z.string(),
  aod: z.object({
    title: z.string(),
    bullets: z.array(z.string()).min(1),
    benefit: z.string(),
  }),
  route: z.object({
    title: z.string(),
    steps: z
      .array(
        z.object({
          code: z.string(),
          name: z.string(),
          detail: z.string(),
        }),
      )
      .min(1),
    benefits: z.array(z.string()).min(1),
  }),
})

const capacityBlockSchema = z.object({
  title: z.string(),
  bullets: z.array(z.string()).min(1),
})

const capacityStatSchema = z.object({
  value: z.string(),
  unit: z.string(),
  label: z.string(),
})

const productionCapacitySchema = z.object({
  number: z.string(),
  label: z.string(),
  stats: z.array(capacityStatSchema).min(1),
  context: z.array(capacityBlockSchema).min(1),
})

const applicationsSchema = z.object({
  number: z.string(),
  label: z.string(),
  intro: z.string(),
  industries: z.array(z.string()).min(1),
})

const finalCtaSchema = z.object({
  headline: z.string(),
  body: z.string().optional(),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
})

export const homeSchema = z.object({
  hero: heroSchema,
  strategicValue: strategicValueSchema,
  capabilities: capabilitiesSchema,
  metallurgy: metallurgyAuthoritySchema,
  manufacturing: manufacturingSchema,
  productionCapacity: productionCapacitySchema,
  applications: applicationsSchema,
  finalCta: finalCtaSchema,
})

const pageHeaderSchema = z.object({
  number: z.string(),
  label: z.string(),
  title: z.string(),
  intro: z.string(),
})

export const capabilitiesPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  sections: z
    .array(
      z.object({
        number: z.string(),
        title: z.string(),
        spec: z.string(),
        body: z.string(),
        image: imageSchema,
      }),
    )
    .min(1),
})

const alloyDetailSchema = z.object({
  name: z.string(),
  family: z.string(),
  maxTemp: z.string(),
  corrosionRating: z.string(),
  tensileStrength: z.string(),
  keyApplications: z.array(z.string()).min(1),
})

export const materialsPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  comparisonNote: z.string(),
  alloys: z.array(alloyDetailSchema).min(1),
  selectionGuidance: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    }),
  ),
})

export const aboutPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  heritage: z.object({
    title: z.string(),
    body: z.string(),
  }),
  stats: z
    .array(
      z.object({
        value: z.string(),
        unit: z.string(),
        label: z.string(),
      }),
    )
    .min(1),
  facilities: z.array(
    z.object({
      location: z.string(),
      role: z.string(),
      detail: z.string().optional(),
      image: imageSchema,
    }),
  ),
  timeline: z.array(
    z.object({
      milestone: z.string(),
      date: z.string(),
      detail: z.string().optional(),
    }),
  ),
})

export const contactPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  office: z.object({
    address: z.string(),
    phone: z.string(),
    email: z.string().email(),
    hours: z.string(),
  }),
})

export const privacyPageSchema = z.object({
  pageHeader: pageHeaderSchema,
  lastUpdated: z.string(),
})

export const navSchema = z.object({
  links: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    }),
  ),
  cta: ctaSchema,
})

export const footerSchema = z.object({
  tagline: z.string(),
  technologyTag: z.string(),
  office: z.object({
    label: z.string().optional(),
    company: z.string(),
    address: z.string(),
    cheNumber: z.string().optional(),
  }),
  branchOffice: z
    .object({
      label: z.string(),
      address: z.string(),
    })
    .optional(),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
  }),
  legal: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    }),
  ),
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
export type CapabilitiesPageContent = z.infer<typeof capabilitiesPageSchema>
export type MaterialsPageContent = z.infer<typeof materialsPageSchema>
export type AboutPageContent = z.infer<typeof aboutPageSchema>
export type ContactPageContent = z.infer<typeof contactPageSchema>
export type PrivacyPageContent = z.infer<typeof privacyPageSchema>
export type NavContent = z.infer<typeof navSchema>
export type FooterContent = z.infer<typeof footerSchema>
