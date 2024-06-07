import { cn } from '@/lib/utils'
import { HTMLProps } from 'react'

export default function FieldsContainer ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col justify-start gap-4 items-stretch mx-auto py-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
