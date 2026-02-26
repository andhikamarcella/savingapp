import { formatCurrency } from '../lib/format'
import type { Currency, Transaction } from '../lib/types'

export const Timeline = ({ transactions, currency }: { transactions: Transaction[]; currency: Currency }) => (
  <section className="rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
    <h2 className="mb-3 text-lg font-semibold">Timeline</h2>
    <ul className="space-y-3">
      {transactions.map((tx) => (
        <li key={tx.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
          <p className="font-medium">{new Date(tx.date).toLocaleDateString()} • {tx.type === 'deposit' ? 'Deposit' : 'Withdraw'} {tx.type === 'deposit' ? '+' : '-'}{formatCurrency(tx.amount, currency)}</p>
          {tx.notes && <p className="text-slate-500">{tx.notes}</p>}
        </li>
      ))}
      {!transactions.length && <li className="text-sm text-slate-500">No transactions yet.</li>}
    </ul>
  </section>
)
