'use client'

import { OtpForm, SignUpForm } from '@/components/custom/form'
import { PhoneInput } from '@/components/ui/phone-input'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SignUpPage () {
  const [formStage, setFormStage] = useState({
    phone: true,
    otp: false,
    details: false
  })
  const [phoneNumber, setPhoneNumber] = useState('')

  // useEffect(() => {
  //   setFormStage(prev => ({ ...prev, phone: true }))
  // }, [])
  return (
    <div
      className='p-4 w-full flex flex-col justify-start items-stretch gap-4 
    rounded-lg  border bg-card'
    >
      {formStage.phone && (
        <>
          <h1 className='text-2xl font-semibold'>Sign Up Account</h1>
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
      {formStage.details && <SignUpForm />}
      <div>
        <p className='text-sm'>
          Already have an account?{' '}
          <Link href={'/sign-in'} className='text-primary'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
