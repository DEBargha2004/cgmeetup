'use client'

import { Input } from '@/components/ui/input'
import { ChangeEvent, HTMLProps, forwardRef, useState } from 'react'

export default function PasswordPage () {
  return (
    <div
      className='p-4 w-full flex flex-col justify-start items-stretch gap-4 
rounded-lg border'
    >
      <PasswordInput />
    </div>
  )
}

const PasswordInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      <Input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        className='w-full'
        {...props}
      />
    )
  }
)
PasswordInput.displayName = 'PasswordInput'
