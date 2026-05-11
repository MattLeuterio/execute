import type { ReactNode } from "react"

type ChartFrameProps = {
  children: ReactNode
  className?: string
}

export function ChartFrame({ children, className = "h-72 w-full" }: ChartFrameProps) {
  return <div className={className}>{children}</div>
}
