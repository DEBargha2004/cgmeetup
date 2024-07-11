'use client'

import {
  FieldsContainer,
  FormCard,
  UsernameForm
} from '@/components/custom/form'
import { Form } from '@/components/ui/form'
import { UsernameSchemaType, usernameSchema } from '@/schema/username'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function UsernamePage () {
  const form = useForm<UsernameSchemaType>({
    resolver: zodResolver(usernameSchema)
  })

  const handleSubmit = async (data: UsernameSchemaType) => {}
  return (
    <FormCard heading='Username' subHeading='Change your Username'>
      <FieldsContainer className='w-1/2'>
        <UsernameForm form={form} onSubmit={handleSubmit} />
        <p className='text-[red] text-sm'>Warning: You can change only once.</p>
      </FieldsContainer>
    </FormCard>
  )
}
