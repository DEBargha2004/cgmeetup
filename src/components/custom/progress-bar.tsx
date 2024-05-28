'use client'

import {
  CircularProgressbar,
  CircularProgressbarWithChildren
} from 'react-circular-progressbar'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'
import { getShortendName } from '@/functions'

export default function ProgressBar ({ value = 0 }: { value?: number }) {
  return (
    <CircularProgressbarWithChildren
      value={value}
      // text={`${value}%`}
      styles={{
        text: {
          fill: 'white'
        },
        background: {
          backgroundColor: 'red'
        },
        root: {
          height: '80px',
          width: '80px'
        },
        path: {
          stroke: '#2196f3'
        },
        trail: {
          stroke: 'white'
        }
      }}
    >
      <Avatar className={cn('h-[66px] w-[66px]')}>
        <AvatarImage
          src={
            'https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204'
          }
          height={100}
          width={100}
        />
        <AvatarFallback className='uppercase'>
          {getShortendName('Ramaya Vastavaiya')}
        </AvatarFallback>
      </Avatar>
    </CircularProgressbarWithChildren>
  )
}
