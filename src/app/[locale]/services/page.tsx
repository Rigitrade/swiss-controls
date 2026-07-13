import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { PageHeader } from "@/components/blocks/page-header"
import { ProfessionalServices } from "@/components/blocks/professional-services"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Commissioning & lifecycle management — factory & site acceptance testing, commissioning & startup, training, and lifecycle support.",
}

const SERVICES = [
  {
    title: "Factory & Site Acceptance Testing (FAT/SAT)",
    detail: "Verifying system functionality, safety loops, and logic integrity before handover.",
    points: [
      {
        label: "Risk Mitigation",
        text: "Comprehensive software simulation and pre-commissioning validation.",
      },
      {
        label: "Compliance",
        text: "Ensuring all hardware and control logic match your technical specifications perfectly.",
      },
    ],
  },
  {
    title: "Commissioning & Startup",
    detail: "Seamless integration of automation, motion, and networking layers with minimal downtime.",
    points: [
      {
        label: "Execution",
        text: "On-site deployment, instrumentation calibration, and drive loop tuning.",
      },
      {
        label: "Integration",
        text: "Synchronizing multi-vendor PLCs, DCS architectures, and SCADA layers into a unified network.",
      },
    ],
  },
  {
    title: "Training & Knowledge Transfer",
    detail: "Empowering your teams with the training needed for safe, self-sufficient operation.",
    points: [
      {
        label: "Workshops",
        text: "Target-oriented training for operators and maintenance personnel to ensure self-sufficiency.",
      },
      {
        label: "Documentation",
        text: "Delivery of clear operating manuals, functional design specifications, and clean code documentation.",
      },
    ],
  },
  {
    title: "Lifecycle Support & Troubleshooting",
    detail: "Continuous technical review, performance tuning, and rapid fault resolution.",
    points: [
      {
        label: "Uptime",
        text: "Proactive health checks, system optimization, and preventive maintenance reviews.",
      },
      {
        label: "Diagnostics",
        text: "Rapid root-cause analysis and remote or on-site engineering support to eliminate unscheduled downtime.",
      },
    ],
  },
]

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHeader
        title="Commissioning & Lifecycle Management"
        intro="We bridge the gap between complex industrial technologies and daily operation through disciplined engineering execution, testing, and continuous optimization, ensuring productivity, safety, and performance."
        centered
        introClassName="leading-loose"
      />
      <ProfessionalServices items={SERVICES} surface="stone" />
    </>
  )
}
