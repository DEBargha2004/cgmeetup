import '@/app/global-icons-outlined.css'
import { cn } from '@/lib/utils'
import { HTMLProps } from 'react'

export default function MaterialSymbolIconOutlined ({
  children,
  className,
  ...props
}: {
  children: string
} & HTMLProps<HTMLSpanElement>) {
  return (
    <span
      className={cn('material-symbols-outlined text-xl opacity-60', className)}
      {...props}
    >
      {children}
    </span>
  )
}
