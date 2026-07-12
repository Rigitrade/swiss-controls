import { readFile } from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import type { z } from "zod"
import type { Locale } from "@/i18n/routing"

const CONTENT_ROOT = path.join(process.cwd(), "content")

export type PageSlug =
  | "home"
  | "solutions/index"
  | "who-we-are"
  | "technology"
  | "contact"
  | "privacy"
  | "gtc"
  | "cookies"

export type LoadedContent<T> = {
  frontmatter: T
  body: string
}

export async function loadPageContent<T>(
  locale: Locale,
  slug: PageSlug | string,
  schema: z.ZodSchema<T>,
): Promise<LoadedContent<T>> {
  const filePath = path.join(CONTENT_ROOT, locale, `${slug}.mdx`)

  let raw: string
  try {
    raw = await readFile(filePath, "utf8")
  } catch (err) {
    throw new Error(
      `Content file not found: ${filePath}. Original: ${(err as Error).message}`,
    )
  }

  const parsed = matter(raw)

  let frontmatter: T
  try {
    frontmatter = schema.parse(parsed.data)
  } catch (err) {
    throw new Error(
      `Frontmatter validation failed for ${filePath}:\n${(err as Error).message}`,
    )
  }

  return { frontmatter, body: parsed.content }
}

export async function loadSharedContent<T>(
  locale: Locale,
  name: "nav" | "footer",
  schema: z.ZodSchema<T>,
): Promise<T> {
  const filePath = path.join(CONTENT_ROOT, locale, "shared", `${name}.mdx`)
  const raw = await readFile(filePath, "utf8")
  const parsed = matter(raw)
  return schema.parse(parsed.data)
}
