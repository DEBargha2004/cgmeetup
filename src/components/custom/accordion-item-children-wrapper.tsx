import { cn } from '@/lib/utils'

export default function AccordionItemChildWrapper ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex justify-start items-center gap-2', className)}>
      {children}
    </div>
  )
}
