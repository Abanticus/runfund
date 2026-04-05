import { type FormEvent, useEffect, useState } from "react"
import { PoundSterling, Settings2, Target } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { formatCurrency } from "@/utils/format"

type SettingsProps = {
  ratePerMile: number
  goalAmount: number
  onSave: (settings: { ratePerMile: number; goalAmount: number }) => void
}

export function Settings({ ratePerMile, goalAmount, onSave }: SettingsProps) {
  const [open, setOpen] = useState(false)
  const [draftRate, setDraftRate] = useState(ratePerMile.toString())
  const [draftGoal, setDraftGoal] = useState(goalAmount.toString())

  useEffect(() => {
    if (open) {
      setDraftRate(ratePerMile.toString())
      setDraftGoal(goalAmount.toString())
    }
  }, [goalAmount, open, ratePerMile])

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextRate = Number(draftRate)
    const nextGoal = Number(draftGoal)

    if (!Number.isFinite(nextRate) || nextRate <= 0) {
      toast.error("Add a valid £ per mile rate", {
        description: "Your savings rate needs to be greater than zero.",
      })
      return
    }

    if (!Number.isFinite(nextGoal) || nextGoal <= 0) {
      toast.error("Set a goal above zero", {
        description: "Your shoe goal should be a positive amount.",
      })
      return
    }

    onSave({
      ratePerMile: nextRate,
      goalAmount: nextGoal,
    })

    toast.success("Settings updated", {
      description: `You are now saving ${formatCurrency(nextRate)} per mile toward ${formatCurrency(nextGoal)}.`,
    })
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="shrink-0" size="icon" variant="outline">
          <Settings2 className="h-4 w-4" />
          <span className="sr-only">Open settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-l-[28px]" side="right">
        <SheetHeader>
          <SheetTitle>Fund settings</SheetTitle>
          <SheetDescription>
            Adjust your savings rate and shoe target any time.
          </SheetDescription>
        </SheetHeader>

        <form className="mt-8 flex h-full flex-col gap-6" onSubmit={handleSave}>
          <div className="space-y-2">
            <Label htmlFor="rate-per-mile">£ per mile</Label>
            <div className="relative">
              <PoundSterling className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="rate-per-mile"
                className="pl-10"
                inputMode="decimal"
                min="0"
                step="0.1"
                type="number"
                value={draftRate}
                onChange={(event) => setDraftRate(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-amount">Savings goal</Label>
            <div className="relative">
              <Target className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="goal-amount"
                className="pl-10"
                inputMode="decimal"
                min="0"
                step="1"
                type="number"
                value={draftGoal}
                onChange={(event) => setDraftGoal(event.target.value)}
              />
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-muted-foreground">
            Your miles, target, and savings rate are saved locally in this browser.
          </div>

          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </SheetClose>
            <Button className="w-full sm:w-auto" type="submit">
              Save settings
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
