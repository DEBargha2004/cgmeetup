'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getShortendName } from '@/functions'
import avatar from '../../../../public/images/profile-1.jpg'
import { MaterialSymbolIcon } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useGlobalAppStore } from '@/store/global-app-store'

export default function PostCreate () {
  const { setPostDialogState } = useGlobalAppStore()
  return (
    <div
      className='flex items-start justify-start gap-2 w-full border-t border-b py-5'
      onClick={() => setPostDialogState(true)}
    >
      <div id='user-image'>
        <div className='w-14 h-14 rounded-full flex justify-center items-center'>
          <Avatar className='h-full w-full'>
            <AvatarImage src={avatar.src} alt='profile' />
            <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className='grid gap-2 w-full'>
        <div className='relative'>
          <Textarea
            className='overflow-y-auto scroller pb-4'
            rows={7}
            placeholder='What do you like to share?'
          />
          <p className='text-xs opacity-70 absolute bottom-1 right-3'>0/5000</p>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex justify-start items-center gap-4'>
            <div className='flex justify-start items-center gap-1'>
              <MaterialSymbolIcon className='cursor-pointer text-2xl'>
                imagesmode
              </MaterialSymbolIcon>
              <span>Images</span>
            </div>
            <div className='flex justify-start items-center gap-1'>
              <MaterialSymbolIcon className='cursor-pointer text-2xl'>
                slow_motion_video
              </MaterialSymbolIcon>
              <span>Videos</span>
            </div>
          </div>
          <div>
            <Button className='h-8'>Post</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
