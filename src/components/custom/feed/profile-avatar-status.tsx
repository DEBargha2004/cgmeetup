import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getShortendName } from '@/functions'
import { cn } from '@/lib/utils'

export default function ProfileAvatarStatus ({
  className,
  avatar
}: {
  className?: string
  avatar?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col justify-between gap-1 items-center',
        className
      )}
    >
      <Avatar className={cn('', avatar)}>
        <div className='p-[2px] bg-darkAccent rounded-full'>
          <AvatarImage
            src={
              'https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204'
            }
            className='rounded-full'
            height={100}
            width={100}
          />
          <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
        </div>
      </Avatar>
      <p className='text-xs text-center w-16 truncate'>
        John Doe lord of the universe
      </p>
    </div>
  )
}
