export type Currency = 'USD' | 'IDR'
export type PlanType = 'daily' | 'weekly' | 'monthly'
export type Language = 'en' | 'id'
export type ThemeMode = 'light' | 'dark' | 'system'
export type ReminderFrequency = 'daily' | 'weekly' | 'monthly'

export interface Transaction {
  id: string
  type: 'deposit' | 'withdraw'
  amount: number
  date: string
  note: string
}

export interface Goal {
  id: string
  title: string
  emoji: string
  targetAmount: number
  savedAmount: number
  currency: Currency
  targetDate: string
  planType: PlanType
  archived: boolean
  transactions: Transaction[]
}
