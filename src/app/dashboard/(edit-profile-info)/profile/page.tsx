import {
  AccountCreateForm,
  FieldsContainer,
  FormCard
} from '@/components/custom/form'

export default function EditProfilePage () {
  return (
    <FormCard subHeading='Please tell us about yourself' heading='Edit Profile'>
      <FieldsContainer className='w-full pt-0'>
        <AccountCreateForm />
      </FieldsContainer>
    </FormCard>
  )
}
