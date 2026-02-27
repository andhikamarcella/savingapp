'use client'

import { DayPicker } from 'react-day-picker'
import { CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { formatCurrency } from '@/lib/currencyFormatter'
import type { Currency, Goal } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { useSavingsStore } from '@/store/useSavingsStore'
import { t } from '@/lib/i18n'

const optionsKeyMap = [
  { key: 'emergencyFund', emoji: '💰' },
  { key: 'gift', emoji: '🎁' },
  { key: 'newCar', emoji: '🚗' },
  { key: 'newHouse', emoji: '🏠' },
  { key: 'newPhone', emoji: '📱' },
  { key: 'vacation', emoji: '✈️' },
  { key: 'other', emoji: '✏️' },
] as const

export const GoalWizard = ({ onDone }: { onDone: (goal: Goal) => void }) => {
  const language = useSavingsStore((s) => s.language)
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState(t('emergencyFund', language))
  const [emoji, setEmoji] = useState('💰')
  const [targetAmount, setTargetAmount] = useState(0)
  const [currency, setCurrency] = useState<Currency>('USD')
  const [targetDate, setTargetDate] = useState<Date | undefined>()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(1)

  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const generate = () => {
    setLoading(true)
    let pct = 1
    const timer = window.setInterval(() => {
      pct += 5
      setProgress(Math.min(100, pct))
      if (pct >= 100 && targetDate) {
        window.clearInterval(timer)
        window.setTimeout(() =>
          onDone({
            id: crypto.randomUUID(),
            title,
            emoji,
            targetAmount,
            savedAmount: 0,
            currency,
            targetDate: targetDate.toISOString(),
            planType: 'monthly',
            archived: false,
            transactions: [],
          }),
          350)
      }
    }, 80)
  }

  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <section className="rounded-3xl bg-white/80 p-6 shadow-soft backdrop-blur-md dark:bg-slate-900/80 overflow-hidden relative min-h-[400px]">
      <div className="mb-6 flex items-center justify-between">
        <p className="font-semibold text-slate-500 dark:text-slate-400">{t('step', language)} {step} {t('of', language)} 3</p>
        <div className="flex items-center gap-2 text-sm">
          {[1, 2, 3].map((n) => <span key={n} className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${step >= n ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>{n}</span>)}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">{t('whatSavingFor', language)}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {optionsKeyMap.map((option) => {
                const translatedTitle = t(option.key, language)
                return (
                  <button key={option.key} onClick={() => { setTitle(translatedTitle); setEmoji(option.emoji) }} className={`rounded-xl border p-4 text-left transition-all hover:shadow-md ${title === translatedTitle ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/20 dark:bg-primary-950/30' : 'border-slate-200 bg-white/50 hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800/50'}`}>
                    <p className="text-2xl mb-2">{option.emoji}</p>
                    <p className="text-sm font-semibold">{translatedTitle}</p>
                  </button>
                )
              })}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('customTitle', language)} />
              <input className="input" value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder={t('customEmoji', language)} />
            </div>
            <button className="btn w-full py-4 text-lg mt-4" onClick={() => setStep(2)}>{t('continue', language)}</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">{t('howMuchSave', language)}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <input type="number" className="input text-lg py-3" min={1} value={targetAmount || ''} onChange={(e) => setTargetAmount(Number(e.target.value))} placeholder={t('amount', language)} />
              <select className="input text-lg py-3" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
                <option value="USD">USD ($)</option>
                <option value="IDR">IDR (Rp)</option>
              </select>
            </div>
            <p className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center text-xl font-bold text-slate-700 dark:border-slate-800/50 dark:bg-slate-800/20 dark:text-slate-200">{formatCurrency(targetAmount || 0, currency)}</p>
            <div className="flex gap-3 mt-4">
              <button className="btn-secondary w-full py-4 text-lg" onClick={() => setStep(1)}>{t('back', language)}</button>
              <button className="btn w-full py-4 text-lg" disabled={!targetAmount} onClick={() => setStep(3)}>{t('continue', language)}</button>
            </div>
          </motion.div>
        )}

        {step === 3 && !loading && (
          <motion.div key="step3" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">{t('setTargetDate', language)}</h2>
            <div className="flex justify-center rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700/50 dark:bg-slate-800/20">
              <DayPicker mode="single" selected={targetDate} onSelect={setTargetDate} disabled={{ before: today }} className="bg-white p-4 rounded-xl shadow-sm dark:bg-slate-800" />
            </div>
            <p className="flex items-center justify-center gap-2 text-emerald-600 font-medium"><CheckCircle2 className="h-5 w-5" />{t('allDone', language)}</p>
            <div className="flex gap-3 mt-4">
              <button className="btn-secondary w-full py-4 text-lg" onClick={() => setStep(2)}>{t('back', language)}</button>
              <button className="btn w-full py-4 text-lg" disabled={!targetDate} onClick={generate}>{t('generatePlan', language)}</button>
            </div>
          </motion.div>
        )}

        {loading && (
          <motion.div key="loading" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6 py-8 text-center flex flex-col items-center justify-center min-h-[250px]">
            <p className="text-xl font-bold text-slate-700 dark:text-slate-200">{t('generatingPlan', language)}</p>
            <div className="h-4 w-full max-w-md overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-75 ease-linear" style={{ width: `${progress}%` }} />
            </div>
            {progress >= 100 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-600 font-bold text-lg">{t('planReady', language)}</motion.p>}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
