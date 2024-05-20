'use client'

import Image from 'next/image'
import projects from '../../public/data/projects.json'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Bookmark,
  EllipsisVertical,
  Eye,
  Heart,
  MessageCircleMore,
  Send
} from 'lucide-react'
import { useState } from 'react'

const getShortendName = (name: string) => {
  return name
    .split(' ')
    .map(name => name[0])
    .join('')
}

const description = `Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text ever
since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only
five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s with
the release of Letraset sheets containing Lorem Ipsum passages, and
more recently with desktop publishing software like Aldus PageMaker
including versions of Lorem Ipsum`

export default function FeedCard ({
  project
}: {
  project: typeof projects.data[number]
}) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  return (
    <div
      key={project.id}
      className='rounded border py-2 space-y-2 w-full sm:w-[480px] shrink-0'
    >
      <header className='px-2 w-full flex gap-3 justify-between items-center'>
        <div className='flex  gap-3 '>
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
        </div>
      </header>
      <div className='w-full'>
        <Image
          src={project.smaller_square_cover_url}
          alt={project.title}
          height={400}
          width={400}
          className='w-full'
        />
      </div>
      <div className='flex justify-between items-center px-2'>
        <div className='flex gap-3 items-center'>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <Heart className='' />3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <Eye className='' />3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <MessageCircleMore />3
          </div>
        </div>
        <div className='flex gap-3 items-center'>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <Heart className='' />3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <Bookmark className='' />
          </div>
        </div>
      </div>
      <div className='px-2 space-y-1'>
        <h1 className='text-lg font-bold'>{project.title}</h1>
        <p className='text-sm text-lightAccent-foreground font-medium'>
          {description.slice(0, showFullDescription ? undefined : 120)}&nbsp;
          <span
            className='text-primary cursor-pointer'
            onClick={() => setShowFullDescription(prev => !prev)}
          >
            Show {showFullDescription ? 'Less' : 'More'}
          </span>
        </p>
        <p className='text-lightAccent-foreground text-xs'>21 hours ago</p>
      </div>
    </div>
  )
}
