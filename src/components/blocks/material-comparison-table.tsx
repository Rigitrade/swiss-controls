"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpDown } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Section } from "@/components/primitives/section"
import { SectionLabel } from "@/components/typography/section-label"
import { DisplayHeading } from "@/components/typography/display-heading"

type SortKey = "name" | "family" | "maxTemp" | "tensileStrength"

type Alloy = {
  name: string
  family: string
  maxTemp: string
  corrosionRating: string
  tensileStrength: string
  keyApplications: string[]
}

type MaterialComparisonTableProps = {
  materials: {
    number: string
    callout: string
    alloys: Alloy[]
  }
  locale: "en" | "de"
  showCta?: boolean
  showCallout?: boolean
}

const COLUMNS = [
  { key: "name", label: "Alloy", sortable: true },
  { key: "family", label: "Family", sortable: true },
  { key: "maxTemp", label: "Max Temp", sortable: true },
  { key: "corrosionRating", label: "Corrosion", sortable: false },
  { key: "tensileStrength", label: "Tensile", sortable: true },
  { key: "keyApplications", label: "Applications", sortable: false },
] as const

export function MaterialComparisonTable({
  materials,
  locale,
  showCta = true,
  showCallout = true,
}: MaterialComparisonTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [asc, setAsc] = useState(true)

  const sorted = [...materials.alloys].sort((a, b) => {
    const av = String(a[sortKey])
    const bv = String(b[sortKey])
    return asc ? av.localeCompare(bv) : bv.localeCompare(av)
  })

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setAsc((v) => !v)
    else {
      setSortKey(key)
      setAsc(true)
    }
  }

  return (
    <Section>
      <Container>
        <div className="mb-12">
          <SectionLabel number={materials.number} label="MATERIALS" />
          {showCallout && materials.callout && (
            <DisplayHeading as="h2" size="display-m" className="mt-6 max-w-[18ch]">
              {materials.callout}
            </DisplayHeading>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className="py-3 pr-4 font-mono text-micro uppercase tracking-[0.08em] text-ink/70"
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col.key as SortKey)}
                        className="inline-flex items-center gap-1 hover:text-ink"
                        aria-label={`Sort by ${col.label}`}
                      >
                        {col.label}
                        <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((alloy) => (
                <tr
                  key={alloy.name}
                  className="border-b border-hairline transition-colors hover:bg-stone/40"
                >
                  <th
                    scope="row"
                    className="sticky left-0 bg-paper py-4 pr-4 text-body font-medium"
                  >
                    {alloy.name}
                  </th>
                  <td className="py-4 pr-4 text-body text-ink/80">
                    {alloy.family}
                  </td>
                  <td className="py-4 pr-4 font-mono text-body tabular-nums">
                    {alloy.maxTemp}
                  </td>
                  <td className="py-4 pr-4 text-body text-ink/80">
                    {alloy.corrosionRating}
                  </td>
                  <td className="py-4 pr-4 font-mono text-body tabular-nums">
                    {alloy.tensileStrength}
                  </td>
                  <td className="py-4 pr-4 text-body text-ink/80">
                    {alloy.keyApplications.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showCta && (
          <div className="mt-8">
            <Link
              href={`/${locale}/materials`}
              className="inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.08em] text-ink hover:text-forge"
            >
              Compare &amp; Select Materials
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </Container>
    </Section>
  )
}
