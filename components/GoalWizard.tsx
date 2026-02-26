'use client'

import { DayPicker } from 'react-day-picker'
import { CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { formatCurrency } from '@/lib/currencyFormatter'
import type { Currency, Goal } from '@/lib/types'

const options = [
  { title: 'Emergency Fund', emoji: '💰' },
  { title: 'Gift', emoji: '🎁' },
  { title: 'New Car', emoji: '🚗' },
  { title: 'New House', emoji: '🏠' },
  { title: 'New Phone', emoji: '📱' },
  { title: 'Vacation', emoji: '✈️' },
  { title: 'Other', emoji: '✏️' },
]

export const GoalWizard = ({ onDone }: { onDone: (goal: Goal) => void }) => {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('Emergency Fund')
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

  return (
    <section className="rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold">Step {step} of 3</p>
        <div className="flex items-center gap-2 text-sm">
          {[1, 2, 3].map((n) => <span key={n} className={`${step >= n ? 'text-primary-600' : 'text-slate-400'} transition`}>{n}</span>)}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What are you saving for right now?</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {options.map((option) => (
              <button key={option.title} onClick={() => { setTitle(option.title); setEmoji(option.emoji) }} className={`rounded-xl border p-3 text-left ${title === option.title ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30' : 'border-slate-200 dark:border-slate-700'}`}>
                <p className="text-xl">{option.emoji}</p>
                <p className="text-sm font-medium">{option.title}</p>
              </button>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Custom title" />
            <input className="input" value={emoji} onChange={(e) => setEmoji(e.target.value)} placeholder="Custom emoji" />
          </div>
          <button className="btn" onClick={() => setStep(2)}>Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">How much do you want to save for this goal?</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            <input type="number" className="input" min={1} value={targetAmount || ''} onChange={(e) => setTargetAmount(Number(e.target.value))} placeholder="Amount" />
            <select className="input" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
              <option value="USD">USD</option>
              <option value="IDR">IDR</option>
            </select>
          </div>
          <p className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">{formatCurrency(targetAmount || 0, currency)}</p>
          <button className="btn" disabled={!targetAmount} onClick={() => setStep(3)}>Continue</button>
        </div>
      )}

      {step === 3 && !loading && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Set a target date for your savings goal</h2>
          <div className="rounded-xl border border-slate-200 p-2 dark:border-slate-700">
            <DayPicker mode="single" selected={targetDate} onSelect={setTargetDate} disabled={{ before: today }} />
          </div>
          <p className="flex items-center gap-2 text-primary-700"><CheckCircle2 className="h-5 w-5" />You're all done! Let&apos;s generate your savings plan!</p>
          <button className="btn" disabled={!targetDate} onClick={generate}>Generate Plan</button>
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          <p className="font-medium">Generating your savings plan...</p>
          <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${progress}%` }} /></div>
          {progress >= 100 && <p className="text-primary-700">Your saving plan is ready!</p>}
        </div>
      )}
    </section>
  )
}
