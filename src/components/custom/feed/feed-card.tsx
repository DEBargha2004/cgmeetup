import Image from 'next/image'
import projects from '../../../../public/data/projects.json'
import Link from 'next/link'
import LimitText from '../limit-text'
import ProfileInfoOverView from '../profile-info-overview'
import MaterialSymbolIcon from '../material-symbol-icon'
import { HTMLProps } from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Bookmark,
  Comment,
  Favorite,
  MoreVert,
  Share,
  Visibility
} from '@mui/icons-material'

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
        <ProfileInfoOverView description='opacity-70'>
          <MoreVert />
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
            <Favorite />3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <Visibility />3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <Comment />3
          </div>
        </div>
        <div className='flex gap-3 items-center'>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <Share />3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <Bookmark />3
          </div>
        </div>
      </div>
      <div className='px-2 space-y-1'>
        <Dialog>
          <DialogTrigger>
            <p className='opacity-70'>View Likes</p>
          </DialogTrigger>
          <DialogContent className='bg-card max-h-[calc(100vh-100px)] overflow-y-scroll scroller pt-8 pr-3 pl-4'>
            <h1 className='text-xl'>Likes</h1>
            <Input />
            <div className='space-y-4 w-full'>
              {Array.from({ length: 5 }).map((_, i) => (
                <ProfileInfoOverView key={i}>
                  <Button className='h-8'>Follow</Button>
                </ProfileInfoOverView>
              ))}
            </div>
          </DialogContent>
        </Dialog>
        <h1 className='text-lg font-bold'>{project.title}</h1>
        <LimitText className='opacity-70'>{description}</LimitText>
        <p className='text-lightAccent-foreground text-xs opacity-60'>
          21 hours ago
        </p>
      </div>
    </div>
  )
}
