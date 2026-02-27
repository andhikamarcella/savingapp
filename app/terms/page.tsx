'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSavingsStore } from '@/store/useSavingsStore'
import { t } from '@/lib/i18n'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

export default function TermsPage() {
  const language = useSavingsStore((s) => s.language)

  return (
    <main className="min-h-screen bg-hk-50 p-4 dark:bg-slate-950 transition-colors duration-300">
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-3xl rounded-3xl bg-white/80 p-8 shadow-sm border border-hk-100 backdrop-blur-md dark:bg-slate-900/80 dark:border-pink-900/50"
      >
        <Breadcrumbs items={[{ label: t('termsUse', language) }]} />
        <h1 className="my-6 text-3xl font-extrabold bg-gradient-to-r from-hk-600 to-hk-400 dark:from-hk-400 dark:to-hk-200 bg-clip-text text-transparent">{t('termsUse', language)}</h1>
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          <p>{t('termsText', language)}</p>
          <p>By using this application, you agree to take full responsibility for any financial decisions made based on the planning tools provided herein.</p>
        </div>
        <Link href="/" className="btn-secondary mt-8 inline-block">{t('back', language)}</Link>
      </motion.section>
    </main>
  )
}
