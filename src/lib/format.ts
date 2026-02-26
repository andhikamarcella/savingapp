import type { Currency } from './types'

export const formatCurrency = (value: number, currency: Currency) => {
  const locale = currency === 'IDR' ? 'id-ID' : 'en-US'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(value)
}

export const daysLeft = (targetDate: string) => {
  const now = new Date()
  const target = new Date(targetDate)
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000))
}

export const getPeriods = (plan: 'daily' | 'weekly' | 'monthly', targetDate: string) => {
  const days = Math.max(1, daysLeft(targetDate))
  if (plan === 'daily') return days
  if (plan === 'weekly') return Math.max(1, Math.ceil(days / 7))
  return Math.max(1, Math.ceil(days / 30))
}
