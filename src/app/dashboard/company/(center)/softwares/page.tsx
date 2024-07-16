'use client'

import { FieldsContainer, FormCard } from '@/components/custom/form'
import { Button } from '@/components/ui/button'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import { tags } from '@/constants/job-filters'
import { useState } from 'react'

export default function Softwares () {
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([])
  return (
    <FormCard heading='Softwares' subHeading='Add your softwares'>
      <FieldsContainer className='md:w-1/2 sm:w-3/4 w-full px-2'>
        <FancyMultiSelect
          options={tags.map(item => ({ label: item, value: item }))}
        />
        <Button className='w-24 ml-auto'>Save</Button>
      </FieldsContainer>
    </FormCard>
  )
}
