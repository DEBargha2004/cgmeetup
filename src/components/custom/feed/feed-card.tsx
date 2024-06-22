import Image from 'next/image'
import projects from '../../../../public/data/projects.json'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import {
  Bookmark,
  EllipsisVertical,
  Eye,
  Heart,
  MessageCircleMore,
  Send
} from 'lucide-react'
import Link from 'next/link'
import LimitText from '../limit-text'
import { getShortendName } from '@/functions'
import ProfileInfoOverView from '../profile-info-overview'
import MaterialSymbolIcon from '../material-symbol-icon'
import { HTMLProps } from 'react'
import { cn } from '@/lib/utils'

export default function FeedCard ({
  project,
  className,
  ...props
}: {
  project: typeof projects.data[number]
} & HTMLProps<HTMLDivElement>) {
  const description = `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy text ever
  since the 1500s, when an unknown printer took a galley of type and
  scrambled it to make a type specimen book. It has survived not only
  five centuries, but also the leap into electronic typesetting,
  remaining essentially unchanged. It was popularised in the 1960s with
  the release of Letraset sheets containing Lorem Ipsum passages, and
  more recently with desktop publishing software like Aldus PageMaker
  including versions of Lorem Ipsum`
  return (
    <div
      key={project.id}
      className={cn(
        'rounded border py-2 space-y-2 w-full sm:w-[90%] shrink-0',
        className
      )}
      {...props}
    >
      <header className='px-2 w-full flex gap-3 justify-between items-center'>
        {/* <div className='flex  gap-3'>
          <Avatar className='border-2 border-white'>
            <AvatarImage src={project.user.medium_avatar_url} />
            <AvatarFallback className='uppercase'>
              {getShortendName(project.user.full_name)}
            </AvatarFallback>
          </Avatar>
          <div
            className='flex flex-col justify-between items-start 
          '
          >
            <h1 className='text-sm font-semibold'>{project.user.username}</h1>
            <p className='text-sm text-lightAccent-foreground line-clamp-1'>
              Some Random description about user
            </p>
          </div>
        </div>
        <div className='p-1 rounded-full hover:bg-lightAccent transition-all cursor-pointer text-lightAccent-foreground'>
          <EllipsisVertical className='h-5 w-5' />
        </div> */}
        <ProfileInfoOverView>
          <MaterialSymbolIcon>more_vert</MaterialSymbolIcon>
        </ProfileInfoOverView>
      </header>
      <div className='w-full'>
        <Link href={`/gallery/${project.id}`}>
          <Image
            src={project.smaller_square_cover_url}
            alt={project.title}
            height={400}
            width={400}
            className='w-full cursor-pointer'
          />
        </Link>
      </div>
      <div className='flex justify-between items-center px-2'>
        <div className='flex gap-3 items-center'>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <MaterialSymbolIcon>favorite</MaterialSymbolIcon>3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <MaterialSymbolIcon>visibility</MaterialSymbolIcon>3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <MaterialSymbolIcon>comment</MaterialSymbolIcon>3
          </div>
        </div>
        <div className='flex gap-3 items-center'>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <MaterialSymbolIcon>share</MaterialSymbolIcon>3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <MaterialSymbolIcon>bookmark</MaterialSymbolIcon>3
          </div>
        </div>
      </div>
      <div className='px-2 space-y-1'>
        <h1 className='text-lg font-bold'>{project.title}</h1>
        <LimitText>{description}</LimitText>
        <p className='text-lightAccent-foreground text-xs'>21 hours ago</p>
      </div>
    </div>
  )
}
