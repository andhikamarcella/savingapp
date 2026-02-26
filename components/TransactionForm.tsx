'use client'

import { useState } from 'react'
import type { Transaction } from '@/lib/types'

export const TransactionForm = ({ type, onSubmit }: { type: 'deposit' | 'withdraw'; onSubmit: (tx: Transaction) => void }) => {
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16))
  const [note, setNote] = useState('')

  return (
    <form
      className="space-y-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
      onSubmit={(e) => {
        e.preventDefault()
        if (!amount) return
        onSubmit({
          id: crypto.randomUUID(),
          type,
          amount,
          date: new Date(date).toISOString(),
          note,
        })
        setAmount(0)
        setNote('')
      }}
    >
      <h3 className="font-semibold capitalize">{type}</h3>
      <input className="input" type="number" min={1} value={amount || ''} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" />
      <input className="input" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
      <input className="input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" />
      <button className="btn" type="submit">Save</button>
    </form>
  )
}
