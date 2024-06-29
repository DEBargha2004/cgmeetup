'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { useState } from 'react'
import {
  AccountCreateForm2,
  FieldsContainer,
  FormCard,
  PhoneNumberForm,
  SignInWithOtpForm,
  SignInWithPassForm
} from './form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PhoneNumberSchemaType,
  phoneNumberSchema
} from '@/schema/phone-number-schema'
import {
  SignInWithOtpSchemaType,
  SignInWithPasswordSchemaType,
  signInWithOtpSchema,
  signInWithPasswordSchema
} from '@/schema/sign-in'
import { Button } from '../ui/button'

type FormNameTypes = 'phone' | 'otp' | 'pass' | 'create_acc'
type FormStateTypes = Partial<Record<FormNameTypes, boolean>>

export default function AuthDialog () {
  const { authDialogState, setAuthDialogState } = useGlobalAppStore()

  const [showForm, setShowForm] = useState<FormStateTypes>({
    phone: true
  })

  // form start
  const phoneInputForm = useForm<PhoneNumberSchemaType>({
    resolver: zodResolver(phoneNumberSchema)
  })

  const signInWithPasswordForm = useForm<SignInWithPasswordSchemaType>({
    resolver: zodResolver(signInWithPasswordSchema)
  })
  const signInWithOtpForm = useForm<SignInWithOtpSchemaType>({
    resolver: zodResolver(signInWithOtpSchema)
  })

  // form end

  //form submit handler start
  const handlePhoneInputFormSubmit = async (data: PhoneNumberSchemaType) => {
    signInWithOtpForm.reset({
      id: data.phoneNumber
    })
    signInWithPasswordForm.reset({
      id: data.phoneNumber
    })

    setShowForm({ ...showForm, phone: false, otp: true })
  }

  const handleSignInWithPasswordFormSubmit = async (
    data: SignInWithPasswordSchemaType
  ) => {}

  const handleSignInWithOtpFormSubmit = async (
    data: SignInWithOtpSchemaType
  ) => {}

  //form submit handler end

  return (
    <Dialog open={authDialogState} onOpenChange={setAuthDialogState}>
      <DialogContent className='p-0 overflow-hidden max-h-[calc(100vh-100px)] overflow-y-auto scroller'>
        {showForm.phone ? (
          <FormCard heading='Phone Number'>
            <FieldsContainer className='w-3/4'>
              <PhoneNumberForm
                form={phoneInputForm}
                onSubmit={handlePhoneInputFormSubmit}
                submitLabel='Verify'
              />
            </FieldsContainer>
          </FormCard>
        ) : null}
        {showForm.pass ? (
          <FormCard heading='Phone Number'>
            <FieldsContainer className='w-3/4'>
              <SignInWithPassForm
                form={signInWithPasswordForm}
                onSubmit={handleSignInWithPasswordFormSubmit}
                formToggler={() => {
                  setShowForm(prev => ({ otp: true }))
                }}
              />
            </FieldsContainer>
          </FormCard>
        ) : null}
        {showForm.otp ? (
          <FormCard heading='Phone Number'>
            <FieldsContainer className='w-3/4'>
              <SignInWithOtpForm
                form={signInWithOtpForm}
                onSubmit={handleSignInWithOtpFormSubmit}
                formToggler={() => {
                  setShowForm({ pass: true })
                }}
              />
            </FieldsContainer>
          </FormCard>
        ) : null}
        {showForm.create_acc ? (
          <FormCard
            heading='Create Account'
            subHeading='Create an account to continue.'
          >
            <FieldsContainer className='w-4/5'>
              <AccountCreateForm2 />
            </FieldsContainer>
          </FormCard>
        ) : null}
        <div className='flex justify-between p-2'>
          <p
            className='w-fit text-sm text-primary cursor-pointer'
            onClick={() => setShowForm({ create_acc: true })}
          >
            Create Account
          </p>
          <p
            className='w-fit text-sm text-primary cursor-pointer'
            onClick={() => setShowForm({ phone: true })}
          >
            Phone Number
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
