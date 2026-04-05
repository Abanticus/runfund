import type { ReactNode } from "react"
import { type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type MetricTileProps = {
  icon: LucideIcon
  label: string
  children: ReactNode
  className?: string
}

export function MetricTile({
  icon: Icon,
  label,
  children,
  className,
}: MetricTileProps) {
  return (
    <div className={cn("rounded-[22px] border border-white/10 bg-black/25 p-4", className)}>
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  )
}
