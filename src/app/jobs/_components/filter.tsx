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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  expertise_level,
  industry,
  job_type,
  location,
  medium,
  tags
} from '@/constants/job-filters'
import { cn } from '@/lib/utils'
import { Check, Close, KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'

export default function Filter () {
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  return (
    <Accordion type='multiple' defaultValue={['location', 'job_type']}>
      <AccordionItem value='job_type'>
        <AccordionTrigger className='px-2'>Job Type</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Job Type' />
            </SelectTrigger>
            <SelectContent>
              {job_type.map(item => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='expertise_level'>
        <AccordionTrigger className='px-2'>Level of Expertise</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Expertise Level' />
            </SelectTrigger>
            <SelectContent>
              {expertise_level.map(item => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='category'>
        <AccordionTrigger className='px-2'>Category</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='category' />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Input placeholder='position' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[250px] max-h-[200px] overflow-y-auto scroller'>
              {industry.map(item => (
                <DropdownMenuItem
                  key={item}
                  onSelect={e => {
                    e.preventDefault()
                    setSelectedIndustries(prev =>
                      prev.includes(item)
                        ? prev.filter(i => i !== item)
                        : [...prev, item]
                    )
                  }}
                >
                  <div className='flex justify-start items-center gap-2'>
                    <div className='w-4 h-4 flex justify-center items-center'>
                      {selectedIndustries.includes(item) ? <Check /> : null}
                    </div>
                    {item}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='flex flex-wrap gap-2'>
            {selectedIndustries.map(item => (
              <Badge
                key={item}
                className='bg-lightAccent p-2 flex justify-between items-center gap-1'
              >
                <span>{item}</span>
                <Close
                  className='cursor-pointer h-[14px]'
                  onClick={() => {
                    setSelectedIndustries(prev => {
                      return prev.filter(tag => tag !== item)
                    })
                  }}
                />
              </Badge>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='skills'>
        <AccordionTrigger className='px-2'>Skills</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Input placeholder='skills' />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[250px] max-h-[200px] overflow-y-auto scroller'>
              {medium.map(item => (
                <DropdownMenuItem
                  key={item}
                  onSelect={e => {
                    e.preventDefault()
                    setSelectedSkills(prev =>
                      prev.includes(item)
                        ? prev.filter(i => i !== item)
                        : [...prev, item]
                    )
                  }}
                >
                  <div className='flex justify-start items-center gap-2'>
                    <div className='w-4 h-4 flex justify-center items-center'>
                      {selectedSkills.includes(item) ? <Check /> : null}
                    </div>
                    {item}
                  </div>
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
                  className='cursor-pointer h-[14px]'
                  onClick={() => {
                    setSelectedSkills(prev => {
                      return prev.filter(tag => tag !== item)
                    })
                  }}
                />
              </Badge>
            ))}
          </div>
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
                  className='cursor-pointer h-[14px]'
                  onClick={() => {
                    setSelectedSoftwares(prev => {
                      return prev.filter(tag => tag !== item)
                    })
                  }}
                />
              </Badge>
            ))}
          </div>
          <ClearButton />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='salary'>
        <AccordionTrigger className='px-2'>Salary</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <AccordionItemChildWrapper>
            <Checkbox />
            <span>Only show listings with salary included</span>
          </AccordionItemChildWrapper>
          <ClearButton />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='location'>
        <AccordionTrigger className='px-2'>Location</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <Input placeholder='Country' />
          <Input placeholder='City' />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
