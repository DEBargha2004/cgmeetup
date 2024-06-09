'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { FieldsContainer, FormCard } from '@/components/custom/form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { tags } from '@/constants/job-filters'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function Softwares () {
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([])
  return (
    <FormCard heading='Softwares' subHeading='Add your softwares'>
      <FieldsContainer className='w-1/2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className='p-2 flex justify-between items-center w-full border rounded 
                          h-10 bg-darkAccent'
            >
              <span>Softwares</span>
              <MaterialSymbolIcon className=''>
                keyboard_arrow_down
              </MaterialSymbolIcon>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='max-h-[300px] overflow-y-auto scroller h-[200px] 
                        w-full space-y-1'
          >
            {tags.map(item => (
              <DropdownMenuItem
                key={item}
                className={cn(
                  'flex justify-start items-center gap-1',
                  selectedSoftwares.includes(item) ? 'bg-lightAccent' : ''
                )}
                onSelect={e => {
                  e.preventDefault()
                  setSelectedSoftwares(prev => {
                    if (prev.includes(item)) {
                      return prev.filter(tag => tag !== item)
                    }
                    return [...prev, item]
                  })
                }}
              >
                <span
                  className={cn(
                    selectedSoftwares.includes(item)
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                >
                  <MaterialSymbolIcon>check</MaterialSymbolIcon>
                </span>
                <span>{item}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='flex flex-wrap gap-2'>
          {selectedSoftwares.map(item => (
            <Badge
              key={item}
              className='bg-lightAccent p-2 flex justify-between items-center gap-1'
            >
              <span>{item}</span>
              <MaterialSymbolIcon
                variant='filled'
                className='text-sm cursor-pointer'
                onClick={() => {
                  setSelectedSoftwares(prev => {
                    return prev.filter(tag => tag !== item)
                  })
                }}
              >
                close
              </MaterialSymbolIcon>
            </Badge>
          ))}
        </div>
        <Button className='w-24 ml-auto'>Save</Button>
      </FieldsContainer>
    </FormCard>
  )
}
