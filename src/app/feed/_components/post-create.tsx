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
      className='flex items-start justify-start gap-2 w-full border-t border rounded-sm py-5 bg-card px-2'
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
            rows={4}
            placeholder='What do you like to share?'
          />
          <p className='text-xs opacity-70 absolute bottom-1 right-3'>0/5000</p>
        </div>
        <div className='grid xs:grid-cols-3'>
          <div className='grid grid-cols-2 col-span-2 gap-4 cursor-pointer w-fit'>
            <input type='file' hidden />
            <div className='flex justify-start items-center gap-1 w-fit'>
              <MaterialSymbolIcon className='cursor-pointer text-2xl opacity-100 text-success'>
                imagesmode
              </MaterialSymbolIcon>
              <span className='text-sm'>Images</span>
            </div>
            <div className='flex justify-start items-center gap-1 w-fit'>
              <MaterialSymbolIcon className='cursor-pointer text-2xl opacity-100 text-primary'>
                slow_motion_video
              </MaterialSymbolIcon>
              <span className='text-sm'>Videos</span>
            </div>
          </div>
          <div className='col-span-2 xs:col-span-1 w-fit ml-auto space-x-2'>
            <Button
              className='h-8'
              variant={'success'}
              // disabled={!(postDesc || mediaList.length)}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
