'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { Input } from '@/components/ui/input'

export default function CommentInput () {
  return (
    <div className='w-full'>
      <form className='relative'>
        <Input
          className='h-12 pl-10 pr-16 text-opacity-70'
          placeholder='Post a comment...'
        />
        <MaterialSymbolIcon
          variant='filled'
          className='absolute top-1/2 -translate-y-1/2 left-3 text-2xl'
        >
          emoji_emotions
        </MaterialSymbolIcon>
        <span className='absolute top-1/2 -translate-y-1/2 right-3 text-primary'>
          POST
        </span>
      </form>
    </div>
  )
}
