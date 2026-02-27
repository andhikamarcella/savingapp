'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSavingsStore } from '@/store/useSavingsStore'
import { t } from '@/lib/i18n'

export default function PrivacyPage() {
  const language = useSavingsStore((s) => s.language)

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-100 p-4 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-3xl rounded-3xl bg-white/80 p-8 shadow-soft backdrop-blur-md dark:bg-slate-900/80"
      >
        <h1 className="mb-6 text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">{t('privacyPolicy', language)}</h1>
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>{t('privacyText', language)}</p>
          <p>Since data is stored exclusively on your device, we do not collect, share, or sell any personal financial information to third parties.</p>
        </div>
        <Link href="/" className="btn-secondary mt-8 inline-block">{t('back', language)}</Link>
      </motion.section>
    </main>
  )
}
