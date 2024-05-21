import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { UserRound } from 'lucide-react'
import Image from 'next/image'

export default function SuggestionCard () {
  return (
    <Card className='flex justify-start items-start gap-2 p-3 rounded bg-lightAccent'>
      <div className='shrink-0 w-fit'>
        <Avatar className='h-[70px] w-[70px] rounded-full border-2 border-white'>
          <AvatarImage
            src={
              'https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204'
            }
            height={100}
            width={100}
          />
          <AvatarFallback>GU</AvatarFallback>
        </Avatar>
      </div>
      <div className='w-full space-y-2'>
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-lg'>Guillaume</h1>
            <span className='text-sm text-muted-foreground'>Photographer</span>
            &nbsp;
            <span className='text-sm text-primary'>Follow</span>
          </div>
          <div className='p-2 border rounded-full hover:bg-darkAccent transition-all cursor-pointer'>
            <UserRound className='h-5 w-5' />
          </div>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Image
              key={i}
              src={
                'https://cdna.artstation.com/p/assets/images/images/011/495/326/20181028174133/smaller_square/filippo-ubertino-driverzero1.jpg?1540766493'
              }
              alt='job-image'
              height={100}
              width={100}
              className='rounded w object-cover'
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
