import { Coins, Footprints, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { ProgressCard } from "@/components/ProgressCard"
import { ShoeLifecycle } from "@/components/ShoeLifecycle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { RunEntry } from "@/store/use-runfund-store"
import { formatCurrency, formatMiles, formatRunDate } from "@/utils/format"

type DashboardProps = {
  runs: RunEntry[]
  totalMiles: number
  totalSaved: number
  goalAmount: number
  remainingAmount: number
  goalProgress: number
  ratePerMile: number
  onDeleteRun: (id: string) => void
}

export function Dashboard({
  runs,
  totalMiles,
  totalSaved,
  goalAmount,
  remainingAmount,
  goalProgress,
  ratePerMile,
  onDeleteRun,
}: DashboardProps) {
  const handleDelete = (run: RunEntry) => {
    onDeleteRun(run.id)

    toast.success("Run removed", {
      description: `${formatMiles(run.distance)} and ${formatCurrency(run.distance * ratePerMile)} were removed from the total.`,
    })
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="animate-rise-in [animation-delay:40ms]">
          <CardContent className="flex items-end justify-between gap-4 p-6">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Footprints className="h-3.5 w-3.5" />
                Total miles
              </p>
              <p className="text-3xl font-semibold tabular-nums text-foreground">
                {totalMiles.toFixed(1)}
                <span className="ml-1 text-base font-medium text-muted-foreground">mi</span>
              </p>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-3 text-primary">
              <Footprints className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-rise-in [animation-delay:80ms]">
          <CardContent className="flex items-end justify-between gap-4 p-6">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Coins className="h-3.5 w-3.5" />
                Total saved
              </p>
              <p className="text-3xl font-semibold tabular-nums text-foreground">
                {formatCurrency(totalSaved)}
              </p>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-white/[0.04] p-3 text-accent">
              <Coins className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <ProgressCard
        goalAmount={goalAmount}
        progress={goalProgress}
        ratePerMile={ratePerMile}
        remainingAmount={remainingAmount}
        totalSaved={totalSaved}
      />

      <ShoeLifecycle totalMiles={totalMiles} />

      <Card className="animate-rise-in [animation-delay:240ms]">
        <CardHeader className="gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>Recent runs</CardTitle>
              <CardDescription>
                Latest sessions and what they added to the fund.
              </CardDescription>
            </div>
            <Badge variant="outline">{runs.length} logged</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {runs.length === 0 ? (
            <div className="rounded-[22px] border border-white/10 bg-black/20 p-5 text-sm leading-6 text-muted-foreground">
              No runs logged yet. Start with your latest session and watch the totals
              update instantly.
            </div>
          ) : (
            runs.slice(0, 6).map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-black/20 p-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold tabular-nums text-foreground">
                    {formatMiles(run.distance)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatRunDate(run.date)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="font-semibold tabular-nums text-foreground">
                      {formatCurrency(run.distance * ratePerMile)}
                    </p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      added
                    </p>
                  </div>
                  <Button
                    aria-label={`Delete ${run.distance} mile run`}
                    size="icon"
                    type="button"
                    variant="ghost"
                    onClick={() => handleDelete(run)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  )
}
