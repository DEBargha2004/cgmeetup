'use client'

import {
  FieldsContainer,
  FormCard,
  RecruiterProfileCreateForm
} from '@/components/custom/form'
import {
  RecruiterProfileCreateSchemaType,
  recruiterProfileCreateSchema
} from '@/schema/recruiter-profile-create'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function CompanyPage () {
  const form = useForm<RecruiterProfileCreateSchemaType>({
    resolver: zodResolver(recruiterProfileCreateSchema)
  })
  const handleFormSubmit = async (data: RecruiterProfileCreateSchemaType) => {}
  return (
    <FormCard heading='Edit Company' subHeading='Edit your company details.'>
      <FieldsContainer className='w-1/2'>
        <RecruiterProfileCreateForm form={form} onSubmit={handleFormSubmit} />
      </FieldsContainer>
    </FormCard>
  )
}
