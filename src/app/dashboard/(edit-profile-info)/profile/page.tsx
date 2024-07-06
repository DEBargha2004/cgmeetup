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
        className='@container w-full'
      >
        <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
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
