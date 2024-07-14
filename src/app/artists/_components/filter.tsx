'use client'

import { ClearButton, MaterialSymbolIcon } from '@/components/custom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
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
import { job_type, tags } from '@/constants/job-filters'
import { cn } from '@/lib/utils'
import { Check, Close, KeyboardArrowDown } from '@mui/icons-material'
import { useState } from 'react'

const skills: string[] = []

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'San Francisco',
  'Fort Worth',
  'Columbus',
  'Charlotte',
  'San Diego',
  'Indianapolis',
  'Seattle',
  'Denver'
]

export default function Filter () {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([])
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<
    string[]
  >([])
  return (
    <Accordion
      type='multiple'
      defaultValue={['name', 'skills', 'software', 'location', 'availability']}
    >
      <AccordionItem value='name'>
        <AccordionTrigger>Name</AccordionTrigger>
        <AccordionContent>
          <Input placeholder='Name' />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='software'>
        <AccordionTrigger className=''>Software</AccordionTrigger>
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
          <ClearButton />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='skills'>
        <AccordionTrigger className=''>Skills</AccordionTrigger>
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
                        w-full space-y-1'
            >
              {skills.map(item => (
                <DropdownMenuItem
                  key={item}
                  className={cn(
                    'flex justify-start items-center gap-1',
                    skills.includes(item) ? 'bg-lightAccent' : ''
                  )}
                  onSelect={e => {
                    e.preventDefault()
                    setSelectedSkills(prev => {
                      if (prev.includes(item)) {
                        return prev.filter(skill => skill !== item)
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
                      return prev.filter(skill => skill !== item)
                    })
                  }}
                />
              </Badge>
            ))}
          </div>
          <ClearButton />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='location'>
        <AccordionTrigger className=''>City / Country</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <Select>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cities.map(item => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='availability'>
        <AccordionTrigger className=''>Availability</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className='p-2 flex justify-between items-center w-full border rounded 
                          h-10 bg-darkAccent'
              >
                <span>Availability</span>
                <KeyboardArrowDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='max-h-[300px] overflow-y-auto scroller h-[200px] 
                        w-full space-y-1'
            >
              {job_type.map(item => (
                <DropdownMenuItem
                  key={item}
                  className={cn(
                    'flex justify-start items-center gap-1',
                    selectedAvailabilities.includes(item)
                      ? 'bg-lightAccent'
                      : ''
                  )}
                  onSelect={e => {
                    e.preventDefault()
                    setSelectedAvailabilities(prev => {
                      if (prev.includes(item)) {
                        return prev.filter(tag => tag !== item)
                      }
                      return [...prev, item]
                    })
                  }}
                >
                  <span
                    className={cn(
                      selectedAvailabilities.includes(item)
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
            {selectedAvailabilities.map(item => (
              <Badge
                key={item}
                className='bg-lightAccent p-2 flex justify-between items-center gap-1'
              >
                <span>{item}</span>
                <Close
                  className='h-4 cursor-pointer'
                  onClick={() => {
                    setSelectedAvailabilities(prev => {
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
    </Accordion>
  )
}
