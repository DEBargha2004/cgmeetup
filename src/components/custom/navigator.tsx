import { MaterialSymbolIcon } from '@/components/custom'
import { cn } from '@/lib/utils'
import { IconType } from '@/types/icon'
import { HTMLProps } from 'react'

export default function Navigator ({
  Icon,
  className,
  iconClassName,
  ...props
}: { Icon: IconType; iconClassName?: string } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `h-10 w-10  top-1/2 -translate-y-1/2 flex justify-center items-center px-4
            hover:bg-lightAccent/20 transition-all cursor-pointer`,
        className
      )}
      {...props}
    >
      <Icon className={cn('h-8e', iconClassName)} />
    </div>
  )
}
