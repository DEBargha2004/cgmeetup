import {
  FieldsContainer,
  FormCard,
  JobPreferenceForm
} from '@/components/custom/form'

export default function EditProfilePage () {
  return (
    <FormCard
      subHeading='What type of job are you looking for?'
      heading='Job Preference'
    >
      <FieldsContainer className='w-1/2'>
        <JobPreferenceForm />
      </FieldsContainer>
    </FormCard>
  )
}
