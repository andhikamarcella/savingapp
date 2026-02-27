import React from 'react'

interface RadioOption {
    value: string
    label: string
}

interface RadioGroupProps {
    options: RadioOption[]
    value: string
    onChange: (value: string) => void
    name: string
}

export const RadioGroup = ({ options, value, onChange, name }: RadioGroupProps) => {
    return (
        <div className="flex flex-col gap-3">
            {options.map((option) => (
                <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${value === option.value
                            ? 'border-hk-400 bg-hk-50 shadow-[0_4px_14px_0_rgba(236,72,153,0.15)] dark:border-hk-600 dark:bg-pink-900/30'
                            : 'border-slate-200 hover:border-hk-200 hover:bg-white dark:border-slate-700 dark:hover:border-pink-900 dark:hover:bg-slate-800'
                        }`}
                >
                    <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${value === option.value
                                ? 'border-hk-500 dark:border-hk-400'
                                : 'border-slate-300 dark:border-slate-600'
                            }`}
                    >
                        {value === option.value && (
                            <div className="w-2.5 h-2.5 rounded-full bg-hk-500 dark:bg-hk-400 scale-in-center" />
                        )}
                    </div>
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={() => onChange(option.value)}
                        className="hidden"
                    />
                    <span className={`font-medium ${value === option.value ? 'text-hk-900 dark:text-hk-100' : 'text-slate-600 dark:text-slate-300'}`}>
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    )
}
