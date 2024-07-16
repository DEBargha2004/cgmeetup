'use client'

import { ClearButton } from '@/components/custom'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { job_type, tags } from '@/constants/job-filters'
import { Sort } from '@mui/icons-material'
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
    <Sheet>
      <SheetTrigger asChild>
        <div className='flex items-center gap-1 cursor-pointer'>
          <Sort />
          <span>Filter</span>
        </div>
      </SheetTrigger>
      <SheetContent
        side={'right'}
        className='bg-card overflow-y-auto scroller-hide pt-10'
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <div className='space-y-4'>
          <Input placeholder='Name' />
          <div>
            <FancyMultiSelect
              options={tags.map(t => ({ label: t, value: t }))}
              placeholder='Software'
            />
            <ClearButton />
          </div>
          <div>
            <FancyMultiSelect
              options={tags.map(t => ({ label: t, value: t }))}
              placeholder='Skills'
            />
            <ClearButton />
          </div>
          <div className='space-y-2'>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='City/Country' />
              </SelectTrigger>
              <SelectContent>
                {cities.map(item => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FancyMultiSelect
              options={job_type.map(t => ({ label: t, value: t }))}
              placeholder='Availability'
            />
            <ClearButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
