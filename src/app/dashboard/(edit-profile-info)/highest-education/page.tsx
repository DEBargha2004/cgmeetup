import {
  EducationForm,
  FieldsContainer,
  FormCard
} from '@/components/custom/form'

export default function HighestEducationPage () {
  return (
    <FormCard
      heading='Highest Education'
      subHeading='Please fill in your highest education details'
    >
      <FieldsContainer className='w-1/2'>
        <EducationForm />
      </FieldsContainer>
    </FormCard>
  )
}
