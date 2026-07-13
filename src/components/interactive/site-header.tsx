"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Container } from "@/components/primitives/container"
import { Hairline } from "@/components/primitives/hairline"
import { Wordmark } from "@/components/typography/wordmark"
import { LinkButton } from "@/components/ui/link-button"
import { cn } from "@/lib/utils/cn"

type NavLink = { label: string; href: string }

type SiteHeaderProps = {
  locale: "en" | "de"
  links: NavLink[]
  cta?: { label: string; href: string }
}

const stripSlash = (s: string) => (s !== "/" && s.endsWith("/") ? s.slice(0, -1) : s)

export function SiteHeader({ locale, links, cta }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = stripSlash(usePathname() ?? "")

  const isActive = (href: string) => {
    const target = stripSlash(`/${locale}${href}`)
    return pathname === target || pathname.startsWith(`${target}/`)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Wordmark size="lg" href={`/${locale}`} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {links.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "font-sans text-[14px] font-semibold uppercase tracking-[0.1em] underline-offset-[6px] transition-colors",
                    active
                      ? "text-red underline decoration-red decoration-2"
                      : "text-[#333333] hover:text-red",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {cta && (
            <div className="hidden items-center gap-4 lg:flex">
              <LinkButton href={`/${locale}${cta.href}`} variant="primary" size="pill">
                {cta.label}
              </LinkButton>
            </div>
          )}

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="p-2 text-ink lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </Container>
      <Hairline />

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden",
          "transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-[85vw] max-w-sm bg-paper p-6 shadow-2xl lg:hidden",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <Wordmark size="md" />
          <button
            type="button"
            aria-label="Close menu"
            className="p-2 text-ink"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex flex-col gap-6" aria-label="Mobile">
          {links.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-sans text-h3",
                  active ? "text-red" : "text-ink hover:text-red",
                )}
              >
                {link.label}
              </Link>
            )
          })}
          {cta && (
            <>
              <Hairline />
              <LinkButton
                href={`/${locale}${cta.href}`}
                variant="primary"
                onClick={() => setOpen(false)}
              >
                {cta.label}
              </LinkButton>
            </>
          )}
        </nav>
      </aside>
    </header>
  )
}
