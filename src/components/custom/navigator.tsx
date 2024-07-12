import { MaterialSymbolIcon } from '@/components/custom'
import { cn } from '@/lib/utils'
import { HTMLProps } from 'react'

export default function Navigator ({
  icon,
  className,
  iconClassName,
  ...props
}: { icon: string; iconClassName?: string } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `h-10 w-10  top-1/2 -translate-y-1/2 flex justify-center items-center px-4
            hover:bg-lightAccent/20 transition-all cursor-pointer`,
        className
      )}
      {...props}
    >
      <MaterialSymbolIcon
        className={cn('text-2xl opacity-100 select-none', iconClassName)}
      >
        {icon}
      </MaterialSymbolIcon>
    </div>
  )
}
