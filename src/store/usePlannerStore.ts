import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GoalType, Language, PlanType, ThemeMode, Transaction } from '../lib/types'

interface PlannerState {
  language: Language
  theme: ThemeMode
  currencyDisplay: 'symbol' | 'code'
  goal: GoalType | null
  transactions: Transaction[]
  setLanguage: (value: Language) => void
  setTheme: (value: ThemeMode) => void
  setCurrencyDisplay: (value: 'symbol' | 'code') => void
  saveGoal: (goal: GoalType) => void
  archiveGoal: () => void
  deleteGoal: () => void
  addTransaction: (tx: Transaction) => void
  setPlanType: (planType: PlanType) => void
}

export const usePlannerStore = create<PlannerState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'system',
      currencyDisplay: 'symbol',
      goal: null,
      transactions: [],
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setCurrencyDisplay: (currencyDisplay) => set({ currencyDisplay }),
      saveGoal: (goal) => set({ goal, transactions: [] }),
      archiveGoal: () => set((state) => (state.goal ? { goal: { ...state.goal, archived: true } } : state)),
      deleteGoal: () => set({ goal: null, transactions: [] }),
      addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),
      setPlanType: (planType) => set((state) => (state.goal ? { goal: { ...state.goal, planType } } : state)),
    }),
    { name: 'money-saving-planner' },
  ),
)
