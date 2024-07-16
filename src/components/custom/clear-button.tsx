import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '../ui/button'

export default function ClearButton ({
  className,
  children = 'Clear',
  ...props
}: { className?: string } & ButtonProps) {
  return (
    <div className='w-full flex'>
      <Button
        className={cn(
          'w-fit min-w-24 ml-auto h-8 bg-lightAccent border-border border-2 rounded-sm hover:bg-darkAccent/40',
          className
        )}
        variant={'outline'}
        {...props}
      >
        {children}
      </Button>
    </div>
  )
}
