import {
  FieldsContainer,
  FormCard,
  WorkExperienceForm
} from '@/components/custom/form'

export default function WorkExperiencePage () {
  return (
    <FormCard
      subHeading='Please fill in your work experience'
      heading='Work Experience'
    >
      <FieldsContainer className='w-1/2'>
        <WorkExperienceForm />
      </FieldsContainer>
    </FormCard>
  )
}
