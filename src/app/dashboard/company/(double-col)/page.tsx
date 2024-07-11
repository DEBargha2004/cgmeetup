'use client'

import {
  FieldsContainer,
  FormCard,
  RecruiterProfileCreateForm,
  UploadImageDual,
  UploadImageSingle
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
    <>
      <FormCard
        heading='Edit Company'
        subHeading='Edit your company details.'
        className='@container'
      >
        <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
          <CompanyRegistrationForm form={form} onSubmit={handleFormSubmit} />
        </FieldsContainer>
      </FormCard>
      <FormCard heading='Upload Image' subHeading='Upload your profile image.'>
        <FieldsContainer className='w-full'>
          <UploadImageDual />
        </FieldsContainer>
      </FormCard>
    </>
  )
}
