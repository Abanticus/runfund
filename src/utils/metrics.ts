import type { RunEntry } from "@/store/use-runfund-store"

export const SHOE_LIFECYCLE_LIMIT = 500

export const calculateTotalMiles = (runs: RunEntry[]) =>
  runs.reduce((sum, run) => sum + run.distance, 0)

export const calculateTotalSaved = (totalMiles: number, ratePerMile: number) =>
  totalMiles * ratePerMile

export const calculateRemainingAmount = (
  totalSaved: number,
  goalAmount: number,
) => Math.max(goalAmount - totalSaved, 0)

export const calculateGoalProgress = (totalSaved: number, goalAmount: number) => {
  if (goalAmount <= 0) {
    return 100
  }

  return Math.min((totalSaved / goalAmount) * 100, 100)
}

type LifecycleVariant = "outline" | "secondary" | "destructive"

export type LifecycleStatus = {
  label: "Fresh" | "Mid-life" | "Replace soon"
  variant: LifecycleVariant
  description: string
  progress: number
  clampedMiles: number
}

export const getShoeLifecycleStatus = (totalMiles: number): LifecycleStatus => {
  if (totalMiles < 150) {
    return {
      label: "Fresh",
      variant: "outline",
      description: "You are early in the lifecycle, so keep stacking easy miles.",
      progress: Math.min((totalMiles / SHOE_LIFECYCLE_LIMIT) * 100, 100),
      clampedMiles: Math.min(totalMiles, SHOE_LIFECYCLE_LIMIT),
    }
  }

  if (totalMiles < 350) {
    return {
      label: "Mid-life",
      variant: "secondary",
      description: "Your shoes are in the workhorse zone. Keep an eye on feel and grip.",
      progress: Math.min((totalMiles / SHOE_LIFECYCLE_LIMIT) * 100, 100),
      clampedMiles: Math.min(totalMiles, SHOE_LIFECYCLE_LIMIT),
    }
  }

  return {
    label: "Replace soon",
    variant: "destructive",
    description: "You are in the final stretch. Your next pair is getting closer for two reasons.",
    progress: Math.min((totalMiles / SHOE_LIFECYCLE_LIMIT) * 100, 100),
    clampedMiles: Math.min(totalMiles, SHOE_LIFECYCLE_LIMIT),
  }
}
