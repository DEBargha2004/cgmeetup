'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
// import EmojiPicker from 'emoji-picker-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import EmojiPicker from 'emoji-picker-react'
import { FieldType } from '@/types/field-type'
import _ from 'lodash'

// const EmojiPicker = dynamic(() => import('@/components/custom/emoji-picker'), {
//   ssr: false
// })

const messages = [
  {
    id: 1,
    message: 'Hello, how are you?',
    time: '2024-05-29T10:00:00Z',
    user_id: 1
  },
  {
    id: 2,
    message: "I'm doing great, thanks!",
    time: '2024-05-29T10:05:00Z',
    user_id: 2
  },
  {
    id: 3,
    message: 'Are we still on for the meeting later?',
    time: '2024-05-29T10:10:00Z',
    user_id: 1
  },
  {
    id: 4,
    message: "Yes, I'll see you at 3 PM.",
    time: '2024-05-29T10:15:00Z',
    user_id: 3
  },
  {
    id: 5,
    message: 'Great, looking forward to it.',
    time: '2024-05-29T10:20:00Z',
    user_id: 1
  },
  {
    id: 6,
    message: "Don't forget to bring the reports.",
    time: '2024-05-29T10:25:00Z',
    user_id: 2
  },
  {
    id: 7,
    message: 'Will do, see you soon.',
    time: '2024-05-29T10:30:00Z',
    user_id: 1
  },
  {
    id: 8,
    message: 'Just sent you the documents.',
    time: '2024-05-29T10:35:00Z',
    user_id: 3
  },
  {
    id: 9,
    message: 'Received them, thanks!',
    time: '2024-05-29T10:40:00Z',
    user_id: 1
  },
  {
    id: 10,
    message:
      'No problem, let me know if you need anything else. No problem, let me know if you need anything else. No problem, let me know if you need anything else.',
    time: '2024-05-29T10:45:00Z',
    user_id: 2
  }
]

const attachments: (FieldType & { icon: string })[] = [
  { label: 'Images', value: 'gallery', icon: 'photo_library' },
  { label: 'Resume', value: 'resume', icon: 'draft' },
  { label: 'Share Number', value: 'contacts', icon: 'phone' },
  { label: 'Demo Reel', value: 'videos', icon: 'slow_motion_video' }
]

const badges = ['All', 'Unread', 'Groups']

