import { BioForm, FieldsContainer, FormCard } from '@/components/custom/form'

export default function BioPage () {
  return (
    <FormCard heading='Bio' subHeading='Introduce about yourself.'>
      <FieldsContainer className='md:w-1/2 sm:w-3/4 w-full px-2'>
        <BioForm submitLabel='Save' />
      </FieldsContainer>
    </FormCard>
  )
}
