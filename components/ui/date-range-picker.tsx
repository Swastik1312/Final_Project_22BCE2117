"use client"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: {
  className?: string
  date: { from: Date; to: Date }
  setDate: (date: { from: Date; to: Date }) => void
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {date.from.toLocaleDateString()} - {date.to.toLocaleDateString()}
                </>
              ) : (
                date.from.toLocaleDateString()
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 space-y-3">
            <div>
              <label className="text-sm font-medium">From:</label>
              <input
                type="date"
                value={date.from.toISOString().split("T")[0]}
                onChange={(e) => setDate({ ...date, from: new Date(e.target.value) })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">To:</label>
              <input
                type="date"
                value={date.to.toISOString().split("T")[0]}
                onChange={(e) => setDate({ ...date, to: new Date(e.target.value) })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
