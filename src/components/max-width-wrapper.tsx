import { cn } from "@/lib/utils"

interface MaxWidthWrapperProps {
  className?: string
  children: React.ReactNode
}

export function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-[1280px] px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  )
}
