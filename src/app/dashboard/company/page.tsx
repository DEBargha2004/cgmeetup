'use client'

import {
  FieldsContainer,
  FormCard,
  RecruiterProfileCreateForm
} from '@/components/custom/form'
import CompanyRegistrationForm from '@/components/custom/form/company-registration'
import { CompanyRegistrationSchemaType } from '@/schema/company-registration'
import {
  RecruiterProfileCreateSchemaType,
  recruiterProfileCreateSchema
} from '@/schema/recruiter-profile-create'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function CompanyPage () {
  const form = useForm<CompanyRegistrationSchemaType>({
    resolver: zodResolver(recruiterProfileCreateSchema)
  })
  const handleFormSubmit = async (data: CompanyRegistrationSchemaType) => {}
  return (
    <FormCard heading='Edit Company' subHeading='Edit your company details.'>
      <FieldsContainer className='w-1/2'>
        <CompanyRegistrationForm form={form} onSubmit={handleFormSubmit} />
      </FieldsContainer>
    </FormCard>
  )
}
