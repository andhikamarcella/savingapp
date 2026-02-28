import type { Language, ReminderFrequency } from './types'
import { t } from './i18n'

const KEY = 'msp-reminder-interval-id'

const intervalMs = (frequency: ReminderFrequency) => {
  if (frequency === 'daily') return 24 * 60 * 60 * 1000
  if (frequency === 'weekly') return 7 * 24 * 60 * 60 * 1000
  return 30 * 24 * 60 * 60 * 1000
}

export const requestNotificationPermission = async () => {
  if (typeof window === 'undefined' || !('Notification' in window)) return 'denied'
  return Notification.requestPermission()
}

export const stopReminder = () => {
  if (typeof window === 'undefined') return
  const id = window.localStorage.getItem(KEY)
  if (id) {
    window.clearInterval(Number(id))
    window.localStorage.removeItem(KEY)
  }
}

export const triggerNotification = (title: string, body?: string) => {
  if (typeof window === 'undefined' || !('Notification' in window) || Notification.permission !== 'granted') return

  try {
    new Notification(title, { body })
  } catch (e) {
    // Fallback for mobile Chrome/Safari that don't allow new Notification()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, { body }).catch(console.error)
      }).catch(console.error)
    }
  }
}

export const startReminder = (frequency: ReminderFrequency, language: Language) => {
  if (typeof window === 'undefined' || !('Notification' in window)) return false
  stopReminder()

  const id = window.setInterval(() => {
    if (Notification.permission === 'granted') {
      triggerNotification(
        language === 'id' ? 'Waktunya menabung untuk tujuan Anda 🚀' : 'Time to save for your goal 🚀',
        language === 'id' ? 'Yuk cek progress tabunganmu hari ini!' : 'Let\'s check your savings progress today!'
      )
    }
  }, intervalMs(frequency))

  window.localStorage.setItem(KEY, String(id))
  return true
}
