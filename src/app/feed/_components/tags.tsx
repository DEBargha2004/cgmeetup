'use client'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { sample_cateories } from '@/constants/categories'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function Tags () {
  const [selectedTags, setSelectedTags] = useState<string[]>(['All Posts'])
  return (
    <Carousel className='w-full rounded '>
      <CarouselContent className='flex'>
        {['All Posts', ...sample_cateories.slice(0, 1)].map(category => (
          <CarouselItem
            className='basis-auto flex justify-center'
            key={category}
          >
            <Button
              variant={'outline'}
              className={cn(
                `whitespace-nowrap w-full flex justify-center 
                   select-none bg-transparent hover:bg-inherit`,
                selectedTags.includes(category)
                  ? 'bg-primary hover:bg-primary'
                  : ''
              )}
              onClick={() => {
                setSelectedTags(prev => {
                  if (prev.includes(category)) {
                    return prev.filter(tag => tag !== category)
                  }
                  return [...prev, category]
                })
              }}
            >
              {category}
            </Button>
          </CarouselItem>
        ))}
        <CarouselItem className='basis-auto flex justify-center'>
          <Button
            variant={'outline'}
            className='whitespace-nowrap w-full flex justify-center  
                   select-none bg-transparent'
          >
            <span className='material-symbols-outlined'>work_history</span>
            <span className='material-symbols-outlined'>add</span>
          </Button>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
