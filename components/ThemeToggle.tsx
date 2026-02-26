'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useSavingsStore } from '@/store/useSavingsStore'
import type { ThemeMode } from '@/lib/types'

export const ThemeToggle = () => {
  const theme = useSavingsStore((s) => s.theme)
  const setTheme = useSavingsStore((s) => s.setTheme)

  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
      {[
        { value: 'light', icon: Sun },
        { value: 'dark', icon: Moon },
        { value: 'system', icon: Monitor },
      ].map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value as ThemeMode)}
          className={`rounded-lg p-2 ${theme === value ? 'bg-primary-600 text-white' : 'text-slate-600 dark:text-slate-200'}`}
          aria-label={`${value} theme`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}
