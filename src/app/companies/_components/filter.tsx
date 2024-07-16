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
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
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
          <FancyMultiSelect options={tags.map(t => ({ label: t, value: t }))} />
          <ClearButton />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='skills'>
        <AccordionTrigger className=''>Skills</AccordionTrigger>
        <AccordionContent className='space-y-4 p-2'>
          <FancyMultiSelect options={tags.map(t => ({ label: t, value: t }))} />
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
          <FancyMultiSelect options={tags.map(t => ({ label: t, value: t }))} />
          <ClearButton />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
