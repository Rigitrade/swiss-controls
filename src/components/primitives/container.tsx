import { type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: ElementType
}

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[80rem] px-6 sm:px-8 lg:px-16",
        className,
      )}
    >
      {children}
    </Component>
  )
}
