"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/primitives/stack"
import { SectionLabel } from "@/components/typography/section-label"
import { Hairline } from "@/components/primitives/hairline"
import { quoteSchema, MATERIALS, CERTIFICATIONS, QUANTITY_UNITS, type QuoteFormData } from "@/lib/forms/quote-schema"
import { submitToFormspree } from "@/lib/forms/formspree-client"
import { cn } from "@/lib/utils/cn"

const MATERIAL_LABELS: Record<(typeof MATERIALS)[number], string> = {
  "inconel-625": "Inconel 625",
  "inconel-718": "Inconel 718",
  "hastelloy-c276": "Hastelloy C-276",
  "duplex-2205": "Duplex 2205",
  "super-duplex-2507": "Super Duplex 2507",
  "monel-400": "Monel 400",
  other: "Other",
}

const CERT_LABELS: Record<(typeof CERTIFICATIONS)[number], string> = {
  "en-10204-3-1": "EN 10204 3.1",
  "en-10204-3-2": "EN 10204 3.2",
  "nace-mr0175": "NACE MR0175",
  "ped-2014-68-eu": "PED 2014/68/EU",
  norsok: "NORSOK",
  other: "Other",
}

const inputClass =
  "flex h-12 w-full border-b border-hairline bg-transparent px-0 py-2 font-sans text-body text-ink placeholder:text-ink/40 focus-visible:border-signal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"

const textareaClass =
  "flex w-full border border-hairline bg-transparent px-3 py-3 font-sans text-body text-ink placeholder:text-ink/40 focus-visible:border-signal focus-visible:outline-none resize-y"

const labelClass = "block font-mono text-micro uppercase tracking-[0.08em] text-ink/70 mb-2"

const errorClass = "mt-1 text-caption text-signal"

type QuoteFormProps = {
  formspreeId: string
}

export function QuoteForm({ formspreeId }: QuoteFormProps) {
  const params = useSearchParams()
  const prefilledMaterial = params?.get("material")
  const defaultMaterials =
    prefilledMaterial && (MATERIALS as readonly string[]).includes(prefilledMaterial)
      ? [prefilledMaterial as (typeof MATERIALS)[number]]
      : ([] as (typeof MATERIALS)[number][])

  const [success, setSuccess] = useState<{ id?: string } | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema) as never,
    mode: "onBlur",
    defaultValues: {
      company: "",
      contactName: "",
      email: "",
      phone: "",
      country: "",
      materials: defaultMaterials,
      grade: "",
      quantity: 0,
      quantityUnit: "kg",
      dimensions: "",
      environment: "",
      certifications: [],
      details: "",
    },
  })

  const selectedMaterials = watch("materials") || []
  const selectedCerts = watch("certifications") || []
  const consentChecked = watch("consent" as never)

  const toggleMaterial = (m: (typeof MATERIALS)[number]) => {
    const set = new Set(selectedMaterials)
    if (set.has(m)) set.delete(m)
    else set.add(m)
    setValue("materials", Array.from(set), { shouldValidate: true })
  }

  const toggleCert = (c: (typeof CERTIFICATIONS)[number]) => {
    const set = new Set(selectedCerts)
    if (set.has(c)) set.delete(c)
    else set.add(c)
    setValue("certifications", Array.from(set))
  }

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null)
    if (data.website) {
      setSuccess({})
      return
    }
    const result = await submitToFormspree(formspreeId, { ...data, _source: "quote" })
    if (result.ok) {
      setSuccess({ id: result.id })
    } else {
      setSubmitError(
        "Submission failed. Please try again or email info@rigitrade.com directly.",
      )
    }
  })

  if (success) {
    return (
      <div className="border border-hairline p-8">
        <Stack gap="3">
          <SectionLabel number="04" label="REQUEST RECEIVED" />
          <p className="text-h2 font-medium">
            We&apos;ll be in touch within one business day.
          </p>
          {success.id && (
            <p className="font-mono text-caption text-ink/60">
              Reference: {success.id}
            </p>
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
            <label htmlFor="company" className={labelClass}>
              Company name *
            </label>
            <input id="company" className={inputClass} {...register("company")} />
            {errors.company?.message && (
              <p className={errorClass}>{errors.company.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="contactName" className={labelClass}>
              Contact name *
            </label>
            <input
              id="contactName"
              className={inputClass}
              {...register("contactName")}
            />
            {errors.contactName?.message && (
              <p className={errorClass}>{errors.contactName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Business email *
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
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              className={inputClass}
              {...register("phone")}
            />
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>
              Country *
            </label>
            <input id="country" className={inputClass} {...register("country")} />
            {errors.country?.message && (
              <p className={errorClass}>{errors.country.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="grade" className={labelClass}>
              Specific grade
            </label>
            <input id="grade" className={inputClass} {...register("grade")} />
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>Material of interest *</legend>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {MATERIALS.map((m) => (
              <label key={m} className="flex cursor-pointer items-center gap-2 text-body">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-signal"
                  checked={selectedMaterials.includes(m)}
                  onChange={() => toggleMaterial(m)}
                />
                {MATERIAL_LABELS[m]}
              </label>
            ))}
          </div>
          {errors.materials?.message && (
            <p className={errorClass}>{errors.materials.message}</p>
          )}
        </fieldset>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <label htmlFor="quantity" className={labelClass}>
              Quantity *
            </label>
            <input
              id="quantity"
              type="number"
              step="0.01"
              className={inputClass}
              {...register("quantity", { valueAsNumber: true })}
            />
            {errors.quantity?.message && (
              <p className={errorClass}>{errors.quantity.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="quantityUnit" className={labelClass}>
              Unit
            </label>
            <select
              id="quantityUnit"
              className={inputClass}
              {...register("quantityUnit")}
            >
              {QUANTITY_UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dimensions" className={labelClass}>
            Form / dimensions
          </label>
          <input
            id="dimensions"
            className={inputClass}
            placeholder="e.g. round bar Ø 50mm × 3000mm"
            {...register("dimensions")}
          />
        </div>

        <div>
          <label htmlFor="environment" className={labelClass}>
            Operating environment
          </label>
          <textarea
            id="environment"
            rows={3}
            className={textareaClass}
            placeholder="Temperature / pressure / media"
            {...register("environment")}
          />
        </div>

        <fieldset>
          <legend className={labelClass}>Required certifications</legend>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {CERTIFICATIONS.map((c) => (
              <label key={c} className="flex cursor-pointer items-center gap-2 text-body">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-signal"
                  checked={selectedCerts.includes(c)}
                  onChange={() => toggleCert(c)}
                />
                {CERT_LABELS[c]}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="details" className={labelClass}>
            Additional details
          </label>
          <textarea
            id="details"
            rows={4}
            className={textareaClass}
            {...register("details")}
          />
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
            I consent to Rigitrade processing this submission for the purpose of
            responding to my inquiry, in accordance with the{" "}
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
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </Stack>
    </form>
  )
}
