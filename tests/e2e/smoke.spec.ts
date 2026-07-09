import { test, expect } from "@playwright/test"

const ROUTES = [
  { path: "/en/", h1Pattern: /High-Performance Superalloys & Seamless Tubes/i },
  { path: "/en/materials/", h1Pattern: /right alloy/i },
  { path: "/en/about/", h1Pattern: /Swiss-managed.*Mill-produced/i },
  { path: "/en/contact/", h1Pattern: /Secure your supply chain/i },
  { path: "/en/privacy/", h1Pattern: /Privacy/i },
] as const

test.describe("smoke: pages load", () => {
  for (const route of ROUTES) {
    test(`${route.path} loads with expected H1`, async ({ page }) => {
      const errors: string[] = []
      page.on("pageerror", (err) => errors.push(err.message))

      await page.goto(route.path)
      await expect(page.locator("h1").first()).toContainText(route.h1Pattern)
      expect(errors).toEqual([])
    })
  }
})

test.describe("smoke: removed routes return 404", () => {
  test("/en/commodities/ no longer exists", async ({ page }) => {
    const response = await page.goto("/en/commodities/")
    expect(response?.status()).toBe(404)
  })

  test("/en/solutions/ no longer exists", async ({ page }) => {
    const response = await page.goto("/en/solutions/")
    expect(response?.status()).toBe(404)
  })
})

test.describe("smoke: shell", () => {
  test("Wordmark links to home", async ({ page }) => {
    await page.goto("/en/materials/")
    await page.getByRole("link", { name: "Rigitrade home" }).first().click()
    await expect(page).toHaveURL(/\/en\/?$/)
  })

  test("Footer shows new tagline and AOD technology tag", async ({ page }) => {
    await page.goto("/en/")
    await expect(
      page.getByText("When standard solutions are not enough."),
    ).toBeVisible()
    await expect(
      page.getByText("ADVANCED REFINING — AOD TECHNOLOGY"),
    ).toBeVisible()
  })

  test("Footer no longer shows sister brand links", async ({ page }) => {
    await page.goto("/en/")
    await expect(page.getByRole("link", { name: "Digihome" })).toHaveCount(0)
    await expect(page.getByRole("link", { name: "Senergic" })).toHaveCount(0)
  })

  test("Nav drops Commodities link", async ({ page }) => {
    await page.goto("/en/")
    await expect(
      page.getByRole("link", { name: "Commodities", exact: true }),
    ).toHaveCount(0)
  })
})

test.describe("smoke: homepage docx sections", () => {
  test("Hero shows AOD launch banner", async ({ page }) => {
    await page.goto("/en/")
    await expect(
      page.getByText(
        /Advanced AOD-based production capability in the Middle East — launching 2026/i,
      ),
    ).toBeVisible()
  })

  test("Strategic Value drivers render", async ({ page }) => {
    await page.goto("/en/")
    await expect(page.getByText("Plant uptime", { exact: true })).toBeVisible()
    await expect(page.getByText("Operational safety", { exact: true })).toBeVisible()
    await expect(page.getByText("Total lifecycle cost", { exact: true })).toBeVisible()
  })

  test("Core Capabilities renders three products", async ({ page }) => {
    await page.goto("/en/")
    await expect(page.getByText("Seamless Pipes & Tubes")).toBeVisible()
    await expect(page.getByText("Nickel Alloy Piping Systems")).toBeVisible()
    await expect(page.getByText("Custom Cast Components")).toBeVisible()
  })

  test("Metallurgy Authority shows 3 alloy families", async ({ page }) => {
    await page.goto("/en/")
    await expect(page.getByText("Nickel-Based Superalloys")).toBeVisible()
    await expect(page.getByText("Ultra-Low Carbon Steels (ULC)")).toBeVisible()
    await expect(page.getByText("Specialty Stainless & Duplex")).toBeVisible()
  })

  test("Manufacturing Technology shows AOD + production route", async ({
    page,
  }) => {
    await page.goto("/en/")
    await expect(
      page.getByRole("heading", { name: "Advanced AOD Refining" }),
    ).toBeVisible()
    await expect(
      page.getByText(/EAF → AOD → Ladle Furnace → Continuous Casting/),
    ).toBeVisible()
  })

  test("Production Capacity shows capacity numbers", async ({ page }) => {
    await page.goto("/en/")
    await expect(page.getByText(/17 tons\/day seamless pipes/)).toBeVisible()
    await expect(page.getByText(/Manufacturing: United Kingdom & Egypt/)).toBeVisible()
    await expect(page.getByText(/Headquarters: Zürich, Switzerland/)).toBeVisible()
  })

  test("Application Focus lists six industries", async ({ page }) => {
    await page.goto("/en/")
    await expect(page.getByText("Oil & Gas", { exact: true })).toBeVisible()
    await expect(page.getByText("Refineries", { exact: true })).toBeVisible()
    await expect(page.getByText("Petrochemicals", { exact: true })).toBeVisible()
    await expect(page.getByText("Fertilizer", { exact: true })).toBeVisible()
    await expect(page.getByText("Power Generation", { exact: true })).toBeVisible()
    await expect(page.getByText("Marine & Offshore", { exact: true })).toBeVisible()
  })

  test("Final CTA shows new headline", async ({ page }) => {
    await page.goto("/en/")
    await expect(
      page.getByRole("heading", {
        name: /Secure Your Supply Chain\. Eliminate Material Risk\./i,
      }),
    ).toBeVisible()
  })
})

test.describe("smoke: forms", () => {
  test("Quote form renders required fields", async ({ page }) => {
    await page.goto("/en/contact/")
    await expect(page.getByLabel(/Company name/i)).toBeVisible()
    await expect(page.getByLabel(/Business email/i)).toBeVisible()
    await expect(page.getByLabel(/Country/i)).toBeVisible()
  })

  test("Contact form renders required fields", async ({ page }) => {
    await page.goto("/en/contact/")
    await expect(page.getByLabel(/^Name/i).first()).toBeVisible()
    await expect(page.getByLabel(/Reason/i)).toBeVisible()
    await expect(page.getByLabel(/Message/i)).toBeVisible()
  })
})

test.describe("smoke: i18n", () => {
  test("DE locale renders with html[lang=de]", async ({ page }) => {
    await page.goto("/de/")
    await expect(page.locator("html")).toHaveAttribute("lang", "de")
  })

  test("DE switcher is disabled at launch", async ({ page }) => {
    await page.goto("/en/")
    const de = page.getByText("DE", { exact: true }).first()
    await expect(de).toHaveAttribute("aria-disabled", "true")
  })
})

test.describe("smoke: a11y essentials", () => {
  test("Skip link is keyboard-reachable", async ({ page }) => {
    await page.goto("/en/")
    await page.keyboard.press("Tab")
    await expect(page.getByText(/skip to content/i)).toBeFocused()
  })

  test("All routes have an h1", async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route.path)
      const h1Count = await page.locator("h1").count()
      expect(
        h1Count,
        `${route.path} should have at least one h1`,
      ).toBeGreaterThanOrEqual(1)
    }
  })
})
