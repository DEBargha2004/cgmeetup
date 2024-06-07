'use client'

import {
  OtpForm,
  PasswordForm,
  AccountCreateForm,
  JobPreferenceForm
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
  'higher_education'
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
              <div className='w-16 bg-lightAccent'>
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
      <div
        className='p-4 w-full flex flex-col justify-start items-stretch gap-4 
    rounded-lg border bg-card h-fit'
      >
        {formStage.phone && (
          <>
            <div className='flex justify-between items-end'>
              <h1 className='text-2xl font-semibold'>Sign Up Account</h1>
              <p className='sm:text-sm text-xs text-primary'>
                Switch to Recruiter
              </p>
            </div>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              international
              defaultCountry='IN'
            />
          </>
        )}
        {formStage.otp && (
          <>
            <h1 className='text-2xl font-semibold'>Verify OTP</h1>
            <OtpForm />
          </>
        )}
        {formStage.password && (
          <>
            <h1 className='text-2xl font-semibold'>Create Password</h1>
            <PasswordForm />
          </>
        )}
        {formStage.details && <AccountCreateForm />}
        {formStage.job_preference && (
          <>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Job Preference</h1>
                <Skip onClick={goNext} />
              </div>
              <p className='text-sm opacity-70'>
                What type of job are you looking for?
              </p>
            </div>
            <JobPreferenceForm />
          </>
        )}
        <div>
          <p className='text-sm'>
            Already have an account?{' '}
            <Link href={'/sign-in'} className='text-primary'>
              Sign In
            </Link>
          </p>
        </div>
        <div className='flex justify-between'>
          <Button type='button' onClick={goPrev}>
            Prev
          </Button>
          <Button type='button' onClick={goNext}>
            Next
          </Button>
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
    <p {...props} className={cn('text-primary cursor-pointer', className)}>
      {label || 'Skip'}
    </p>
  )
}
