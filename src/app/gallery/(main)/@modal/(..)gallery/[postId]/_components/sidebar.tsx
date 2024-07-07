'use client'

import {
  LimitText,
  MaterialSymbolIcon,
  ProfileInfoOverView
} from '@/components/custom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Close from './close'
import projects from '@/../public/data/projects.json'
import CommentInput from './comment-input'
import Comment from './comment'
import { HTMLProps, useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { sample_cateories } from '@/constants/categories'

export default function Sidebar ({ postId }: { postId: string }) {
  const project_idx = projects.data.findIndex(
    project => project.id === Number(postId)
  )
  const description = `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only
    five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with
    the release of Letraset sheets containing Lorem Ipsum passages, and
    more recently with desktop publishing software like Aldus PageMaker
    including versions of Lorem Ipsum`

  const project = projects.data[project_idx] || {}

  const [activeTab, setActiveTab] = useState<'comment' | 'creator'>('comment')
  return (
    <div className='w-full xl:w-[26%] lg:w-[30%] h-full lg:overflow-y-auto px-1 scroller pt-2'>
      <div
        className={cn(
          ' space-y-3 lg:overflow-y-auto scroller',
          activeTab === 'comment' ? 'h-[calc(100%-80px)]' : 'h-full'
        )}
      >
        <Card className='rounded bg-lightAccent relative'>
          <CardContent id='user-profile' className='space-y-6 py-3 pr-5'>
            <ProfileInfoOverView
              heading='text-[14px] xl:text-[16px]'
              description='text-[11px] xl:text-[12px] text-white opacity-70'
              className='items-center'
              image='w-14 h-14 xl:w-14 xl:h-14'
              textContainer='justify-start gap-1'
            >
              <div
                className='xl:text-sm text-xs h-8 w-8 bg-primary flex justify-center items-center 
              shrink-0 rounded-full'
              >
                <MaterialSymbolIcon className='opacity-100'>
                  person_add
                </MaterialSymbolIcon>
              </div>
            </ProfileInfoOverView>
          </CardContent>
          <CardContent id='post-info' className='space-y-2 pt-0'>
            <h1 className='text-xl font-bold'>{project.title}</h1>
            <LimitText className='text-sm'>{description}</LimitText>
            <i className='text-muted-foreground text-xs'>Posted 6 hours ago</i>
          </CardContent>
        </Card>
        <div className='flex justify-between items-center '>
          <div className='flex justify-between 2xl:gap-6 gap-3 items-center w-full'>
            <div className='flex 2xl:gap-6 gap-2 items-center'>
              <PostActionsContainer icon='favorite' count={3} />
              <PostActionsContainer icon='visibility' count={3} />
              <PostActionsContainer icon='comment' count={3} />
            </div>
            <div className='flex 2xl:gap-6 gap-3 items-center'>
              <PostActionsContainer icon='share' count={3} />
              <PostActionsContainer icon='bookmark' />
            </div>
          </div>
        </div>
        <div>
          <div className='grid grid-cols-2 w-[95%] mx-auto sticky lg:top-0  bg-darkAccent z-10'>
            <TabItem
              className={cn(
                activeTab === 'comment' ? ' border-primary border-b-2 ' : ''
              )}
              onClick={() => setActiveTab('comment')}
            >
              <span>Comments</span>
            </TabItem>
            <TabItem
              className={cn(
                activeTab === 'creator' ? ' border-primary border-b-2 ' : ''
              )}
              onClick={() => setActiveTab('creator')}
            >
              <span>More Work</span>
            </TabItem>
          </div>
          <div
            className={cn(
              'py-3 w-[95%]  lg:h-auto mx-auto space-y-3',
              activeTab === 'comment'
                ? 'overflow-y-auto scroller h-[calc(100vh/2)]'
                : ''
            )}
          >
            {activeTab === 'comment'
              ? Array.from({ length: 19 }, (_, i) => i).map(item => (
                  <Comment key={item} showNestedComments />
                ))
              : null}
            {activeTab === 'creator' ? (
              <>
                <Card id='more-work' className='bg-card'>
                  <CardHeader className='flex flex-row justify-start items-center gap-2'>
                    More by{' '}
                    <strong className='cursor-pointer hover:text-primary'>
                      Guillaume
                    </strong>
                  </CardHeader>
                  <CardContent className='grid grid-cols-3 gap-1'>
                    {Array.from({ length: 6 }, (_, i) => i).map(item => (
                      <Image
                        key={item}
                        src={project.smaller_square_cover_url}
                        alt='more-work'
                        height={100}
                        width={100}
                        className='rounded-sm w-full'
                      />
                    ))}
                  </CardContent>
                </Card>
                <Card className='bg-card'>
                  <CardContent className='flex gap-2 flex-wrap pt-6'>
                    <strong className='opacity-70'>Software :</strong>
                    {sample_cateories.slice(0, 4).map(cat => (
                      <Badge key={cat} className=' border opacity-70'>
                        {cat}
                      </Badge>
                    ))}
                  </CardContent>
                  <CardContent className='flex gap-2 flex-wrap pt-6'>
                    <strong className='opacity-70'>Category :</strong>
                    {sample_cateories.slice(0, 4).map(cat => (
                      <Badge key={cat} className=' border opacity-70'>
                        {cat}
                      </Badge>
                    ))}
                  </CardContent>

                  <CardContent className='flex gap-2 flex-wrap'>
                    <strong className='opacity-70'>Tags :</strong>
                    {sample_cateories.slice(0, 3).map(cat => (
                      <Badge key={cat} className='border opacity-70'>
                        {cat}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div
        className={cn(
          'flex justify-center items-center border-t border-border',
          activeTab === 'comment' ? 'h-[80px]' : 'hidden'
        )}
      >
        <CommentInput />
      </div>
    </div>
  )
}
function PostActionsContainer ({
  count,
  icon
}: {
  icon: string
  count?: number
}) {
  return (
    <div className='flex justify-between items-center 2xl:gap-2 gap-1'>
      <div
        className='flex justify-center items-center bg-lightAccent h-8 w-8 
                  2xl:h-9 2xl:w-9 rounded-full'
      >
        <MaterialSymbolIcon
          variant='filled'
          className='2xl:text-[20px] text-base'
        >
          {icon}
        </MaterialSymbolIcon>
      </div>
      {count && <span className='font-bold opacity-90'>{count}</span>}
    </div>
  )
}

function TabItem ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex justify-center items-center py-1 cursor-pointer ',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
