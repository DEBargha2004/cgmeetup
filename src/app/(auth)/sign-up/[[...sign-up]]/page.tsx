'use client'

import {
  OtpForm,
  PasswordForm,
  AccountCreateForm,
  JobPreferenceForm,
  EducationForm,
  BioForm,
  WorkExperienceForm,
  FieldsContainer,
  FormCard,
  PhoneNumberForm
} from '@/components/custom/form'
import { Button } from '@/components/ui/button'
import { PhoneInput } from '@/components/ui/phone-input'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { HTMLProps, useEffect, useState } from 'react'

const signUpFlow = [
  'phone',
  'otp',
  'password',
  'details',
  'job_preference',
  'work_experience',
  'higher_education',
  'bio'
] as const

export default function SignUpPage () {
  const [formStage, setFormStage] = useState<
    Partial<Record<typeof signUpFlow[number], boolean>>
  >({
    phone: true
  })
  const [phoneNumber, setPhoneNumber] = useState('')

  const [formStageIndex, setFormStageIndex] = useState(0)

  const goPrev = () => {
    if (formStageIndex > 0) {
      setFormStageIndex(formStageIndex - 1)
    }
  }
  const goNext = () => {
    if (formStageIndex < signUpFlow.length - 1) {
      setFormStageIndex(formStageIndex + 1)
    }
  }

  useEffect(() => {
    setFormStage({ [signUpFlow[formStageIndex]]: true })
  }, [formStageIndex])
  return (
    <div className='flex flex-col justify-between items-center gap-20'>
      <div className='flex'>
        {signUpFlow.map((item, item_idx) => (
          <div className='flex justify-center items-center' key={item_idx}>
            <p
              className={cn(
                'h-7 w-7 rounded-full flex justify-center items-center transition-all ',
                formStageIndex >= item_idx
                  ? 'bg-primary delay-500'
                  : 'bg-lightAccent'
              )}
            >
              {item_idx + 1}
            </p>
            {signUpFlow[item_idx + 1] && (
              <div className='w-4 md:w-8 xl:w-16 bg-lightAccent'>
                <div
                  className={cn(
                    'h-1 transition-all duration-500',
                    formStageIndex > item_idx ? 'bg-primary w-full' : 'w-0'
                  )}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='w-full flex flex-col justify-start items-stretch '>
        {formStage.phone && (
          <FormCard
            extraButton={
              <p className='sm:text-sm text-xs text-primary cursor-pointer'>
                Switch to Recruiter / Company
              </p>
            }
            heading='Sign Up Account'
          >
            <FieldsContainer className='w-1/2 pt-10'>
              <PhoneNumberForm />
            </FieldsContainer>
            <div className='px-4 pb-4'>
              <p className='text-sm'>
                Already have an account?{' '}
                <Link href={'/sign-in'} className='text-primary'>
                  Sign In
                </Link>
              </p>
            </div>
          </FormCard>
        )}
        {formStage.otp && (
          <FormCard heading='Verify OTP'>
            <FieldsContainer className='w-1/2'>
              <OtpForm />
            </FieldsContainer>
          </FormCard>
        )}
        {formStage.password && (
          <FormCard heading='Create Password'>
            <FieldsContainer className='w-1/2'>
              <PasswordForm />
            </FieldsContainer>
          </FormCard>
        )}
        {formStage.details && (
          <>
            <FormCard
              subHeading='Please tell us about yourself'
              heading='Create Profile'
            >
              <FieldsContainer className='w-full pt-0'>
                <AccountCreateForm />
              </FieldsContainer>
            </FormCard>
          </>
        )}
        {formStage.job_preference && (
          <FormCard
            heading='Job Preference'
            subHeading='What type of job are you looking for?'
            extraButton={<Skip onClick={goNext} />}
          >
            <FieldsContainer className='w-1/2'>
              <JobPreferenceForm />
            </FieldsContainer>
          </FormCard>
        )}
        {formStage.work_experience && (
          <FormCard
            heading='Work Experience'
            subHeading='Please fill in your work experience details'
            extraButton={<Skip onClick={goNext} />}
          >
            <FieldsContainer className='w-1/2'>
              <WorkExperienceForm />
            </FieldsContainer>
          </FormCard>
        )}
        {formStage.higher_education && (
          <FormCard
            heading='Highest Education'
            subHeading='Please fill in your highest education details'
            extraButton={<Skip onClick={goNext} />}
          >
            <FieldsContainer className='w-1/2'>
              <EducationForm />
            </FieldsContainer>
          </FormCard>
        )}
        {formStage.bio && (
          <FormCard
            heading='Bio'
            subHeading='Introduce about yourself.'
            extraButton={<Skip onClick={goNext} />}
          >
            <FieldsContainer className='w-1/2'>
              <BioForm />
            </FieldsContainer>
          </FormCard>
        )}

        <div className='flex justify-between p-4'>
          <p className='text-primary text-sm' onClick={goPrev}>
            Prev
          </p>
          <p className='text-primary text-sm' onClick={goNext}>
            Next
          </p>
        </div>
      </div>
    </div>
  )
}

function Skip ({
  label,
  className,
  ...props
}: { label?: string } & HTMLProps<HTMLParagraphElement>) {
  return (
    <p {...props} className={cn('text-primary cursor-pointer ', className)}>
      {label || 'Skip'}
    </p>
  )
}
