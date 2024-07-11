'use client'

import { MaterialSymbolIcon, ProfileInfoOverView } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function Comment ({
  avatar,
  commentContainer,
  showNestedComments
}: {
  avatar?: string
  commentContainer?: string
  showNestedComments?: boolean
}) {
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [comentInfo, setComentInfo] = useState({
    value: ''
  })
  const [showMoreComments, setShowMoreComments] = useState(false)
  return (
    <div className='flex flex-col justify-start items-start gap-2'>
      <ProfileInfoOverView
        heading={cn(
          'text-[14px] xl:text-[14px]',
          commentContainer && 'text-[12px] xl:text-[14px]'
        )}
        description='text-[10px] xl:text-[12px] text-white opacity-70'
        image={avatar}
      />
      <div className={cn('w-[calc(100%-50px)] ml-auto', commentContainer)}>
        <p
          className={cn(
            'font-semibold xl:text-[14px] text-[12px]',
            commentContainer && 'xl:text-[12px] text-[11px]'
          )}
        >
          Lorem ipsum
        </p>
        <div className='flex justify-start items-center gap-2 '>
          <MaterialSymbolIcon className='text-sm'>favorite</MaterialSymbolIcon>
          <i className='text-xs opacity-70'>34 hours ago</i>
          <p
            className='text-xs opacity-70'
            onClick={() => setShowCommentInput(true)}
          >
            Reply
          </p>
        </div>

        {showCommentInput ? (
          <div className='w-full px-1 space-y-2'>
            <Input
              className='w-full'
              value={comentInfo.value}
              onChange={e =>
                setComentInfo({ ...comentInfo, value: e.target.value })
              }
            />

            <div className='flex justify-end items-center gap-2'>
              <Button
                variant={'outline'}
                className='h-8 text-sm px-2'
                onClick={() => setShowCommentInput(false)}
              >
                Cancel
              </Button>
              <Button className='h-8 text-sm px-2' disabled={!comentInfo.value}>
                Post
              </Button>
            </div>
          </div>
        ) : null}
        {showNestedComments ? (
          <div className='space-y-2'>
            <div className='flex justify-start items-center'>
              <MaterialSymbolIcon
                className='cursor-pointer opacity-100 text-xl h-8 aspect-square rounded-full 
        flex justify-center items-center hover:bg-lightAccent/50 select-none'
                onClick={() => setShowMoreComments(!showMoreComments)}
              >
                {showMoreComments ? 'expand_less' : 'expand_more'}
              </MaterialSymbolIcon>
              <p className='text-primary text-xs'>4 replies</p>
            </div>

            {showMoreComments ? (
              <div className='space-y-1'>
                {Array.from({ length: 4 }, (_, i) => i).map(item => (
                  <Comment
                    key={item}
                    avatar='h-7 w-7'
                    commentContainer='w-[calc(100%-40px)]'
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
