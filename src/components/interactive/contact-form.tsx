"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { Hairline } from "@/components/primitives/hairline"
import { contactSchema, CONTACT_REASONS, type ContactFormData } from "@/lib/forms/contact-schema"
import { submitToFormspree } from "@/lib/forms/formspree-client"
import { cn } from "@/lib/utils/cn"

const REASON_LABELS: Record<(typeof CONTACT_REASONS)[number], string> = {
  general: "General inquiry",
  technical: "Technical question",
  press: "Press / media",
  partnership: "Partnership",
  other: "Other",
}

const inputClass =
  "flex h-12 w-full border-b border-hairline bg-transparent px-0 py-2 font-sans text-body text-ink placeholder:text-ink/40 focus-visible:border-signal focus-visible:outline-none"

const textareaClass =
  "flex w-full border border-hairline bg-transparent px-3 py-3 font-sans text-body text-ink placeholder:text-ink/40 focus-visible:border-signal focus-visible:outline-none resize-y"

const labelClass = "block font-mono text-micro uppercase tracking-[0.08em] text-ink/70 mb-2"
const errorClass = "mt-1 text-caption text-signal"

type ContactFormProps = {
  formspreeId: string
}

export function ContactForm({ formspreeId }: ContactFormProps) {
  const [success, setSuccess] = useState<{ id?: string } | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  const consentChecked = watch("consent" as never)

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null)
    if (data.website) {
      setSuccess({})
      return
    }
    const result = await submitToFormspree(formspreeId, { ...data, _source: "contact" })
    if (result.ok) {
      setSuccess({ id: result.id })
    } else {
      setSubmitError(
        "Submission failed. Please try again or email info@swiss-controls.com directly.",
      )
    }
  })

  if (success) {
    return (
      <div className="border border-hairline p-8">
        <Stack gap="3">
          <SectionLabel number="04" label="MESSAGE RECEIVED" />
          <p className="text-h2 font-medium">Thanks — we&apos;ll get back to you soon.</p>
          {success.id && (
            <p className="font-mono text-caption text-ink/60">Reference: {success.id}</p>
          )}
        </Stack>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <Stack gap="6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name *
            </label>
            <input id="name" className={inputClass} {...register("name")} />
            {errors.name?.message && (
              <p className={errorClass}>{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              {...register("email")}
            />
            {errors.email?.message && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="company" className={labelClass}>
              Company
            </label>
            <input id="company" className={inputClass} {...register("company")} />
          </div>
          <div>
            <label htmlFor="reason" className={labelClass}>
              Reason
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
          <textarea
            id="message"
            rows={6}
            className={textareaClass}
            {...register("message")}
          />
          {errors.message?.message && (
            <p className={errorClass}>{errors.message.message}</p>
          )}
        </div>

        <Hairline />

        <label className="flex cursor-pointer items-start gap-3 text-body text-ink/80">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-signal"
            checked={!!consentChecked}
            onChange={(e) =>
              setValue("consent" as never, e.target.checked as never, {
                shouldValidate: true,
              })
            }
          />
          <span>
            I consent to Swiss Controls processing this submission to respond to my
            inquiry, in accordance with the{" "}
            <a href="/en/privacy" className="underline">
              privacy policy
            </a>
            .
          </span>
        </label>
        {errors.consent?.message && (
          <p className={errorClass}>{errors.consent.message}</p>
        )}

        {submitError && (
          <p className={cn(errorClass, "text-body")} role="alert">
            {submitError}
          </p>
        )}

        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send Message"}
        </Button>
      </Stack>
    </form>
  )
}
