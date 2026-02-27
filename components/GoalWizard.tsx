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
    <section className="rounded-[2.5rem] bg-white/70 p-8 shadow-[0_8px_30px_rgb(236,72,153,0.06)] backdrop-blur-xl border border-hk-100 dark:border-pink-900/50 dark:bg-slate-900/80 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden relative min-h-[440px]">
      <div className="mb-8 flex items-center justify-between">
        <p className="font-bold text-slate-500 dark:text-slate-400">{t('step', language)} {step} {t('of', language)} 3</p>
        <div className="flex items-center gap-2 text-sm">
          {[1, 2, 3].map((n) => <span key={n} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${step >= n ? 'bg-gradient-to-br from-hk-400 to-hk-500 text-white shadow-[0_4px_14px_0_rgba(236,72,153,0.39)] scale-110' : 'bg-hk-50 text-hk-300 border border-hk-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-500'}`}>{n}</span>)}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-hk-600 to-hk-400 dark:from-white dark:to-hk-200 bg-clip-text text-transparent">{t('whatSavingFor', language)}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {optionsKeyMap.map((option) => {
                const translatedTitle = t(option.key, language)
                return (
                  <button key={option.key} onClick={() => { setTitle(translatedTitle); setEmoji(option.emoji) }} className={`rounded-3xl border-2 p-4 text-left transition-all duration-300 hover:shadow-md ${title === translatedTitle ? 'border-hk-400 bg-hk-50 ring-4 ring-hk-200/50 shadow-[0_4px_14px_0_rgba(236,72,153,0.15)] dark:border-pink-900 dark:bg-pink-950/40 dark:ring-pink-900/30 transform scale-105' : 'border-hk-100 bg-white hover:border-hk-300 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-pink-900'}`}>
                    <p className="text-4xl mb-3 drop-shadow-sm">{option.emoji}</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{translatedTitle}</p>
                  </button>
                )
              })}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 pt-4">
              <input className="input dark:bg-slate-800/80 dark:text-white dark:border-slate-700 focus:border-hk-400" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('customTitle', language)} />
              <input className="input dark:bg-slate-800/80 dark:text-white dark:border-slate-700 focus:border-hk-400" value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder={t('customEmoji', language)} />
            </div>
            <button className="btn w-full py-4 text-lg mt-6" onClick={() => setStep(2)}>{t('continue', language)}</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-hk-600 to-hk-400 dark:from-white dark:to-hk-200 bg-clip-text text-transparent">{t('howMuchSave', language)}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="number" className="input text-lg py-4 dark:bg-slate-800/80 dark:text-white dark:border-slate-700 focus:border-hk-400" min={1} value={targetAmount || ''} onChange={(e) => setTargetAmount(Number(e.target.value))} placeholder={t('amount', language)} />
              <select className="input text-lg py-4 dark:bg-slate-800/80 dark:text-white dark:border-slate-700 focus:border-hk-400 [&>option]:dark:bg-slate-800" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
                <option value="USD">USD ($)</option>
                <option value="IDR">IDR (Rp)</option>
              </select>
            </div>
            <p className="rounded-3xl border-2 border-hk-200/50 bg-gradient-to-br from-hk-50 to-white p-8 text-center text-4xl font-extrabold text-hk-600 dark:border-pink-900/50 dark:from-slate-800/80 dark:to-slate-900/40 dark:text-hk-400 shadow-[0_8px_30px_rgb(236,72,153,0.1)]">{formatCurrency(targetAmount || 0, currency)}</p>
            <div className="flex gap-4 mt-8">
              <button className="btn-secondary w-full py-4 text-lg dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => setStep(1)}>{t('back', language)}</button>
              <button className="btn w-full py-4 text-lg" disabled={!targetAmount} onClick={() => setStep(3)}>{t('continue', language)}</button>
            </div>
          </motion.div>
        )}

        {step === 3 && !loading && (
          <motion.div key="step3" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-hk-600 to-hk-400 dark:from-white dark:to-hk-200 bg-clip-text text-transparent">{t('setTargetDate', language)}</h2>
            <div className="flex justify-center rounded-3xl border-2 border-hk-100 bg-white p-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60">
              <DayPicker
                mode="single"
                selected={targetDate}
                onSelect={setTargetDate}
                disabled={{ before: today }}
                className="bg-hk-50/50 p-4 rounded-2xl shadow-sm border border-hk-100 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-200"
                modifiersClassNames={{ selected: 'bg-hk-500 text-white hover:bg-hk-600', today: 'text-hk-600 font-bold dark:text-hk-400' }}
              />
            </div>
            <p className="flex items-center justify-center gap-2 text-hk-600 dark:text-hk-400 font-bold text-lg pt-2"><CheckCircle2 className="h-6 w-6" />{t('allDone', language)}</p>
            <div className="flex gap-4 mt-6">
              <button className="btn-secondary w-full py-4 text-lg dark:text-slate-200 dark:hover:bg-slate-800" onClick={() => setStep(2)}>{t('back', language)}</button>
              <button className="btn w-full py-4 text-lg" disabled={!targetDate} onClick={generate}>{t('generatePlan', language)}</button>
            </div>
          </motion.div>
        )}

        {loading && (
          <motion.div key="loading" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6 py-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-2xl font-extrabold text-slate-700 dark:text-slate-200 mb-6">{t('generatingPlan', language)}</p>
            <div className="h-6 w-full max-w-md overflow-hidden rounded-full bg-hk-100 dark:bg-slate-800 shadow-inner border-2 border-white dark:border-pink-900/30">
              <div className="h-full rounded-full bg-gradient-to-r from-hk-400 to-hk-500 transition-all duration-75 ease-linear shadow-[0_0_15px_rgba(244,114,182,0.5)]" style={{ width: `${progress}%` }} />
            </div>
            {progress >= 100 && <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-hk-600 dark:text-hk-400 font-bold text-xl mt-8">{t('planReady', language)}</motion.p>}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
