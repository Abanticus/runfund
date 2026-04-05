import { Activity } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SHOE_LIFECYCLE_LIMIT, getShoeLifecycleStatus } from "@/utils/metrics"

type ShoeLifecycleProps = {
  totalMiles: number
}

export function ShoeLifecycle({ totalMiles }: ShoeLifecycleProps) {
  const status = getShoeLifecycleStatus(totalMiles)

  return (
    <Card className="animate-rise-in [animation-delay:180ms]">
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Shoe lifecycle</CardTitle>
            <CardDescription>
              Track where your current pair sits on the 500 mile benchmark.
            </CardDescription>
          </div>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between rounded-[22px] border border-white/10 bg-black/20 p-5">
          <div>
            <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Activity className="h-3.5 w-3.5" />
              Current shoe cycle
            </p>
            <p className="text-3xl font-semibold tabular-nums text-foreground">
              {status.clampedMiles.toFixed(0)}
              <span className="ml-1 text-base font-medium text-muted-foreground">
                / {SHOE_LIFECYCLE_LIMIT} miles
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span>Lifecycle progress</span>
            <span>{Math.round(status.progress)}%</span>
          </div>
          <Progress aria-label="Shoe lifecycle progress" value={status.progress} />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-3">
            <p className="text-sm font-semibold text-foreground">0–150</p>
            <p className="mt-1 text-xs text-muted-foreground">Fresh</p>
          </div>
          <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-3">
            <p className="text-sm font-semibold text-foreground">150–350</p>
            <p className="mt-1 text-xs text-muted-foreground">Mid-life</p>
          </div>
          <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-3">
            <p className="text-sm font-semibold text-foreground">350–500</p>
            <p className="mt-1 text-xs text-muted-foreground">Replace soon</p>
          </div>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">{status.description}</p>
      </CardContent>
    </Card>
  )
}
