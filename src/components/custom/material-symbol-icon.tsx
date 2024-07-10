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
        'material-symbols-outlined text-xl w-5 overflow-hidden shrink-0 grid place-content-center',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
