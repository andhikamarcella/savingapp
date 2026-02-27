import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { Fragment } from 'react'

export interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav className="flex items-center space-x-2 text-sm text-hk-400 dark:text-slate-400 font-medium mb-4">
            <Link
                href="/"
                className="flex items-center hover:text-hk-600 dark:hover:text-hk-300 transition-colors"
            >
                <Home className="w-4 h-4" />
            </Link>

            {items.map((item, index) => (
                <Fragment key={index}>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-hk-600 dark:hover:text-hk-300 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-slate-800 dark:text-slate-200 font-bold">
                            {item.label}
                        </span>
                    )}
                </Fragment>
            ))}
        </nav>
    )
}
