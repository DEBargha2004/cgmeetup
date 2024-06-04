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
  title,
  description,
  ...props
}: { title?: string; description?: string } & HTMLProps<HTMLDivElement>) {
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
        image='w-20 h-20'
        heading='text-sm xl:text-lg'
        description='text-xs xl:text-sm'
        titleValue={title}
        descriptionValue={description}
        textContainer='justify-start gap-3'
      >
        <div
          className='w-10 h-10 cursor-pointer flex justify-center 
        items-center rounded-full bg-darkAccent shrink-0'
        >
          <MaterialSymbolIcon className='text-primary'>
            person_add
          </MaterialSymbolIcon>
        </div>
      </ProfileInfoOverView>
      <div className=' ml-[92px] grid grid-cols-3 gap-1 w-[calc(100%-92px)]'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Image
            key={i}
            src={
              'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
            }
            alt='job-image'
            height={100}
            width={100}
            className=' object-cover w-full'
          />
        ))}
      </div>
    </Card>
  )
}
