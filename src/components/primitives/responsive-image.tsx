import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils/cn"

type ResponsiveImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
  fill?: boolean
}

// In static export mode (next.config.ts: images.unoptimized = true), next/image
// serves the raw src. Keeping next/image gives us width/height-based aspect-ratio
// preservation and lazy-loading semantics. For optimized AVIF/WebP variants
// post-launch, point images.loader at a custom loader (see Next 16 docs).
export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  sizes = "100vw",
  className,
  priority = false,
  fill = false,
}: ResponsiveImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 900}
      sizes={sizes}
      priority={priority}
      className={cn("h-full w-full object-cover", className)}
    />
  )
}
