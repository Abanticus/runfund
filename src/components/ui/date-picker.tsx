import { useState } from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { formatDateValue } from "@/utils/format"

type DatePickerProps = {
  id?: string
  date?: Date
  onSelect: (date?: Date) => void
  placeholder?: string
}

export function DatePicker({
  id,
  date,
  onSelect,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          className={cn(
            "h-12 w-full justify-start rounded-[18px] border-input bg-white/[0.03] px-4 py-3 text-left font-normal shadow-inner shadow-black/20 hover:-translate-y-0 hover:bg-white/[0.05]",
            !date && "text-muted-foreground",
          )}
          type="button"
          variant="outline"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDateValue(date) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          initialFocus
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            onSelect(selectedDate)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
