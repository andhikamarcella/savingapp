import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
    id: string
    title: React.ReactNode
    content: React.ReactNode
}

interface AccordionProps {
    items: AccordionItem[]
}

export const Accordion = ({ items }: AccordionProps) => {
    const [openId, setOpenId] = useState<string | null>(null)

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <div className="flex flex-col gap-3">
            {items.map((item) => {
                const isOpen = openId === item.id

                return (
                    <div
                        key={item.id}
                        className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                                ? 'border-hk-300 bg-hk-50/50 shadow-[0_4px_14px_0_rgba(236,72,153,0.1)] dark:border-hk-500/50 dark:bg-pink-950/20'
                                : 'border-hk-100 bg-white hover:border-hk-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-pink-950'
                            }`}
                    >
                        <button
                            onClick={() => toggle(item.id)}
                            className="flex justify-between items-center w-full p-4 text-left font-bold text-slate-800 dark:text-slate-200"
                        >
                            <span>{item.title}</span>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="text-hk-400 dark:text-hk-500"
                            >
                                <ChevronDown className="w-5 h-5" />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 text-sm">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )
            })}
        </div>
    )
}
