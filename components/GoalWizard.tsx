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
    <section className="rounded-3xl bg-white/60 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl border border-white/40 dark:border-slate-800/60 dark:bg-slate-900/60 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden relative min-h-[440px]">
      <div className="mb-6 flex items-center justify-between">
        <p className="font-semibold text-slate-500 dark:text-slate-400">{t('step', language)} {step} {t('of', language)} 3</p>
        <div className="flex items-center gap-2 text-sm">
          {[1, 2, 3].map((n) => <span key={n} className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${step >= n ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-md scale-110' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>{n}</span>)}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">{t('whatSavingFor', language)}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {optionsKeyMap.map((option) => {
                const translatedTitle = t(option.key, language)
                return (
                  <button key={option.key} onClick={() => { setTitle(translatedTitle); setEmoji(option.emoji) }} className={`rounded-2xl border p-4 text-left transition-all hover:shadow-md ${title === translatedTitle ? 'border-gold-400 bg-gradient-to-br from-gold-50/50 to-gold-100/50 ring-2 ring-gold-400/30 dark:border-gold-500/50 dark:from-gold-900/40 dark:to-gold-900/10 dark:ring-gold-500/20' : 'border-slate-200 bg-white/50 hover:border-gold-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-gold-700/50'}`}>
                    <p className="text-3xl mb-3 drop-shadow-sm">{option.emoji}</p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{translatedTitle}</p>
                  </button>
                )
              })}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <input className="input dark:bg-slate-800/50 dark:text-white dark:border-slate-700 focus:border-gold-400 dark:focus:border-gold-500" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('customTitle', language)} />
              <input className="input dark:bg-slate-800/50 dark:text-white dark:border-slate-700 focus:border-gold-400 dark:focus:border-gold-500" value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder={t('customEmoji', language)} />
            </div>
            <button className="btn w-full py-4 text-lg mt-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 dark:from-gold-600 dark:to-gold-500 dark:hover:from-gold-500 dark:hover:to-gold-400 dark:text-white shadow-lg shadow-slate-900/10 dark:shadow-gold-900/20 text-white font-medium rounded-xl" onClick={() => setStep(2)}>{t('continue', language)}</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">{t('howMuchSave', language)}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="number" className="input text-lg py-4 dark:bg-slate-800/50 dark:text-white dark:border-slate-700 focus:border-gold-400 dark:focus:border-gold-500" min={1} value={targetAmount || ''} onChange={(e) => setTargetAmount(Number(e.target.value))} placeholder={t('amount', language)} />
              <select className="input text-lg py-4 dark:bg-slate-800/50 dark:text-white dark:border-slate-700 focus:border-gold-400 dark:focus:border-gold-500 [&>option]:dark:bg-slate-800" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
                <option value="USD">USD ($)</option>
                <option value="IDR">IDR (Rp)</option>
              </select>
            </div>
            <p className="rounded-2xl border border-gold-200/50 bg-gradient-to-r from-gold-50 to-white p-6 text-center text-3xl font-bold text-gold-700 dark:border-gold-900/50 dark:from-slate-800/80 dark:to-slate-800/40 dark:text-gold-300 shadow-sm">{formatCurrency(targetAmount || 0, currency)}</p>
            <div className="flex gap-4 mt-6">
              <button className="btn-secondary w-full py-4 text-lg dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => setStep(1)}>{t('back', language)}</button>
              <button className="btn w-full py-4 text-lg bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 dark:from-gold-600 dark:to-gold-500 dark:hover:from-gold-500 dark:hover:to-gold-400 dark:text-white shadow-lg text-white font-medium rounded-xl" disabled={!targetAmount} onClick={() => setStep(3)}>{t('continue', language)}</button>
            </div>
          </motion.div>
        )}

        {step === 3 && !loading && (
          <motion.div key="step3" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">{t('setTargetDate', language)}</h2>
            <div className="flex justify-center rounded-2xl border border-slate-200/60 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/30">
              <DayPicker
                mode="single"
                selected={targetDate}
                onSelect={setTargetDate}
                disabled={{ before: today }}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                modifiersClassNames={{ selected: 'bg-gold-500 text-white hover:bg-gold-600', today: 'text-gold-600 font-bold dark:text-gold-400' }}
              />
            </div>
            <p className="flex items-center justify-center gap-2 text-gold-600 dark:text-gold-400 font-medium text-lg"><CheckCircle2 className="h-6 w-6" />{t('allDone', language)}</p>
            <div className="flex gap-4 mt-6">
              <button className="btn-secondary w-full py-4 text-lg dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => setStep(2)}>{t('back', language)}</button>
              <button className="btn w-full py-4 text-lg bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 dark:from-gold-600 dark:to-gold-500 dark:hover:from-gold-500 dark:hover:to-gold-400 dark:text-white shadow-lg text-white font-medium rounded-xl" disabled={!targetDate} onClick={generate}>{t('generatePlan', language)}</button>
            </div>
          </motion.div>
        )}

        {loading && (
          <motion.div key="loading" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6 py-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-4">{t('generatingPlan', language)}</p>
            <div className="h-4 w-full max-w-md overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner">
              <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-75 ease-linear" style={{ width: `${progress}%` }} />
            </div>
            {progress >= 100 && <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-gold-600 dark:text-gold-400 font-bold text-xl mt-6">{t('planReady', language)}</motion.p>}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
