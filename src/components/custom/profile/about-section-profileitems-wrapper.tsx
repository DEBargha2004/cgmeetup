import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function AboutSectionItemsWrapper ({
  children,
  title,
  className
}: {
  title: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className='p-3 rounded-lg bg-accent px-6 flex flex-col justify-between 
    items-center gap-4'
    >
      <h1 className='text-2xl font-semibold'>{title}</h1>
      <Separator className='h-[2px]' />
      <div
        className={cn('text-white opacity-60 font-medium w-full', className)}
      >
        {children}
      </div>
    </div>
  )
}
