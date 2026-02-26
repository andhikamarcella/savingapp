import type { ReminderFrequency } from './types'

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

export const startReminder = (frequency: ReminderFrequency) => {
  if (typeof window === 'undefined' || !('Notification' in window)) return false
  stopReminder()
  const id = window.setInterval(() => {
    if (Notification.permission === 'granted') {
      new Notification('Time to save for your goal 🚀')
    }
  }, intervalMs(frequency))
  window.localStorage.setItem(KEY, String(id))
  return true
}
