import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import MaterialSymbolIcon from '../material-symbol-icon'

export default function AboutSectionItemsWrapper ({
  children,
  title,
  className,
  edit
}: {
  title: string
  children?: React.ReactNode
  edit?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className='p-3 rounded-lg bg-card px-6 flex flex-col justify-between 
    items-center gap-4'
    >
      <div className={cn('w-full flex justify-between')}>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        {edit}
      </div>
      <Separator className='bg-darkAccent opacity-40' />
      <div
        className={cn('text-white opacity-60 font-medium w-full', className)}
      >
        {children}
      </div>
    </div>
  )
}
