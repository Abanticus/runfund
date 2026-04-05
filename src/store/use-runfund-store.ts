import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { getTodayDateInputValue, parseDateInputValue } from "@/utils/format"

export type RunEntry = {
  id: string
  distance: number
  date: string
  createdAt: string
}

type AddRunInput = {
  distance: number
  date?: string
}

type SettingsInput = Partial<{
  ratePerMile: number
  goalAmount: number
}>

type RunFundState = {
  runs: RunEntry[]
  ratePerMile: number
  goalAmount: number
  addRun: (input: AddRunInput) => RunEntry
  deleteRun: (id: string) => void
  updateSettings: (settings: SettingsInput) => void
}

const createRunId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `run-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

const normaliseDate = (value?: string) => {
  if (value && value.trim().length > 0) {
    return value
  }

  return getTodayDateInputValue()
}

const sortRuns = (runs: RunEntry[]) =>
  [...runs].sort((left, right) => {
    const dateDifference =
      parseDateInputValue(right.date).getTime() - parseDateInputValue(left.date).getTime()

    if (dateDifference !== 0) {
      return dateDifference
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  })

export const useRunFundStore = create<RunFundState>()(
  persist(
    (set) => ({
      runs: [],
      ratePerMile: 1,
      goalAmount: 120,
      addRun: ({ distance, date }) => {
        const run = {
          id: createRunId(),
          distance: Number(distance.toFixed(2)),
          date: normaliseDate(date),
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          runs: sortRuns([run, ...state.runs]),
        }))

        return run
      },
      deleteRun: (id) =>
        set((state) => ({
          runs: state.runs.filter((run) => run.id !== id),
        })),
      updateSettings: ({ ratePerMile, goalAmount }) =>
        set((state) => ({
          ratePerMile:
            ratePerMile !== undefined
              ? Number(ratePerMile.toFixed(2))
              : state.ratePerMile,
          goalAmount:
            goalAmount !== undefined
              ? Number(goalAmount.toFixed(2))
              : state.goalAmount,
        })),
    }),
    {
      name: "runfund-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        runs: state.runs,
        ratePerMile: state.ratePerMile,
        goalAmount: state.goalAmount,
      }),
    },
  ),
)
