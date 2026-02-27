import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Money Saving Planner Pro',
  description: 'Modern savings planner with local-first tracking and planning.',
  manifest: '/manifest.json',
}

const themeInitScript = `
  (function() {
    try {
      var localValue = localStorage.getItem('money-saving-planner-pro');
      var theme = 'system';
      if (localValue) {
        var state = JSON.parse(localValue).state;
        if (state && state.theme) theme = state.theme;
      }
      var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (_) {}
  })();
`

import { ThemeProvider } from '@/components/ThemeProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
