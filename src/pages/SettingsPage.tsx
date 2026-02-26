import { usePlannerStore } from '../store/usePlannerStore'

interface Props {
  onOpenPrivacy: () => void
  onOpenTerms: () => void
}

export const SettingsPage = ({ onOpenPrivacy, onOpenTerms }: Props) => {
  const archiveGoal = usePlannerStore((s) => s.archiveGoal)
  const deleteGoal = usePlannerStore((s) => s.deleteGoal)
  const currencyDisplay = usePlannerStore((s) => s.currencyDisplay)
  const setCurrencyDisplay = usePlannerStore((s) => s.setCurrencyDisplay)
  return (
    <section className="space-y-3 rounded-3xl bg-white p-5 shadow-soft dark:bg-slate-900">
      <h2 className="text-lg font-semibold">Settings</h2>
      <div className="space-y-2 text-sm">
        <label className="block">Currency display formatting</label>
        <select className="input" value={currencyDisplay} onChange={(e) => setCurrencyDisplay(e.target.value as 'symbol' | 'code')}>
          <option value="symbol">Symbol ($ / Rp)</option>
          <option value="code">Code (USD / IDR)</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={archiveGoal}>Archive goal</button>
        <button className="btn-secondary" onClick={deleteGoal}>Delete goal</button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="btn-secondary" onClick={onOpenPrivacy}>Privacy Policy</button>
        <button className="btn-secondary" onClick={onOpenTerms}>Terms of Use</button>
      </div>
    </section>
  )
}