export default function ChatPage () {
  const [showInfo, setShowInfo] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showReactions, setShowReactions] = useState<null | number | string>(
    null
  )
  const [selectedChat, setSelectedChat] = useState<null | number>(null)
  return (
    <div className='flex justify-start items-start h-full relative overflow-hidden'>
      <div
        id='list'
        className={cn(
          'w-full sm:w-2/5 lg:w-1/3 xl:w-1/4 shrink-0 h-full bg-lightAccent border-r p-5 space-y-4 flex flex-col justify-between items-start'
        )}
      >
        <div className='text-2xl flex justify-between items-center w-full'>
          Chats
          <div className='flex gap-1'>
            {badges.map(badge => (
              <Badge
                variant={badge === 'All' ? 'default' : 'outline'}
                key={badge}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        <div className='relative w-full'>
          <Input className='pl-10' placeholder='Search..' />
          <MaterialSymbolIcon
            variant='filled'
            className='absolute top-1/2 -translate-y-1/2 left-3'
          >
            search
          </MaterialSymbolIcon>
        </div>
        <div className='space-y-1 h-full w-full overflow-y-auto scroller'>
          {Array.from({ length: 81 }).map((_, i) => (
            <div
              className={cn(
                ' w-full flex justify-start items-center gap-2 p-2 hover:bg-[#0000009d] cursor-pointer',
                selectedChat === i ? ' bg-black' : 'bg-darkAccent'
              )}
              onClick={() => setSelectedChat(i)}
              key={i}
            >
              <Image
                src={
                  'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
                }
                alt='profile'
                height={40}
                width={40}
                className='rounded-full h-14 w-14 border-2 border-primary p-[2px] object-contain'
              />
              <div className='h-full flex flex-col justify-start gap-1 w-full pr-1'>
                <div className='flex justify-between items-center w-full'>
                  <h1 className='text-base'>Jabby Koya</h1>
                  <p className='text-xs opacity-70'>10:00 AM</p>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-xs opacity-70'>
                    Hey there i am using Shadcn
                  </p>
                  <p className='h-4 w-4 flex justify-center items-center rounded-full bg-success text-xs'>
                    2
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {_.isNull(selectedChat) ? (
        <div className='flex flex-col justify-center items-center w-full gap-10 h-full'>
          <div className='flex justify-between items-center gap-10'></div>
          <p>Artist</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
      ) : (
        <div
          id='chat'
          className={cn(
            'w-full sm:w-3/5 lg:w-2/3 xl:w-3/4 h-full flex overflow-hidden absolute sm:relative',
            !_.isNull(selectedChat) ? ' left-0' : 'left-full sm:left-0'
          )}
        >
          <div
            id='chat-container'
            className={cn(
              `shrink-0 h-full bg-slate-400 flex flex-col justify-between items-center
             bg-darkAccent w-full`,
              showInfo ? 'xl:w-2/3 lg:w-1/2 w-full' : 'w-full'
            )}
          >
            <div
              id='nav'
              className='h-[8%] w-full bg-lightAccent flex justify-between items-center px-2 gap-4'
            >
              <div
                className='flex justify-start items-center gap-2 w-full'
                onClick={() => setShowInfo(true)}
              >
                <Image
                  src={
                    'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
                  }
                  alt='profile'
                  height={40}
                  width={40}
                  className='rounded-full h-10 w-10 border-2 border-white object-contain'
                />
                <div>
                  <h1 className='text-lg'>Alibaba Salmon</h1>
                  <p className='text-xs text-primary '>
                    3D Animator<i className='text-success ml-2'>typing...</i>
                  </p>
                </div>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <MaterialSymbolIcon className='opacity-100'>
                  more_vert
                </MaterialSymbolIcon>
                <MaterialSymbolIcon
                  variant='filled'
                  className='opacity-100 cursor-pointer sm:hidden'
                  onClick={e => {
                    e.stopPropagation()
                    setShowChat(false)
                  }}
                >
                  close
                </MaterialSymbolIcon>
              </div>
            </div>
            <div
              id='messages'
              className='h-[82%] w-full  overflow-y-auto scroller space-y-2 p-2'
            >
              {messages.map(message => (
                <div
                  className={cn(
                    'flex group',
                    message.user_id === 1 ? 'justify-end ' : 'justify-start'
                  )}
                  key={message.id}
                >
                  <div
                    className={cn(
                      'flex max-w-[60%] gap-6 items-center',
                      message.user_id === 1
                        ? 'justify-end flex-row-reverse'
                        : 'justify-start'
                    )}
                  >
                    <div className={cn('w-fit')}>
                      <div
                        className={cn(
                          'p-4 pb-1 rounded flex flex-col justify-between items-end',
                          message.user_id === 1
                            ? 'bg-white text-black rounded-br-none '
                            : 'bg-primary rounded-tl-none'
                        )}
                      >
                        <p>{message.message}</p>
                        <p className='text-xs opacity-70'>
                          {format(message.time, 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    {/* <Popover open={showReactions === message.id} onOpenChange={e => setShowReactions(e?message.id:null)}>
                    <PopoverTrigger asChild>
                      <div className={cn('group-hover:block hidden cursor-pointer',l.isNull(showReactions))}>
                        <MaterialSymbolIcon>mood</MaterialSymbolIcon>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent side='top'></PopoverContent>
                  </Popover> */}
                    <div
                      className={cn(
                        'group-hover:block hidden cursor-pointer'
                        // l.isNull(showReactions)
                      )}
                    >
                      <MaterialSymbolIcon>mood</MaterialSymbolIcon>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              id='input'
              className='h-[10%] w-full flex justify-between items-center gap-4 border-t px-4 bg-lightAccent'
            >
              <div className='flex justify-start items-center gap-4 shrink-0 h-10'>
                {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MaterialSymbolIcon
                    className='text-2xl text-[#ffff46] opacity-100 cursor-pointer 
                  select-none inline-block'
                  >
                    mood
                  </MaterialSymbolIcon>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='top'>jgygef</DropdownMenuContent>
              </DropdownMenu> */}

                <Popover>
                  <PopoverTrigger asChild>
                    <div className='cursor-pointer'>
                      <MaterialSymbolIcon className='text-3xl'>
                        mood
                      </MaterialSymbolIcon>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='w-fit'>
                    <EmojiPicker
                      //@ts-ignore
                      theme={'dark'}
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className='cursor-pointer'>
                      <MaterialSymbolIcon className='text-3xl'>
                        attach_file
                      </MaterialSymbolIcon>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side='top' className='-translate-y-5'>
                    {attachments.map(attachment => (
                      <DropdownMenuItem key={attachment.value}>
                        <MaterialSymbolIcon className='text-2xl opacity-100 mr-2'>
                          {attachment.icon}
                        </MaterialSymbolIcon>
                        <span>{attachment.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Input className='w-full' />
              <div>
                <div className='h-10 w-10 flex justify-center items-center bg-primary rounded-full'>
                  <MaterialSymbolIcon className='text-2xl'>
                    send
                  </MaterialSymbolIcon>
                </div>
              </div>
            </div>
          </div>

          <div
            id='info'
            className={cn(
              `shrink-0 xl:w-1/3 lg:w-1/2 h-full bg-lightAccent w-full duration-300 
            overflow-y-auto scroller p-4 space-y-6
           `,
              showInfo ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'
            )}
          >
            <div className='flex justify-between items-center'>
              <h1 className='text-xl font-semibold'>Profile</h1>
              <MaterialSymbolIcon
                variant='filled'
                className='opacity-100 cursor-pointer'
                onClick={() => setShowInfo(false)}
              >
                close
              </MaterialSymbolIcon>
            </div>
            <div className='flex flex-col justify-between items-center gap-4'>
              <Image
                src={
                  'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
                }
                alt='profile'
                height={100}
                width={100}
                className='rounded-full h-[120px] w-[120px] border-2 border-white'
              />
              <div className='text-center  w-full'>
                <h1 className='text-2xl font-semibold'>Sarah Smith</h1>
                <h2 className='w-4/5 truncate mx-auto text-primary'>
                  sarah.smith
                </h2>
              </div>
              <div className='w-full flex justify-center items-center gap-2'>
                <Button className='w-[35%] flex justify-center gap-2 items-center'>
                  <MaterialSymbolIcon>person_add</MaterialSymbolIcon>
                  <span>Follow</span>
                </Button>
                <Button
                  variant={'outline'}
                  className='w-[35%] flex justify-center gap-2 items-center'
                >
                  <MaterialSymbolIcon
                    variant='filled'
                    className={cn(
                      'opacity-100',
                      true ? 'text-primary' : 'text-white'
                    )}
                  >
                    bookmark
                  </MaterialSymbolIcon>
                  <span>Bookmark</span>
                </Button>
              </div>
              <div className='space-y-2'>
                <h1 className='text-xl'>About</h1>
                <p className='text-sm'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum
                </p>
              </div>
              <div className='space-y-2'>
                <h1 className='text-xl'>Portfolio</h1>
                <div className='grid grid-cols-3 gap-1'>
                  {Array.from({ length: 6 }, (_, i) => i).map((_, i) => (
                    <Image
                      key={i}
                      src={
                        'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
                      }
                      height={100}
                      width={100}
                      alt='post'
                      className='rounded-sm w-full aspect-square object-cover'
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
