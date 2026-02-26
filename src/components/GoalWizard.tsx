import { CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { formatCurrency } from '../lib/format'
import type { Currency, GoalType } from '../lib/types'

const options = [
  { title: 'Emergency Fund', emoji: '💰' },
  { title: 'Gift', emoji: '🎁' },
  { title: 'New Car', emoji: '🚗' },
  { title: 'New House', emoji: '🏠' },
  { title: 'New Phone', emoji: '📱' },
  { title: 'Vacation', emoji: '✈️' },
  { title: 'Other', emoji: '✏️' },
]

interface Props {
  onComplete: (goal: GoalType) => void
}

export const GoalWizard = ({ onComplete }: Props) => {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('Emergency Fund')
  const [emoji, setEmoji] = useState('💰')
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState<Currency>('USD')
  const [targetDate, setTargetDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(1)

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  const triggerLoading = () => {
    setLoading(true)
    let pct = 1
    const interval = setInterval(() => {
      pct += 7
      setProgress(Math.min(pct, 100))
      if (pct >= 100) {
        clearInterval(interval)
        const goal: GoalType = {
          id: crypto.randomUUID(),
          title,
          emoji,
          targetAmount: amount,
          currency,
          targetDate,
          planType: 'monthly',
          createdAt: new Date().toISOString(),
          archived: false,
        }
        setTimeout(() => onComplete(goal), 350)
      }
    }, 90)
  }

  return (
    <section className="space-y-5 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Step {step} of 3</h2>
        <div className="h-2 w-40 rounded-full bg-slate-200 dark:bg-slate-700">
          <div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">What are you saving for right now?</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {options.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  setTitle(item.title)
                  setEmoji(item.emoji)
                }}
                className={`rounded-xl border p-3 text-left transition ${title === item.title ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/40' : 'border-slate-200 dark:border-slate-700'}`}
              >
                <div className="text-xl">{item.emoji}</div>
                <p className="text-sm font-medium">{item.title}</p>
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="input" placeholder="Custom title" />
            <input value={emoji} onChange={(e) => setEmoji(e.target.value)} className="input" placeholder="Custom emoji/icon" />
          </div>
          <button className="btn" onClick={() => setStep(2)}>Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">How much do you want to save for this goal?</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="number"
              className="input"
              min={1}
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Amount"
            />
            <select value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="input">
              <option value="USD">USD</option>
              <option value="IDR">IDR</option>
            </select>
          </div>
          <p className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">{formatCurrency(amount || 0, currency)}</p>
          <button className="btn" disabled={!amount} onClick={() => setStep(3)}>Continue</button>
        </div>
      )}

      {step === 3 && !loading && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Set a target date for your savings goal</h3>
          <input type="date" min={minDate} className="input" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          <div className="flex items-center gap-2 text-primary-700 dark:text-primary-500">
            <CheckCircle2 className="h-5 w-5" />
            <p>You're all done! Let's generate your savings plan!</p>
          </div>
          <button className="btn" disabled={!targetDate} onClick={triggerLoading}>Generate Plan</button>
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          <p className="font-medium">Generating your savings plan...</p>
          <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          {progress >= 100 && <p className="text-primary-700 dark:text-primary-500">Your saving plan is ready!</p>}
        </div>
      )}
    </section>
  )
}
