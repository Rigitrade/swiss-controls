import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ServiceDetailCatalog } from "./service-detail-catalog"

describe("ServiceDetailCatalog", () => {
  it("renders all items", () => {
    render(<ServiceDetailCatalog summary="s" catalog={["PLC Programming", "SCADA / HMI Development"]} />)
    expect(screen.getByText("PLC Programming")).toBeInTheDocument()
    expect(screen.getByText("SCADA / HMI Development")).toBeInTheDocument()
  })
})
