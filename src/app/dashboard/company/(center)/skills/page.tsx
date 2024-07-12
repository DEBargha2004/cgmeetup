'use client'

import { FieldsContainer, FormCard } from '@/components/custom/form'
import { Button } from '@/components/ui/button'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import { tags } from '@/constants/job-filters'
import { useState } from 'react'

export default function Skills () {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  return (
    <FormCard heading='Skills' subHeading='Add your skills'>
      <FieldsContainer className='w-1/2'>
        <FancyMultiSelect
          options={tags.map(item => ({ label: item, value: item }))}
        />
        <Button className='w-24 ml-auto'>Save</Button>
      </FieldsContainer>
    </FormCard>
  )
}
