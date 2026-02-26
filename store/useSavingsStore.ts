'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Goal, Language, PlanType, ReminderFrequency, ThemeMode, Transaction } from '@/lib/types'

interface SavingsState {
  language: Language
  theme: ThemeMode
  reminderEnabled: boolean
  reminderFrequency: ReminderFrequency
  goals: Goal[]
  activeGoalId: string | null
  setLanguage: (value: Language) => void
  setTheme: (value: ThemeMode) => void
  setReminder: (enabled: boolean, frequency: ReminderFrequency) => void
  createGoal: (goal: Goal) => void
  setPlanType: (goalId: string, planType: PlanType) => void
  archiveGoal: (goalId: string) => void
  restoreGoal: (goalId: string) => void
  deleteGoal: (goalId: string) => void
  addTransaction: (goalId: string, tx: Transaction) => void
}

export const useSavingsStore = create<SavingsState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'system',
      reminderEnabled: false,
      reminderFrequency: 'daily',
      goals: [],
      activeGoalId: null,
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setReminder: (reminderEnabled, reminderFrequency) => set({ reminderEnabled, reminderFrequency }),
      createGoal: (goal) => set({ goals: [goal], activeGoalId: goal.id }),
      setPlanType: (goalId, planType) =>
        set((state) => ({ goals: state.goals.map((g) => (g.id === goalId ? { ...g, planType } : g)) })),
      archiveGoal: (goalId) =>
        set((state) => ({ goals: state.goals.map((g) => (g.id === goalId ? { ...g, archived: true } : g)) })),
      restoreGoal: (goalId) =>
        set((state) => ({ goals: state.goals.map((g) => (g.id === goalId ? { ...g, archived: false } : g)) })),
      deleteGoal: (goalId) =>
        set((state) => {
          const goals = state.goals.filter((g) => g.id !== goalId)
          const nextActive = state.activeGoalId === goalId ? goals[0]?.id ?? null : state.activeGoalId
          return { goals, activeGoalId: nextActive }
        }),
      addTransaction: (goalId, tx) =>
        set((state) => ({
          goals: state.goals.map((goal) => {
            if (goal.id !== goalId) return goal
            const delta = tx.type === 'deposit' ? tx.amount : -tx.amount
            const savedAmount = Math.max(0, goal.savedAmount + delta)
            return { ...goal, savedAmount, transactions: [tx, ...goal.transactions] }
          }),
        })),
    }),
    { name: 'money-saving-planner-pro' },
  ),
)
