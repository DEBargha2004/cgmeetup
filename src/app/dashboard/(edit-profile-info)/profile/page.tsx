'use client'

import {
  AccountCreateForm,
  FieldsContainer,
  FormCard,
  UploadImageDual
} from '@/components/custom/form'

export default function EditProfilePage () {
  return (
    <>
      <FormCard
        subHeading='Please tell us about yourself'
        heading='Edit Profile'
        className='flex justify-between items-start gap-3'
      >
        <FieldsContainer className='w-full pt-0'>
          <AccountCreateForm />
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
