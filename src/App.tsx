import { Activity, Gauge, Target, Wallet2 } from "lucide-react"

import { Dashboard } from "@/components/Dashboard"
import { InlineMetricEditor } from "@/components/InlineMetricEditor"
import { MetricTile } from "@/components/MetricTile"
import { RunForm } from "@/components/RunForm"
import { Settings } from "@/components/Settings"
import { Badge } from "@/components/ui/badge"
import { Toaster } from "@/components/ui/toaster"
import { useRunFundStore } from "@/store/use-runfund-store"
import { formatCurrency, formatMiles } from "@/utils/format"
import {
  calculateGoalProgress,
  calculateRemainingAmount,
  calculateTotalMiles,
  calculateTotalSaved,
} from "@/utils/metrics"

export default function App() {
  const runs = useRunFundStore((state) => state.runs)
  const ratePerMile = useRunFundStore((state) => state.ratePerMile)
  const goalAmount = useRunFundStore((state) => state.goalAmount)
  const addRun = useRunFundStore((state) => state.addRun)
  const deleteRun = useRunFundStore((state) => state.deleteRun)
  const updateSettings = useRunFundStore((state) => state.updateSettings)

  const totalMiles = calculateTotalMiles(runs)
  const totalSaved = calculateTotalSaved(totalMiles, ratePerMile)
  const remainingAmount = calculateRemainingAmount(totalSaved, goalAmount)
  const goalProgress = calculateGoalProgress(totalSaved, goalAmount)
  const sessionCount = runs.length

  return (
    <>
      <main className="min-h-screen px-4 py-5 sm:px-6 sm:py-8">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6 md:max-w-6xl">
          <header className="animate-rise-in overflow-hidden rounded-[30px] border border-white/10 bg-card/90 px-6 py-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.95)] backdrop-blur-md sm:px-7">
            <div className="relative">
              <div className="relative flex items-start justify-between gap-4">
                <Badge className="border-primary/20 bg-primary/10 text-primary" variant="outline">
                  <Activity className="mr-1 h-3.5 w-3.5" />
                  Training wallet
                </Badge>
                <Settings
                  goalAmount={goalAmount}
                  ratePerMile={ratePerMile}
                  onSave={updateSettings}
                />
              </div>

              <div className="relative mt-6 max-w-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  RunFund
                </p>
                <h1 className="mt-3 text-balance text-4xl font-semibold text-foreground">
                  Make every mile pay for your next pair.
                </h1>
                <p className="mt-3 text-base leading-7 text-muted-foreground">
                  Log your runs, grow your shoe budget, and know when your current pair
                  is moving toward retirement.
                </p>
              </div>

              <div className="relative mt-7 grid gap-3 sm:grid-cols-3">
                <InlineMetricEditor
                  displayValue={formatCurrency(ratePerMile)}
                  icon={Gauge}
                  inputId="inline-rate-per-mile"
                  label="Earn rate"
                  step={0.1}
                  suffix="/mi"
                  value={ratePerMile}
                  onSave={(nextRate) => updateSettings({ ratePerMile: nextRate })}
                />
                <InlineMetricEditor
                  displayValue={formatCurrency(goalAmount)}
                  icon={Target}
                  inputId="inline-goal-target"
                  label="Goal target"
                  min={1}
                  step={1}
                  value={goalAmount}
                  onSave={(nextGoal) => updateSettings({ goalAmount: nextGoal })}
                />
                <MetricTile icon={Wallet2} label="Logged runs">
                  <p className="text-2xl font-semibold tabular-nums text-foreground">
                    {sessionCount}
                  </p>
                </MetricTile>
              </div>

              <div className="relative mt-4 rounded-[22px] border border-primary/15 bg-primary/10 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
                  Current balance
                </p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p className="text-3xl font-semibold tabular-nums text-foreground">
                    {formatCurrency(totalSaved)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {Math.round(goalProgress)}% of target
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="space-y-6">
              <RunForm ratePerMile={ratePerMile} onAddRun={addRun} />

              <div className="animate-rise-in rounded-[26px] border border-white/10 bg-card/90 p-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.95)] [animation-delay:260ms]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
                  Mileage summary
                </p>
                <p className="mt-3 text-3xl font-semibold tabular-nums text-foreground">
                  {formatCurrency(totalSaved)}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Built from <span className="font-semibold text-foreground">{formatMiles(totalMiles)}</span>. Keep the habit moving and the next pair gets easier to justify.
                </p>
              </div>
            </div>

            <Dashboard
              goalAmount={goalAmount}
              goalProgress={goalProgress}
              onDeleteRun={deleteRun}
              ratePerMile={ratePerMile}
              remainingAmount={remainingAmount}
              runs={runs}
              totalMiles={totalMiles}
              totalSaved={totalSaved}
            />
          </div>
        </div>
      </main>

      <Toaster />
    </>
  )
}
