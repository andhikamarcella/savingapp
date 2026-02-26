interface Props {
  value: number
}

export const ProgressBar = ({ value }: Props) => (
  <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700">
    <div
      className="h-full rounded-full bg-primary-600 transition-all duration-500"
      style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
    />
  </div>
)
