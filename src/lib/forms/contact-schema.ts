import { z } from "zod"

export const CONTACT_REASONS = [
  "general",
  "automation",
  "electrical",
  "digital",
  "ai_monitoring",
  "energy",
  "consulting",
  "other",
] as const

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  reason: z.enum(CONTACT_REASONS),
  message: z.string().min(10, "Please write at least a few sentences"),
  website: z.string().max(0, "Bot detected").optional(),
  consent: z.literal(true, { message: "Consent is required" }),
})

export type ContactFormData = z.infer<typeof contactSchema>
