"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { Hairline } from "@/components/primitives/hairline"
import { contactSchema, CONTACT_REASONS, type ContactFormData } from "@/lib/forms/contact-schema"

const REASON_LABELS: Record<(typeof CONTACT_REASONS)[number], string> = {
  general: "General Inquiry",
  automation: "Automation & Control Systems",
  electrical: "Electrical & Electrification",
  digital: "Digital Transformation & Industry 4.0",
  ai_monitoring: "AI Condition Monitoring & AI-PdM",
  energy: "Energy, Marine & Industrial",
  consulting: "Process Optimization & Consulting",
  other: "Other",
}

const inputClass =
  "flex h-12 w-full border-b border-hairline bg-transparent px-0 py-2 font-sans text-body text-ink placeholder:text-ink/40 focus-visible:border-red focus-visible:outline-none"

const textareaClass =
  "flex w-full border border-hairline bg-transparent px-3 py-3 font-sans text-body text-ink placeholder:text-ink/40 focus-visible:border-red focus-visible:outline-none resize-y"

const labelClass = "block font-mono text-micro uppercase tracking-[0.08em] text-ink/70 mb-2"
const errorClass = "mt-1 text-caption text-red"

type ContactFormProps = {
  /** WhatsApp number, digits only (no "+"), e.g. "41763666669". */
  whatsappNumber: string
}

function buildWhatsappUrl(number: string, data: ContactFormData): string {
  const lines = [
    "New inquiry via swiss-controls.com",
    "",
    `Name: ${data.name}`,
    data.company ? `Company: ${data.company}` : null,
    `Email: ${data.email}`,
    `Topic: ${REASON_LABELS[data.reason]}`,
    "",
    "Message:",
    data.message,
  ]
    .filter((l): l is string => l !== null)
    .join("\n")
  return `https://wa.me/${number}?text=${encodeURIComponent(lines)}`
}

export function ContactForm({ whatsappNumber }: ContactFormProps) {
  const [sentUrl, setSentUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema) as never,
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      reason: "general",
      message: "",
    },
  })

  // react-hook-form's `watch` subscribes to form state at runtime and is not
  // memoizable by the React Compiler; this is inherent to the library.
  // eslint-disable-next-line react-hooks/incompatible-library
  const consentChecked = watch("consent" as never)

  const onSubmit = handleSubmit((data) => {
    const url = buildWhatsappUrl(whatsappNumber, data)
    setSentUrl(url)
    // Best-effort auto-open (may be blocked as a non-gesture popup after async
    // validation — the confirmation screen's link is the reliable path).
    try {
      const w = window.open(url, "_blank")
      if (w) w.opener = null
    } catch {
      /* popup blocked — use the confirmation link */
    }
  })

  if (sentUrl) {
    return (
      <div className="border border-hairline p-8">
        <Stack gap="4">
          <SectionLabel number="04" label="READY TO SEND" />
          <p className="text-h2 font-medium text-ink">Your message is ready.</p>
          <p className="max-w-[46ch] text-body text-ink/70">
            Open WhatsApp to review and send it to our engineering team. If a tab already
            opened, you can send it there.
          </p>
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            autoFocus
            className="inline-flex h-14 w-fit items-center justify-center gap-2 bg-red px-8 text-body-l font-medium text-paper transition-colors hover:bg-red-dark focus-visible:outline-2 focus-visible:outline-red focus-visible:outline-offset-2"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Open WhatsApp
          </a>
        </Stack>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <Stack gap="6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name *
            </label>
            <input id="name" className={inputClass} {...register("name")} />
            {errors.name?.message && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input id="email" type="email" className={inputClass} {...register("email")} />
            {errors.email?.message && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              Company
            </label>
            <input id="company" className={inputClass} {...register("company")} />
          </div>
          <div>
            <label htmlFor="reason" className={labelClass}>
              Topic
            </label>
            <select id="reason" className={inputClass} {...register("reason")}>
              {CONTACT_REASONS.map((r) => (
                <option key={r} value={r}>
                  {REASON_LABELS[r]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Message *
          </label>
          <textarea id="message" rows={6} className={textareaClass} {...register("message")} />
          {errors.message?.message && <p className={errorClass}>{errors.message.message}</p>}
        </div>

        <Hairline />

        <label className="flex cursor-pointer items-start gap-3 text-body text-ink/80">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-red"
            checked={!!consentChecked}
            onChange={(e) =>
              setValue("consent" as never, e.target.checked as never, {
                shouldValidate: true,
              })
            }
          />
          <span>
            I consent to Swiss Controls using these details to respond to my inquiry, in
            accordance with the{" "}
            <Link href="/en/privacy" className="underline">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent?.message && <p className={errorClass}>{errors.consent.message}</p>}

        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          <span className="text-body font-bold uppercase tracking-[0.2em]">Submit</span>
        </Button>
      </Stack>
    </form>
  )
}
