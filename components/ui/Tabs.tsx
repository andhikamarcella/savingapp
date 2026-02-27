import { useState } from 'react'

export interface TabOption {
    value: string
    label: string
}

interface TabsProps {
    options: TabOption[]
    activeValue: string
    onChange: (value: string) => void
    disabled?: boolean
}

export const Tabs = ({ options, activeValue, onChange, disabled }: TabsProps) => {
    return (
        <div className="flex p-1 bg-hk-50 dark:bg-slate-800 rounded-2xl border-2 border-hk-100 dark:border-pink-900 w-full overflow-hidden shadow-sm">
            {options.map((option) => (
                <button
                    key={option.value}
                    value={option.value}
                    onClick={() => onChange(option.value)}
                    disabled={disabled}
                    className={`flex-1 text-sm font-bold py-2 px-3 rounded-xl transition-all duration-300 ${activeValue === option.value
                            ? 'bg-white shadow-md text-hk-600 dark:bg-pink-900 dark:text-hk-100 transform scale-100'
                            : 'text-hk-400 hover:bg-hk-100 dark:text-slate-400 dark:hover:bg-slate-700/50 hover:text-hk-500 scale-95'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}
