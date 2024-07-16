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
      <FieldsContainer className=' sm:w-3/4 w-full px-2'>
        <CompanyVerificationForm />
      </FieldsContainer>
    </FormCard>
  )
}
