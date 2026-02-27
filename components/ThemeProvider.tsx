'use client'

import { useEffect } from 'react'
import { useSavingsStore } from '@/store/useSavingsStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useSavingsStore((state) => state.theme)

    useEffect(() => {
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
        document.documentElement.classList.toggle('dark', isDark)
    }, [theme])

    return <>{children}</>
}
