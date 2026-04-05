import { type FormEvent, useState } from "react"
import { Coins, Footprints, PlusCircle } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency, toDateInputValue } from "@/utils/format"

type RunFormProps = {
  ratePerMile: number
  onAddRun: (input: { distance: number; date?: string }) => void
}

export function RunForm({ ratePerMile, onAddRun }: RunFormProps) {
  const [distance, setDistance] = useState("")
  const [date, setDate] = useState<Date>()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const distanceValue = Number(distance)

    if (!Number.isFinite(distanceValue) || distanceValue <= 0) {
      toast.error("Enter a valid distance", {
        description: "Miles need to be greater than zero to grow your shoe fund.",
      })
      return
    }

    onAddRun({
      distance: distanceValue,
      date: date ? toDateInputValue(date) : undefined,
    })

    toast.success("Run logged", {
      description: `You added ${distanceValue.toFixed(1)} miles and banked ${formatCurrency(distanceValue * ratePerMile)}.`,
    })

    setDistance("")
    setDate(undefined)
  }

  return (
    <Card className="animate-rise-in overflow-hidden">
      <CardHeader className="gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-[18px] border border-primary/15 bg-primary/10 p-3 text-primary">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Log a run</CardTitle>
              <CardDescription>
                Add your latest miles and keep the fund moving.
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 rounded-[22px] border border-white/10 bg-black/20 p-4 sm:grid-cols-2">
          <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Coins className="h-3.5 w-3.5" />
              Current rate
            </p>
            <p className="text-2xl font-semibold tabular-nums text-foreground">
              {formatCurrency(ratePerMile)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">earned for every mile</p>
          </div>
          <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
            <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Footprints className="h-3.5 w-3.5" />
              Focus
            </p>
            <p className="text-sm leading-6 text-foreground">
              Recovery miles count too. Log them and keep the target moving in the background.
            </p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="distance">Distance (miles)</Label>
            <Input
              id="distance"
              inputMode="decimal"
              min="0"
              step="0.1"
              placeholder="5.2"
              type="number"
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="date">Date (optional)</Label>
              {date ? (
                <Button size="sm" type="button" variant="ghost" onClick={() => setDate(undefined)}>
                  Clear
                </Button>
              ) : null}
            </div>
            <DatePicker
              id="date"
              date={date}
              placeholder="Pick a run date"
              onSelect={setDate}
            />
          </div>

          <Button className="w-full" size="lg" type="submit">
            Save run
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
