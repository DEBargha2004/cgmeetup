import { cn } from '@/lib/utils'
import { HTMLProps } from 'react'

export default function MaterialSymbolIcon ({
  children,
  className,
  ...props
}: {
  children: string
  variant?: 'outlined' | 'filled'
} & HTMLProps<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'material-symbols-outlined text-xl max-w-6 overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
