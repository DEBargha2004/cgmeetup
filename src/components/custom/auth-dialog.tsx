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
import landing_image from '@/../public/images/landing-page.png'
import Image from 'next/image'
import { cn } from '@/lib/utils'

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

    setShowForm({ ...showForm, phone: false, pass: true })
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
      <DialogContent
        className={cn(
          `p-0 overflow-hidden max-h-[calc(100vh-30px)] 
      overflow-y-auto scroller-hide grid md:grid-cols-2 gap-x-2 gap-y-0 bg-card`,
          showForm.create_acc ? 'max-w-[500px]' : 'max-w-[800px]'
        )}
        // hideCloseButton
      >
        <div>
          <>
            {!showForm.create_acc ? (
              <div className='w-full h-full hidden md:flex flex-col justify-start items-center gap-4 p-5'>
                <h1 className='text-2xl text-center py-2'>
                  Welcome to the Professional Artist's Community
                </h1>
                <Image
                  src={landing_image}
                  height={200}
                  width={200}
                  alt='image'
                  className='w-3/5 aspect-square object-contain'
                />
              </div>
            ) : null}
          </>
        </div>
        {showForm.phone ? (
          <FormCard
            // heading='Sign Up/Sign In'
            className='@container h-full border-l border-border border-y-0 border-r-0'
            headerClass='py-0'
          >
            <div className='w-full my-auto'>
              <FieldsContainer className='w-full px-2 max-w-[500px] '>
                <PhoneNumberForm
                  form={phoneInputForm}
                  onSubmit={handlePhoneInputFormSubmit}
                  submitLabel='Verify'
                />
              </FieldsContainer>
            </div>
          </FormCard>
        ) : null}
        {showForm.pass ? (
          <FormCard
            headerClass='py-0'
            className='@container border-l border-border border-y-0 border-r-0'
          >
            <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
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
          <FormCard
            headerClass='py-0'
            className='@container border-l border-border border-y-0 border-r-0'
          >
            <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
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
          <FormCard headerClass='py-0' className='@container col-span-2'>
            <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
              <AccountCreateForm2 />
            </FieldsContainer>
          </FormCard>
        ) : null}
        <div className='flex justify-between p-2 py-0 col-span-2'>
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
