import { BioForm, FieldsContainer, FormCard } from '@/components/custom/form'

export default function BioPage () {
  return (
    <FormCard heading='Bio' subHeading='Introduce about yourself.'>
      <FieldsContainer className='w-full px-5'>
        <BioForm submitLabel='Save' />
      </FieldsContainer>
    </FormCard>
  )
}
