import { Monitor, Moon, Sun } from 'lucide-react'
import { usePlannerStore } from '../store/usePlannerStore'

export const ThemeLanguageBar = () => {
  const language = usePlannerStore((s) => s.language)
  const theme = usePlannerStore((s) => s.theme)
  const setLanguage = usePlannerStore((s) => s.setLanguage)
  const setTheme = usePlannerStore((s) => s.setTheme)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/80 p-3 shadow-soft dark:bg-slate-900/70">
      <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
        {(['en', 'id'] as const).map((code) => (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            className={`rounded-lg px-3 py-1 text-sm font-medium transition ${language === code ? 'bg-primary-600 text-white' : 'text-slate-600 dark:text-slate-200'}`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
        {[
          { value: 'light', icon: <Sun className="h-4 w-4" /> },
          { value: 'dark', icon: <Moon className="h-4 w-4" /> },
          { value: 'system', icon: <Monitor className="h-4 w-4" /> },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setTheme(item.value as 'light' | 'dark' | 'system')}
            className={`rounded-lg p-2 transition ${theme === item.value ? 'bg-primary-600 text-white' : 'text-slate-600 dark:text-slate-200'}`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
