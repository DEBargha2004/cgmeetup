'use client'

import { PhoneInput } from '@/components/ui/phone-input'
import { useState } from 'react'
import { Country } from 'react-phone-number-input'

export default function PhoneNumber () {
  const [phoneNumber, setPhoneNumber] = useState('')
  return (
    <div
      className='p-4 w-full flex flex-col justify-start items-stretch gap-4 
  rounded-lg border'
    >
      {/* <div className='relative'>
        <Input className='py-2 pl-20 h-14 rounded' />
        <DropdownMenu>
          <DropdownMenuTrigger
            className='w-16 absolute left-2 top-1/2 -translate-y-1/2 rounded-sm'
            asChild
          >
            <Button>Picker</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            className='max-h-[300px] overflow-y-auto scroller w-full'
          >
            {Array.from({ length: 78 }, (_, i) => i + 1).map(item => (
              <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <PhoneInput
        value={phoneNumber}
        onChange={setPhoneNumber}
        international
        defaultCountry='IN'
      />
    </div>
  )
}
