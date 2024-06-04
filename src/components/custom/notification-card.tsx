import { getShortendName } from '@/functions'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export function NotificationCardProfileView () {
  return (
    <div className='border-b last:border-none'>
      <div className='flex justify-start items-start gap-2'>
        <Avatar className='h-14 w-14'>
          <AvatarImage src='https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204' />
          <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
        </Avatar>
        <h1 className='w-full font-medium line-clamp-2'>
          Prashant Singh at ABC Pvt. Ltd.{' '}
          <p className='opacity-70 text-sm'>viewed your profile</p>
        </h1>
      </div>
      <p className='text-right text-sm opacity-70'>56 days ago</p>
    </div>
  )
}

export function NotificationCardOtherView () {
  return (
    <div className='border-b last:border-none'>
      <div className='flex justify-start items-start gap-2'>
        <Avatar className='h-14 w-14 rounded-sm'>
          <AvatarImage src='https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098' />
          <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
        </Avatar>
        <h1 className='w-full font-medium line-clamp-2'>
          Prashant Singh at ABC Pvt. Ltd.{' '}
          <p className='opacity-70 text-sm'>commented on your post</p>
        </h1>
      </div>
      <p className='text-right text-sm opacity-70'>56 days ago</p>
    </div>
  )
}
