import { useState } from 'react'
import type { Currency, Transaction } from '../lib/types'

interface Props {
  type: 'deposit' | 'withdraw'
  currency: Currency
  onSubmit: (payload: Omit<Transaction, 'id' | 'goalId'>) => void
}

export const TransactionForm = ({ type, currency, onSubmit }: Props) => {
  const [amount, setAmount] = useState<number>(0)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16))
  const [notes, setNotes] = useState('')
  return (
    <form
      className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
      onSubmit={(e) => {
        e.preventDefault()
        if (!amount) return
        onSubmit({ type, amount, date: new Date(date).toISOString(), notes })
        setAmount(0)
        setNotes('')
      }}
    >
      <h3 className="font-semibold capitalize">{type}</h3>
      <input type="number" className="input" value={amount || ''} onChange={(e) => setAmount(Number(e.target.value))} placeholder={`Amount (${currency})`} />
      <input type="datetime-local" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
      <input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
      <button className="btn" type="submit">Save</button>
    </form>
  )
}
