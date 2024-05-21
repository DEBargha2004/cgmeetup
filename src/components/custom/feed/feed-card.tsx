'use client'

import Image from 'next/image'
import projects from '../../../../public/data/projects.json'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import {
  Bookmark,
  EllipsisVertical,
  Eye,
  Heart,
  MessageCircleMore,
  Send,
  ThumbsUp
} from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { sample_cateories } from '@/constants/categories'
import { Badge } from '@/components/ui/badge'

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
  const [showFullDescription, setShowFullDescription] = useState({
    feed_card: false,
    dialog_content: false
  })
  return (
    <div
      key={project.id}
      className='rounded border py-2 space-y-2 w-full sm:w-[90%] shrink-0'
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
        <Dialog>
          <DialogTrigger asChild>
            <Image
              src={project.smaller_square_cover_url}
              alt={project.title}
              height={400}
              width={400}
              className='w-full cursor-pointer'
            />
          </DialogTrigger>
          <DialogContent className='h-[calc(100vh-2rem)] max-w-[100vw] flex justify-between items-start'>
            <div
              className='w-3/4 h-full flex justify-start flex-col items-center 
            overflow-y-auto scroller snap-mandatory snap-y'
            >
              <FeedDialogImage>
                <Image
                  src={project.smaller_square_cover_url}
                  alt={project.title}
                  height={800}
                  width={800}
                  className='h-full w-auto  shrink-0'
                />
              </FeedDialogImage>
              <FeedDialogImage>
                <Image
                  src={project.smaller_square_cover_url}
                  alt={project.title}
                  height={800}
                  width={800}
                  className='h-full w-auto  shrink-0'
                />
              </FeedDialogImage>
              <FeedDialogImage>
                <Image
                  src={project.smaller_square_cover_url}
                  alt={project.title}
                  height={800}
                  width={800}
                  className='h-full w-auto  shrink-0'
                />
              </FeedDialogImage>
              <FeedDialogImage>
                <Image
                  src={project.smaller_square_cover_url}
                  alt={project.title}
                  height={800}
                  width={800}
                  className='h-full w-auto  shrink-0'
                />
              </FeedDialogImage>
              <FeedDialogImage>
                <Image
                  src={project.smaller_square_cover_url}
                  alt={project.title}
                  height={800}
                  width={800}
                  className='h-full w-auto  shrink-0'
                />
              </FeedDialogImage>
            </div>
            <div className='w-1/4 h-full overflow-y-auto scroller space-y-6'>
              <Card className='rounded'>
                <CardContent id='user-profile' className='space-y-6 pt-6'>
                  <div className='flex justify-start items-start gap-2'>
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
                      <div>
                        <h1 className='text-lg'>Guillaume</h1>
                        <span className='text-sm text-muted-foreground'>
                          Photographer
                        </span>
                        &nbsp;
                        <span className='text-sm text-primary'>Follow</span>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <Button>
                      <Heart className='h-4 w-4 mr-2' />
                      Like
                    </Button>
                    <Button variant={'secondary'}>
                      <Bookmark className='h-4 w-4 mr-2' />
                      Save
                    </Button>
                  </div>
                </CardContent>
                <CardContent id='post-info' className='space-y-2 pt-6'>
                  <h1 className='text-xl font-bold'>{project.title}</h1>
                  <p className='text-sm text-card-foreground font-medium'>
                    {description.slice(
                      0,
                      showFullDescription.dialog_content ? undefined : 120
                    )}
                    &nbsp;
                    <span
                      className='text-primary cursor-pointer'
                      onClick={() =>
                        setShowFullDescription(prev => ({
                          ...prev,
                          dialog_content: !prev.dialog_content
                        }))
                      }
                    >
                      Show {showFullDescription ? 'Less' : 'More'}
                    </span>
                  </p>
                  <i className='text-muted-foreground text-xs'>
                    Posted 6 hours ago
                  </i>
                  <div className='flex justify-between items-center px-2'>
                    <div className='flex gap-4 items-center'>
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
                        <Send className='' />3
                      </div>
                      <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
                        <Bookmark className='' />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <section id='comments' className='space-y-2'>
                <p>2 Comments</p>
                <CardContent className='pt-6 space-y-6 rounded bg-lightAccent'>
                  <FeedDialogComment />
                  <FeedDialogComment />
                  <FeedDialogComment />
                  <form
                    className='flex justify-center items-start gap-3'
                    onSubmit={e => e.preventDefault()}
                  >
                    <Textarea
                      className='w-full border p-2 rounded '
                      placeholder='Write a comment...'
                    ></Textarea>
                    <Button className='px-2'>
                      <Send className='h-5 w-5' />
                    </Button>
                  </form>
                </CardContent>
              </section>
              <Card>
                <CardHeader>
                  <strong>Tags</strong>
                </CardHeader>
                <CardContent className='flex gap-2 flex-wrap'>
                  {sample_cateories.map(cat => (
                    <Badge key={cat} className=' border-primary'>
                      {cat}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
              <Card id='more-work'>
                <CardHeader className='flex flex-row justify-start items-center gap-2'>
                  More by <strong>Guillaume</strong>
                </CardHeader>
                <CardContent className='grid grid-cols-3 gap-1'>
                  {Array.from({ length: 6 }, (_, i) => i).map(item => (
                    <Image
                      key={item}
                      src={project.smaller_square_cover_url}
                      alt='more-work'
                      height={100}
                      width={100}
                      className='rounded w-full'
                    />
                  ))}
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
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
            <Send className='' />3
          </div>
          <div className='flex justify-between items-center gap-1 text-lightAccent-foreground'>
            <Bookmark className='' />
          </div>
        </div>
      </div>
      <div className='px-2 space-y-1'>
        <h1 className='text-lg font-bold'>{project.title}</h1>
        <p className='text-sm text-lightAccent-foreground font-medium'>
          {description.slice(
            0,
            showFullDescription.feed_card ? undefined : 120
          )}
          &nbsp;
          <span
            className='text-primary cursor-pointer'
            onClick={() =>
              setShowFullDescription(prev => ({
                ...prev,
                feed_card: !prev.feed_card
              }))
            }
          >
            Show {showFullDescription ? 'Less' : 'More'}
          </span>
        </p>
        <p className='text-lightAccent-foreground text-xs'>21 hours ago</p>
      </div>
    </div>
  )
}

function FeedDialogImage ({
  children,
  className
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('h-full w-auto snap-center shrink-0', className)}>
      {children}
    </div>
  )
}

function FeedDialogComment () {
  return (
    <div className='flex justify-start items-start gap-2'>
      <div className='shrink-0 w-fit'>
        <Avatar className='h-10 w-10 rounded-full border-white'>
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
      <div className='w-full space-y-1'>
        <div>
          <h1 className='text-md'>Guillaume</h1>
          <span className='text-sm text-muted-foreground'>Photographer</span>
        </div>
        <div>
          <p className='text-sm'>Comment</p>
        </div>
      </div>
    </div>
  )
}
