import Link from "next/link"
import { type VariantProps } from "class-variance-authority"
import { buttonVariants } from "./button"
import { cn } from "@/lib/utils/cn"

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    href: string
    external?: boolean
  }

export function LinkButton({
  href,
  variant,
  size,
  className,
  external,
  children,
  ...props
}: LinkButtonProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  )
}
