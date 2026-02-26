import type { Language } from './types'

export const text: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'Money Saving Planner',
    wizardReady: "You're all done! Let's generate your savings plan!",
    pickPlan: 'Pick your plan',
    pickPlanSub: 'Pick a saving that feels right for you. You can change it anytime.',
    dashboard: 'Dashboard',
    settings: 'Settings',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
  },
  id: {
    appTitle: 'Perencana Menabung',
    wizardReady: 'Semua selesai! Mari buat rencana menabungmu!',
    pickPlan: 'Pilih rencanamu',
    pickPlanSub: 'Pilih metode menabung yang cocok untukmu. Bisa diubah kapan saja.',
    dashboard: 'Dasbor',
    settings: 'Pengaturan',
    privacy: 'Kebijakan Privasi',
    terms: 'Syarat Penggunaan',
  },
}
