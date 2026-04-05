import { type FormEvent, useEffect, useState } from "react"
import { Check, PencilLine, X, type LucideIcon } from "lucide-react"
import { toast } from "sonner"

import { MetricTile } from "@/components/MetricTile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/utils/format"

type InlineMetricEditorProps = {
  icon: LucideIcon
  label: string
  value: number
  displayValue: string
  inputId: string
  min?: number
  step?: number
  suffix?: string
  onSave: (value: number) => void
}

export function InlineMetricEditor({
  icon: Icon,
  label,
  value,
  displayValue,
  inputId,
  min = 0.1,
  step = 0.1,
  suffix,
  onSave,
}: InlineMetricEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftValue, setDraftValue] = useState(value.toString())

  useEffect(() => {
    if (!isEditing) {
      setDraftValue(value.toString())
    }
  }, [isEditing, value])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextValue = Number(draftValue)

    if (!Number.isFinite(nextValue) || nextValue < min) {
      toast.error(`Enter a valid ${label.toLowerCase()}`, {
        description: `The value needs to be at least ${min}.`,
      })
      return
    }

    onSave(nextValue)
    setIsEditing(false)

    toast.success(`${label} updated`, {
      description: `${label} is now set to ${formatCurrency(nextValue)}${suffix ? ` ${suffix}` : ""}.`,
    })
  }

  return (
    <MetricTile icon={Icon} label={label}>
      {isEditing ? (
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
              £
            </span>
            <Input
              autoFocus
              id={inputId}
              className="h-10 rounded-2xl pl-8 pr-12 text-lg font-semibold tabular-nums"
              inputMode="decimal"
              min={min}
              step={step}
              type="number"
              value={draftValue}
              onChange={(event) => setDraftValue(event.target.value)}
            />
            {suffix ? (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {suffix}
              </span>
            ) : null}
          </div>

          <div className="flex gap-2">
            <Button size="sm" type="submit">
              <Check className="h-3.5 w-3.5" />
              Save
            </Button>
            <Button
              size="sm"
              type="button"
              variant="ghost"
              onClick={() => {
                setDraftValue(value.toString())
                setIsEditing(false)
              }}
            >
              <X className="h-3.5 w-3.5" />
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <button
          className="group flex w-full items-end justify-between gap-3 text-left"
          type="button"
          onClick={() => setIsEditing(true)}
        >
          <p className="text-2xl font-semibold tabular-nums text-foreground">
            {displayValue}
            {suffix ? (
              <span className="ml-1 text-sm font-medium text-muted-foreground">
                {suffix}
              </span>
            ) : null}
          </p>
          <span className="inline-flex items-center text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <PencilLine className="h-3.5 w-3.5" />
          </span>
        </button>
      )}
    </MetricTile>
  )
}
