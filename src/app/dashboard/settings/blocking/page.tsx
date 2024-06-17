'use client'

import {
  FieldsContainer,
  FormCard,
  UsernameForm
} from '@/components/custom/form'
import { Button } from '@/components/ui/button'
import { UsernameSchemaType, usernameSchema } from '@/schema/username'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function BlockingPage () {
  // form start
  const form = useForm<UsernameSchemaType>({
    resolver: zodResolver(usernameSchema)
  })
  // form end

  //submit handler start
  const handleFormSubmit = async (data: UsernameSchemaType) => {}
  //submit handler end

  return (
    <FormCard
      heading='Blocking'
      subHeading="Blocking a user prevents that user from commenting on your projects and discussion posts. Note that it does not remove the user's project from the main walls of art (Trending/Picks/etc.).
      @new The purpose of this feature is to prevent users from harrasing you on CGMeetup"
    >
      <FieldsContainer className='w-full px-2'>
        <UsernameForm
          form={form}
          onSubmit={handleFormSubmit}
          submitButton={
            <Button
              className='ml-auto h-9 w-24'
              disabled={form.formState.isSubmitting}
              type='submit'
              variant={'destructive'}
            >
              Block
            </Button>
          }
        />
      </FieldsContainer>
    </FormCard>
  )
}
