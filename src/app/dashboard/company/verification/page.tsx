import {
  CompanyVerificationForm,
  FieldsContainer,
  FormCard
} from '@/components/custom/form'

export default function VerificationPage () {
  return (
    <FormCard
      heading='Company and Recruiter Verification'
      subHeading='Choose one of the following verification method:'
    >
      <FieldsContainer className='w-[70%] space-y-4'>
        <CompanyVerificationForm />
      </FieldsContainer>
    </FormCard>
  )
}
