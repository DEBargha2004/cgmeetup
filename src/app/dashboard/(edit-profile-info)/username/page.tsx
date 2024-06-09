import {
  FieldsContainer,
  FormCard,
  UsernameForm
} from '@/components/custom/form'
import { Form } from '@/components/ui/form'

export default function UsernamePage () {
  return (
    <FormCard heading='Username' subHeading='Change your Username'>
      <FieldsContainer className='w-1/2'>
        <UsernameForm />
        <p className='text-[red] text-sm'>Warning: You can change only once.</p>
      </FieldsContainer>
    </FormCard>
  )
}
