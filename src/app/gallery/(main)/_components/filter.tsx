'use client'

import { Button } from '@/components/ui/button'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { tags } from '@/constants/job-filters'
import { Sort } from '@mui/icons-material'
import { useState } from 'react'

export default function Filter () {
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
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
        className='bg-lightAccent'
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <div className=' space-y-3'>
          <div className='space-y-4'>
            <FancyMultiSelect
              options={tags.map(t => ({ label: t, value: t }))}
              placeholder='Category'
            />
            {/* <ClearButton /> */}

            <FancyMultiSelect
              options={tags.map(t => ({ label: t, value: t }))}
              placeholder='Software'
            />
            {/* <ClearButton /> */}

            <FancyMultiSelect
              options={tags.map(t => ({ label: t, value: t }))}
              placeholder='Skills'
            />
            {/* <ClearButton /> */}

            <div className='space-y-1'>
              <Input placeholder='Country' />
              <Input placeholder='City' />
            </div>
          </div>
          <div className='flex justify-end'>
            <Button className='ml-auto'>Reset</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
