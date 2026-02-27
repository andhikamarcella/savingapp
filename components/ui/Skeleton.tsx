import { HTMLAttributes } from 'react'

export const Skeleton = ({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={`animate-pulse rounded-2xl bg-hk-100/50 dark:bg-slate-800/50 ${className}`}
            {...props}
        />
    )
}
