import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Our design tokens (see `@theme` in globals.css) extend Tailwind's default
// color and font-size scales with custom names (ink, paper, red, ... /
// micro, caption, body, body-l, h1-h3, display-*). tailwind-merge's default
// class-group detection only recognizes Tailwind's built-in scale keywords,
// so without registering these it conflates unrelated utilities that merely
// share the `text-` prefix — e.g. it treated `text-paper` (a color) and
// `text-caption` (a font size) as the same conflicting group and silently
// dropped `text-paper`, leaving CTA buttons with no explicit text color.
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": [
        {
          text: [
            "ink",
            "paper",
            "stone",
            "steel",
            "red",
            "red-dark",
            "red",
          ],
        },
      ],
      "font-size": [
        {
          text: [
            "micro",
            "caption",
            "body",
            "body-l",
            "h1",
            "h2",
            "h3",
            "display-m",
            "display-l",
            "display-xl",
            "display-2xl",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs))
}
