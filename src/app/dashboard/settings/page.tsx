'use client'

import {
  FieldsContainer,
  FormCard,
  UsernameForm
} from '@/components/custom/form'
import {
  BrowsingExperienceForm,
  ChangePasswordForm,
  LoginEmailForm
} from '@/components/custom/form/settings'
import { Button } from '@/components/ui/button'
import {
  BrowsingExperienceSchemaType,
  browsingExperienceSchema
} from '@/schema/browsing-experience'
import {
  ChangePasswordSchemaType,
  changePasswordSchema
} from '@/schema/change-password'
import { LoginEmailSchemaType, loginEmailSchema } from '@/schema/login-email'
import { UsernameSchemaType, usernameSchema } from '@/schema/username'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function SettingsPage () {
  // form start
  const loginEmailForm = useForm<LoginEmailSchemaType>({
    resolver: zodResolver(loginEmailSchema)
  })
  const usernameForm = useForm<UsernameSchemaType>({
    resolver: zodResolver(usernameSchema)
  })
  const passwordChangeForm = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema)
  })
  const browsingExpForm = useForm<BrowsingExperienceSchemaType>({
    resolver: zodResolver(browsingExperienceSchema)
  })
  //form end

  //submit handler start
  const handleFormSubmit = async (data: LoginEmailSchemaType) => {}
  const handleUsernameFormSubmit = async (data: UsernameSchemaType) => {}
  const handlePasswordChangeFormSubmit = async (
    data: ChangePasswordSchemaType
  ) => {}
  const handleBrowsingExpFormSubmit = async (
    data: BrowsingExperienceSchemaType
  ) => {}
  //submit handler end
  return (
    <div className='grid grid-cols-2 gap-4'>
      <FormCard heading='Login Email' className='rounded'>
        <FieldsContainer className='w-1/2 px-2'>
          <LoginEmailForm form={loginEmailForm} onSubmit={handleFormSubmit} />
        </FieldsContainer>
      </FormCard>
      <FormCard heading='Change Username' className='rounded '>
        <FieldsContainer className='w-1/2 px-2'>
          <UsernameForm
            form={usernameForm}
            onSubmit={handleUsernameFormSubmit}
          />
        </FieldsContainer>
      </FormCard>
      <FormCard heading='Change Password' className='rounded w-full'>
        <FieldsContainer className='w-1/2 px-2'>
          <ChangePasswordForm
            form={passwordChangeForm}
            onSubmit={handlePasswordChangeFormSubmit}
          />
        </FieldsContainer>
      </FormCard>
      <div className='flex flex-col justify-between items-stretch'>
        <FormCard heading='Browsing Experience' className='rounded w-full'>
          <FieldsContainer className='w-2/3 px-2'>
            <BrowsingExperienceForm
              form={browsingExpForm}
              onSubmit={handleBrowsingExpFormSubmit}
            />
          </FieldsContainer>
        </FormCard>
        <FormCard heading='Delete Account' className='rounded w-full'>
          <FieldsContainer className='w-1/2 px-2'>
            <Button className='w-fit mx-auto' variant={'destructive'}>
              Delete Account
            </Button>
          </FieldsContainer>
        </FormCard>
      </div>
    </div>
  )
}
