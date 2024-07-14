'use client'

import {
  AccordionItemChildWrapper,
  ClearButton,
  MaterialSymbolIcon
} from '@/components/custom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { location, medium, tags } from '@/constants/job-filters'
import { cn } from '@/lib/utils'
import { Check, Close, KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'

export default function Filter () {
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  return (
    <Accordion type='multiple' defaultValue={[]}>
      <AccordionItem value='category'>
        <AccordionTrigger className='px-2'>Category</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className='p-2 flex justify-between items-center w-full border rounded 
                          h-10 bg-darkAccent'
              >
                <span>Category</span>
                <KeyboardArrowDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='max-h-[300px] overflow-y-auto scroller h-[200px] 
                        w-full space-y-1 min-w-[250px] -translate-y-2'
              align='end'
            >
              {medium.map(item => (
                <DropdownMenuItem
                  key={item}
                  className={cn(
                    'flex justify-start items-center gap-1',
                    selectedCategories.includes(item) ? 'bg-lightAccent' : ''
                  )}
                  onSelect={e => {
                    e.preventDefault()
                    setSelectedCategories(prev => {
                      if (prev.includes(item)) {
                        return prev.filter(tag => tag !== item)
                      }
                      return [...prev, item]
                    })
                  }}
                >
                  <span
                    className={cn(
                      selectedCategories.includes(item)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  >
                    <Check />
                  </span>
                  <span>{item}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='flex flex-wrap gap-2'>
            {selectedCategories.map(item => (
              <Badge
                key={item}
                className='bg-lightAccent p-2 flex justify-between items-center gap-1'
              >
                <span>{item}</span>
                <Close
                  className='h-4 cursor-pointer'
                  onClick={() => {
                    setSelectedCategories(prev => {
                      return prev.filter(tag => tag !== item)
                    })
                  }}
                />
              </Badge>
            ))}
          </div>
          {/* <ClearButton /> */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='software'>
        <AccordionTrigger className='px-2'>Software</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className='p-2 flex justify-between items-center w-full border rounded 
                          h-10 bg-darkAccent'
              >
                <span>Software</span>
                <KeyboardArrowDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='max-h-[300px] overflow-y-auto scroller h-[200px] 
                        w-full space-y-1 -translate-y-2'
              align='end'
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
                    <Check />
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
                <Close
                  className='h-4 cursor-pointer'
                  onClick={() => {
                    setSelectedSoftwares(prev => {
                      return prev.filter(tag => tag !== item)
                    })
                  }}
                />
              </Badge>
            ))}
          </div>
          {/* <ClearButton /> */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='skills'>
        <AccordionTrigger className='px-2'>Skills</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className='p-2 flex justify-between items-center w-full border rounded 
                          h-10 bg-darkAccent'
              >
                <span>Skills</span>
                <KeyboardArrowDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='max-h-[300px] overflow-y-auto scroller h-[200px] 
                        w-full space-y-1 -translate-y-2'
              align='end'
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
                      selectedSkills.includes(item)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  >
                    <Check />
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
                <Close
                  className='h-4 cursor-pointer'
                  onClick={() => {
                    setSelectedSkills(prev => {
                      return prev.filter(tag => tag !== item)
                    })
                  }}
                />
              </Badge>
            ))}
          </div>
          {/* <ClearButton /> */}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='location'>
        <AccordionTrigger className='px-2'>Location</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <Input placeholder='Country' />
          <Input placeholder='City' />
          {/* <ClearButton /> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
