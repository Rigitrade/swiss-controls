import { z } from "zod"

export const MATERIALS = [
  "inconel-625",
  "inconel-718",
  "hastelloy-c276",
  "duplex-2205",
  "super-duplex-2507",
  "monel-400",
  "other",
] as const

export const CERTIFICATIONS = [
  "en-10204-3-1",
  "en-10204-3-2",
  "nace-mr0175",
  "ped-2014-68-eu",
  "norsok",
  "other",
] as const

export const INDUSTRIES = [
  "aerospace",
  "oil-gas",
  "chemical",
  "power",
  "marine",
  "other",
] as const

export const QUANTITY_UNITS = ["kg", "tonnes", "pieces", "metres"] as const

export const quoteSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  contactName: z.string().min(1, "Contact name is required"),
  email: z.string().email("Please enter a valid business email"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  industry: z.enum(INDUSTRIES).optional(),
  materials: z.array(z.enum(MATERIALS)).min(1, "Select at least one material"),
  grade: z.string().optional(),
  quantity: z.coerce.number().min(0.01, "Enter a quantity greater than 0"),
  quantityUnit: z.enum(QUANTITY_UNITS),
  dimensions: z.string().optional(),
  environment: z.string().optional(),
  certifications: z.array(z.enum(CERTIFICATIONS)).optional(),
  deliveryDate: z.string().optional(),
  details: z.string().optional(),
  website: z.string().max(0, "Bot detected").optional(),
  consent: z.literal(true, { message: "Consent is required" }),
})

export type QuoteFormData = z.infer<typeof quoteSchema>
