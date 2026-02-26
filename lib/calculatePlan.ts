import type { Goal, PlanType } from './types'

const MS_DAY = 86_400_000

export const remainingDays = (targetDate: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(targetDate)
  target.setHours(0, 0, 0, 0)
  return Math.max(1, Math.ceil((target.getTime() - today.getTime()) / MS_DAY))
}

const remainingPeriods = (plan: PlanType, targetDate: string) => {
  const days = remainingDays(targetDate)
  if (plan === 'daily') return days
  if (plan === 'weekly') return Math.max(1, Math.ceil(days / 7))
  return Math.max(1, Math.ceil(days / 30))
}

export const requiredPerPeriod = (goal: Goal, plan = goal.planType) => {
  const remaining = Math.max(0, goal.targetAmount - goal.savedAmount)
  return remaining / remainingPeriods(plan, goal.targetDate)
}
