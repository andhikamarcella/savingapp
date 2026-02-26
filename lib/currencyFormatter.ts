import type { Currency } from './types'

export const formatCurrency = (value: number, currency: Currency) => {
  const locale = currency === 'IDR' ? 'id-ID' : 'en-US'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(value)
}
