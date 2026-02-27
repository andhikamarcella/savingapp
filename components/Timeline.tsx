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
      className="rounded-3xl bg-white/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white/40 dark:border-slate-800/60 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] mt-5"
    >
      <h2 className="mb-4 text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">{t('timeline', language)}</h2>
      <ul className="space-y-3">
        {transactions.map((tx, i) => (
          <motion.li
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-hk-100/50 p-4 text-sm dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/40 shadow-sm"
          >
            <p className={tx.type === 'deposit' ? 'text-hk-600 dark:text-hk-400 font-bold text-base' : 'text-hk-red-500 font-bold text-base'}>
              {tx.type === 'deposit' ? '+' : '-'} {formatCurrency(tx.amount, currency)}
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">{new Date(tx.date).toLocaleString()}</p>
            {tx.note && <p className="mt-2 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">{tx.note}</p>}
          </motion.li>
        ))}
        {!transactions.length && <li className="text-sm text-slate-500 italic px-2">{t('noTransactions', language)}</li>}
      </ul>
    </motion.section>
  )
}
