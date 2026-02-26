'use client'

import { useSavingsStore } from '@/store/useSavingsStore'

export const LanguageToggle = () => {
  const language = useSavingsStore((s) => s.language)
  const setLanguage = useSavingsStore((s) => s.setLanguage)

  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
      {(['en', 'id'] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`rounded-lg px-3 py-1 text-sm ${language === code ? 'bg-primary-600 text-white' : 'text-slate-600 dark:text-slate-200'}`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
