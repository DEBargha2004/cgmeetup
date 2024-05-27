import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { UserRound } from 'lucide-react'
import Image from 'next/image'
import ProfileInfoOverView from '../profile-info-overview'
import MaterialSymbolIcon from '../material-symbol-icon'
import { HTMLProps } from 'react'
import { cn } from '@/lib/utils'

export default function SuggestionCard ({
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  return (
    <Card
      className={cn(
        'flex flex-col justify-start items-start gap-2 p-3 rounded ',
        className
      )}
      {...props}
    >
      <ProfileInfoOverView
        className='w-full flex justify-between items-start'
        height={80}
        width={80}
        image=' w-10 h-10'
        heading='text-sm xl:text-lg'
        description='text-xs xl:text-sm'
      >
        <div
          className='w-10 h-10 cursor-pointer flex justify-center 
        items-center rounded-full hover:bg-darkAccent'
        >
          <MaterialSymbolIcon>person_add</MaterialSymbolIcon>
        </div>
      </ProfileInfoOverView>
      <div className='grid grid-cols-3 gap-1 w-[85%] ml-auto'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Image
            key={i}
            src={
              'https://cdna.artstation.com/p/assets/images/images/011/495/326/20181028174133/smaller_square/filippo-ubertino-driverzero1.jpg?1540766493'
            }
            alt='job-image'
            height={100}
            width={100}
            className='rounded w-full object-cover'
          />
        ))}
      </div>
    </Card>
  )
}
