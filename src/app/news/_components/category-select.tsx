'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { sample_cateories } from '@/constants/categories'
import { cn } from '@/lib/utils'
import { useWindowSize } from '@uidotdev/usehooks'

export default function CategorySelect () {
  const windowSize = useWindowSize()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='bg-lightAccent w-fit'>
          <MaterialSymbolIcon className='mr-2 opacity-100'>
            news
          </MaterialSymbolIcon>
          All Category
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={
          windowSize.width
            ? windowSize.width > 480
              ? 'right'
              : 'bottom'
            : 'top'
        }
        className='space-y-4 bg-lightAccent rounded-sm'
      >
        <Input className='h-[37px] w-full' />
        <div className='h-[300px] overflow-y-auto scroller space-y-2 w-[260px]'>
          {['All', ...sample_cateories].map(item => (
            <div
              key={item}
              className={cn(
                'h-10 bg-darkAccent flex justify-center items-center text-sm cursor-pointer rounded-sm',
                item === 'All' ? 'bg-primary' : ''
              )}
            >
              {item}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
