'use client'

import { useState } from 'react'
import type { Transaction, Currency } from '@/lib/types'
import { motion } from 'framer-motion'
import { t } from '@/lib/i18n'
import { useSavingsStore } from '@/store/useSavingsStore'

export const TransactionForm = ({ type, currency, onSubmit }: { type: 'deposit' | 'withdraw'; currency: Currency; onSubmit: (tx: Transaction) => void }) => {
  const language = useSavingsStore((s) => s.language)
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16))
  const [note, setNote] = useState('')

  const symbol = currency === 'IDR' ? 'Rp' : '$'
  const title = type === 'deposit' ? t('addSaving', language) : t('withdraw', language)
  const bgColors = type === 'deposit' ? 'from-hk-50/80 to-hk-100/50 dark:from-pink-900/10 dark:to-pink-900/5 dark:border-pink-900/50' : 'from-slate-50/80 to-slate-100/50 dark:from-slate-800/80 dark:to-slate-900/50 dark:border-slate-700'

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`space-y-4 rounded-3xl border border-white/50 bg-gradient-to-br p-6 shadow-sm backdrop-blur-md ${bgColors} mt-4 overflow-hidden`}
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
      <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-400 dark:text-slate-500">{symbol}</span>
          <input className="input pl-10 text-lg dark:bg-slate-800/80 dark:border-slate-700/80 dark:text-white" type="number" min={1} value={amount || ''} onChange={(e) => setAmount(Number(e.target.value))} placeholder={t('amount', language)} />
        </div>
        <input className="input text-lg dark:bg-slate-800/80 dark:border-slate-700/80 dark:text-white" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <input className="input flex-1 dark:bg-slate-800/80 dark:border-slate-700/80 dark:text-white" value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('note', language)} />
        <button className="btn sm:w-auto w-full px-8 py-3 text-base shadow-lg bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 dark:from-hk-600 dark:to-hk-500 dark:hover:from-hk-500 dark:hover:to-hk-400" type="submit">{t('save', language)}</button>
      </div>
    </motion.form>
  )
}
