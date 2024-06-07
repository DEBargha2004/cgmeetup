import { BioForm, FieldsContainer, FormCard } from '@/components/custom/form'

export default function BioPage () {
  return (
    <FormCard heading='Bio' subHeading='Introduce about yourself.'>
      <FieldsContainer className='w-1/2'>
        <BioForm />
      </FieldsContainer>
    </FormCard>
  )
}
