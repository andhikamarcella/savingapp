'use client'

import { formatCurrency } from '@/lib/currencyFormatter'
import type { Currency, Transaction } from '@/lib/types'
import { motion } from 'framer-motion'
import { useSavingsStore } from '@/store/useSavingsStore'
import { t } from '@/lib/i18n'

export const Timeline = ({ currency, transactions }: { currency: Currency; transactions: Transaction[] }) => {
  const language = useSavingsStore((s) => s.language)

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white/80 p-5 shadow-soft backdrop-blur-md dark:bg-slate-900/80"
    >
      <h2 className="mb-3 text-lg font-semibold">{t('timeline', language)}</h2>
      <ul className="space-y-2">
        {transactions.map((tx, i) => (
          <motion.li
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700/50 bg-white dark:bg-slate-800/50"
          >
            <p className={tx.type === 'deposit' ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium'}>
              {tx.type === 'deposit' ? '+' : '-'} {tx.type} {formatCurrency(tx.amount, currency)}
            </p>
            <p className="text-slate-500 dark:text-slate-400">{new Date(tx.date).toLocaleString()}</p>
            {tx.note && <p className="mt-1 text-slate-600 dark:text-slate-300">{tx.note}</p>}
          </motion.li>
        ))}
        {!transactions.length && <li className="text-sm text-slate-500 italic">{t('noTransactions', language)}</li>}
      </ul>
    </motion.section>
  )
}
