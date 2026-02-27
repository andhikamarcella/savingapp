'use client'

import { useToastStore } from '@/store/useToastStore'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export const ToastContainer = () => {
    const toasts = useToastStore((s) => s.toasts)
    const removeToast = useToastStore((s) => s.removeToast)

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className={`pointer-events-auto flex items-start gap-3 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 w-80 backdrop-blur-md ${toast.type === 'error'
                                ? 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950/90 dark:text-red-100 dark:border-red-900'
                                : 'bg-hk-50 text-hk-900 border-hk-200 dark:bg-pink-950/90 dark:text-hk-100 dark:border-hk-900'
                            }`}
                    >
                        <div className="flex-1">
                            <h4 className="font-bold text-sm">{toast.title}</h4>
                            {toast.description && (
                                <p className="text-xs opacity-80 mt-1">{toast.description}</p>
                            )}
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
