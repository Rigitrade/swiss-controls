import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TechnologyPlatforms } from "./technology-platforms"

describe("TechnologyPlatforms", () => {
  it("renders the flow strip and each platform category with its items", () => {
    render(
      <TechnologyPlatforms
        number="01"
        label="TECHNOLOGY EXPERTISE"
        flow={["Automation", "Power", "Motion", "Industrial Software", "Networks", "Digital"]}
        categories={[
          {
            category: "Automation Platforms",
            items: ["PLC", "SCADA", "DCS", "RTU", "HMI", "Industrial IoT"],
          },
          {
            category: "Industrial Communication Networks",
            items: ["PROFINET", "OPC UA", "Modbus"],
          },
        ]}
      />,
    )
    expect(screen.getByText("Automation")).toBeInTheDocument()
    expect(screen.getByText("Automation Platforms")).toBeInTheDocument()
    expect(screen.getByText("OPC UA")).toBeInTheDocument()
  })
})
