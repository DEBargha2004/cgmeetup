'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { getShortendName } from '@/functions'
import { cn } from '@/lib/utils'
import { Edit, LocationOn } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs: { label: string; href: string }[] = [
  {
    label: 'Portfolio',
    href: '/@tuit'
  },
  {
    label: 'Posts',
    href: '/@tuit/posts'
  },

  {
    label: 'Jobs',
    href: '/@tuit/jobs'
  },
  {
    label: 'About',
    href: '/@tuit/about'
  },
  {
    label: 'Company',
    href: '/@tuit/company'
  }
]

export default function ProfileLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  return (
    <section className='h-full bg-darkAccent'>
      <div className='h-2/5 relative'>
        <Image
          src={
            'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
          }
          alt='back-image'
          height={400}
          width={400}
          className='w-full h-full object-cover'
        />
        <div
          className='md:h-[200px] md:w-[200px] h-[150px] w-[150px] border-2 border-white 
        absolute left-1/2 top-full -translate-x-1/2 -translate-y-[60%] rounded-full'
        >
          <Avatar className='h-full w-full'>
            <AvatarImage
              src='https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204'
              alt='profile'
              height={300}
              width={300}
            />
            <AvatarFallback className='text-2xl'>
              {getShortendName('Alibaba Salmon')}
            </AvatarFallback>
          </Avatar>
          <div
            className='absolute h-8 w-8 rounded-full bg-black/60 bottom-5 right-0 flex 
          justify-center items-center cursor-pointer'
          >
            <Edit className='h-4 text-primary opacity-100' />
          </div>
        </div>
      </div>
      <div className='mt-[90px] flex flex-col justify-between items-center gap-2'>
        <h1 className='md:text-4xl text-2xl font-bold'>Alibaba Salmon</h1>
        <div className='flex flex-col justify-between items-center gap-[6px]'>
          <p className='text-sm  opacity-60'>3D Animator</p>
          <p className='flex justify-center items-center opacity-60 text-sm'>
            <LocationOn className='h-[18px]' />
            &nbsp; Florida,USA
          </p>
        </div>
        <div className='flex flex-col justify-between items-center gap-5 w-1/5 min-w-[250px]'>
          <div className='flex justify-center items-center gap-5 w-full'>
            <Link href={'/@tuit'}>
              <ProfileSubSectionItem heading='234' description='Posts' />
            </Link>
            {/* <Separator orientation='vertical' className='h-[40px] w-[2px]' /> */}
            <Link href={'/@tuit/followers'}>
              <ProfileSubSectionItem heading='234' description='Followers' />
            </Link>
            {/* <Separator orientation='vertical' className='h-[40px] w-[2px]' /> */}
            <Link href={'/@tuit/following'}>
              <ProfileSubSectionItem heading='234' description='Following' />
            </Link>
          </div>
          <div className='flex gap-4  sm:flex-row justify-center'>
            <Button className='border-primary w-[150px] h-9'>Follow</Button>
            <Button
              variant={'success'}
              className='border-primary w-[150px] h-9'
            >
              Message
            </Button>
          </div>
        </div>
      </div>
      <div className='my-5'>
        <div className='flex justify-center items-center gap-1 my-2 bg-lightAccent'>
          <Carousel className='w-full'>
            <CarouselContent className='xs:justify-center'>
              {tabs.map(tab => (
                <CarouselItem key={tab.href} className='basis-auto'>
                  <Link href={tab.href}>
                    <div
                      className={cn(
                        'px-4 py-3 hover:bg-card cursor-pointer',
                        pathName === tab.href &&
                          'bg-card border-b-2 border-primary'
                      )}
                    >
                      {tab.label}
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        {children}
      </div>
    </section>
  )
}

function ProfileSubSectionItem ({
  heading,
  description
}: {
  heading: string
  description: string
}) {
  return (
    <div className='text-center flex flex-row items-center gap-1'>
      <h1 className='font-bold text-sm'>{heading}</h1>
      <p className='text-sm opacity-70'>{description}</p>
    </div>
  )
}
