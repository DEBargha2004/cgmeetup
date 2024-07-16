import { MaterialSymbolIcon } from '@/components/custom'
import LatestSectionContainer from '@/components/custom/feed/latest-section-container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getShortendName } from '@/functions'
import profile from '@/../public/images/profile-1.jpg'
import postimage from '@/../public/images/dog-vertical.webp'
import Image from 'next/image'
import { Chat } from '@mui/icons-material'

export default function LatestComments () {
  return (
    <div className='space-y-4'>
      <h1 className=' text-lg'>Latest Comments</h1>
      <LatestSectionContainer.ItemsContainer className='grid xl:grid-cols-2 gap-x-6 bg-card rounded border p-3 space-y-0'>
        {Array.from({ length: 6 }).map((_, i) => (
          <LatestSectionContainer.Item
            key={i}
            className='flex justify-between items-start gap-4 '
          >
            <Avatar>
              <AvatarImage src={profile.src} />
              <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
            </Avatar>
            <div className='space-y-1 w-full'>
              <div className='line-clamp-3 text-sm'>
                <strong className='cursor-pointer hover:text-primary'>
                  Moon Hynters:
                </strong>
                &nbsp;
                <span className='opacity-70'>
                  Abs commented on Cyberpunk Car Concept art by Alex
                </span>
              </div>
              <div className='flex justify-start items-center gap-2 opacity-70'>
                <Chat fontSize='small' />
                <span>3</span>
              </div>
            </div>
            <div className='h-12 w-12 rounded-md overflow-hidden shrink-0'>
              <Image
                src={postimage}
                alt='post'
                height={80}
                width={80}
                className='h-full w-full object-cover'
              />
            </div>
          </LatestSectionContainer.Item>
        ))}
      </LatestSectionContainer.ItemsContainer>
    </div>
  )
}
