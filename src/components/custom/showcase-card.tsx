'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLProps } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { PersonAdd } from '@mui/icons-material'

export default function ShowcaseCard ({
  className,
  ...props
}: {} & HTMLProps<HTMLDivElement>) {
  return (
    <Card className={cn('@container')} {...props}>
      <div
        className={cn(
          'flex @xl:flex-row flex-col justify-between gap-4 items-stretch p-3 bg-card hover:bg-darkAccent/80 transition-all',
          className
        )}
      >
        <div className='shrink-0 '>
          <div id='profile' className='flex justify-start items-start gap-2'>
            <div className='px-2 shrink-0' id='profile-image'>
              <Image
                src={
                  'https://cdnb.artstation.com/p/users/avatars/000/809/063/large/ffeb4741d6275c9a5f8e78eee0703a0f.jpg?1642309641'
                }
                alt='profile-image'
                height={100}
                width={100}
                className='object-cover rounded-full h-[90px] w-[90px] border-2 border-white 
              box-content'
              />
            </div>
            <div
              id='profile-description'
              className='space-y-3 @xl:w-fit w-full '
            >
              <div className='pr-3'>
                <div className='flex justify-start items-center gap-2 pt-2'>
                  <h1 className='text-lg font-semibold'>Narendra Kumar</h1>
                  {/* <Badge className='bg-primary rounded-full'>PRO</Badge> */}
                </div>
                <div className='flex justify-between items-end'>
                  <div>
                    <p className='text-sm opacity-70'>Artist</p>
                    <p className='text-sm opacity-70'>Rome,Italy</p>
                  </div>
                  <Button className='shrink-0 text-xs h-6 w-6 rounded-full p-0'>
                    <PersonAdd className='h-3' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div id='info'></div>
        </div>
        <div id='showcase-images' className='grid grid-cols-3 gap-2'>
          {Array.from({ length: 3 }, (_, i) => i).map(i => (
            <Image
              key={i}
              src={
                'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
              }
              alt='showcase'
              height={140}
              width={140}
              className='w-full h-full object-cover rounded-sm'
            />
          ))}
        </div>
      </div>
    </Card>
  )
}
