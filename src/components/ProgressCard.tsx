import { Target, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/utils/format"

type ProgressCardProps = {
  totalSaved: number
  goalAmount: number
  remainingAmount: number
  progress: number
  ratePerMile: number
}

export function ProgressCard({
  totalSaved,
  goalAmount,
  remainingAmount,
  progress,
  ratePerMile,
}: ProgressCardProps) {
  const milesToGoal = ratePerMile > 0 ? remainingAmount / ratePerMile : 0
  const hasReachedGoal = remainingAmount <= 0

  return (
    <Card className="animate-rise-in [animation-delay:120ms]">
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Shoe fund goal</CardTitle>
            <CardDescription>
              Turn every mile into progress toward your next pair.
            </CardDescription>
          </div>
          <Badge variant={hasReachedGoal ? "secondary" : "default"}>
            {Math.round(progress)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-[22px] border border-primary/15 bg-primary/10 p-5">
          <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5" />
            Saved so far
          </p>
          <div className="flex items-end justify-between gap-3">
            <p className="text-3xl font-semibold tabular-nums text-foreground">
              {formatCurrency(totalSaved)}
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              of {formatCurrency(goalAmount)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span>Goal progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress aria-label="Savings goal progress" value={progress} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[18px] border border-white/10 bg-black/20 p-4">
            <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Remaining
            </p>
            <p className="text-xl font-semibold tabular-nums text-foreground">
              {formatCurrency(remainingAmount)}
            </p>
          </div>
          <div className="rounded-[18px] border border-white/10 bg-black/20 p-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Next milestone
            </p>
            <p className="text-sm leading-6 text-foreground">
              {hasReachedGoal
                ? "Goal unlocked. Time to start browsing for your next shoes."
                : `${milesToGoal.toFixed(1)} more miles at your current rate to hit the target.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
