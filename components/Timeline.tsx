'use client'

import { formatCurrency } from '@/lib/currencyFormatter'
import type { Currency, Transaction } from '@/lib/types'

export const Timeline = ({ currency, transactions }: { currency: Currency; transactions: Transaction[] }) => (
  <section className="rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
    <h2 className="mb-3 text-lg font-semibold">Timeline</h2>
    <ul className="space-y-2">
      {transactions.map((tx) => (
        <li key={tx.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
          <p className={tx.type === 'deposit' ? 'text-emerald-600' : 'text-red-500'}>
            {tx.type === 'deposit' ? '+' : '-'} {tx.type} {formatCurrency(tx.amount, currency)}
          </p>
          <p>{new Date(tx.date).toLocaleString()}</p>
          {tx.note && <p className="text-slate-500">{tx.note}</p>}
        </li>
      ))}
      {!transactions.length && <li className="text-sm text-slate-500">No transactions yet.</li>}
    </ul>
  </section>
)
