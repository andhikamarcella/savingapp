export type Language = 'en' | 'id'
export type ThemeMode = 'light' | 'dark' | 'system'
export type Currency = 'USD' | 'IDR'
export type PlanType = 'daily' | 'weekly' | 'monthly'

export interface GoalType {
  id: string
  title: string
  emoji: string
  targetAmount: number
  currency: Currency
  targetDate: string
  planType: PlanType
  createdAt: string
  archived: boolean
}

export interface Transaction {
  id: string
  goalId: string
  type: 'deposit' | 'withdraw'
  amount: number
  date: string
  notes: string
}
