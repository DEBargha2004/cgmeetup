'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import EmojiPicker from 'emoji-picker-react'

export default function CommentInput () {
  return (
    <div className='w-full'>
      <form className='relative'>
        <Input
          className='h-12 pl-10 pr-16 text-opacity-70'
          placeholder='Post a comment...'
        />
        <Popover>
          <PopoverTrigger asChild>
            <div className='cursor-pointer'>
              <MaterialSymbolIcon
                variant='filled'
                className='absolute top-1/2 -translate-y-1/2 left-3 text-2xl'
              >
                emoji_emotions
              </MaterialSymbolIcon>
            </div>
          </PopoverTrigger>
          <PopoverContent
            side='top'
            align='start'
            className='p-0 -translate-y-5 w-fit h-fit'
          >
            <EmojiPicker //@ts-ignore
              theme={'dark'}
              style={{ backgroundColor: 'transparent' }}
            />
          </PopoverContent>
        </Popover>
        <span className='absolute top-1/2 -translate-y-1/2 right-3 text-primary'>
          POST
        </span>
      </form>
    </div>
  )
}
