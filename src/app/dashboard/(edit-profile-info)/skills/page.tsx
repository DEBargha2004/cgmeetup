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

export default function Skills () {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  return (
    <FormCard heading='Skills' subHeading='Add your skills'>
      <FieldsContainer className='w-1/2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className='p-2 flex justify-between items-center w-full border rounded 
                          h-10 bg-darkAccent'
            >
              <span>Skills</span>
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
                  selectedSkills.includes(item) ? 'bg-lightAccent' : ''
                )}
                onSelect={e => {
                  e.preventDefault()
                  setSelectedSkills(prev => {
                    if (prev.includes(item)) {
                      return prev.filter(tag => tag !== item)
                    }
                    return [...prev, item]
                  })
                }}
              >
                <span
                  className={cn(
                    selectedSkills.includes(item) ? 'opacity-100' : 'opacity-0'
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
          {selectedSkills.map(item => (
            <Badge
              key={item}
              className='bg-lightAccent p-2 flex justify-between items-center gap-1'
            >
              <span>{item}</span>
              <MaterialSymbolIcon
                variant='filled'
                className='text-sm cursor-pointer'
                onClick={() => {
                  setSelectedSkills(prev => {
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
