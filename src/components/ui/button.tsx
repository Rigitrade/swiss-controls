import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ),
  {
    variants: {
      variant: {
        primary: "bg-signal text-paper hover:bg-signal-bright",
        secondary:
          "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        link: "h-auto p-0 text-ink underline-offset-4 hover:underline",
        ghost: "text-ink hover:bg-stone",
        inverted:
          "border border-paper bg-transparent text-paper hover:bg-paper hover:text-ink",
      },
      size: {
        default: "h-12 px-6 text-body",
        sm: "h-9 px-4 text-caption",
        lg: "h-14 px-8 text-body-l",
        pill: "h-9 rounded-full px-5 text-caption",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
)
Button.displayName = "Button"

export { buttonVariants }
