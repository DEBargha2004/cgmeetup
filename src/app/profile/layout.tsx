'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getShortendName } from '@/functions'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs: { label: string; href: string }[] = [
  {
    label: 'Posts',
    href: '/profile'
  },
  {
    label: 'Jobs',
    href: '/profile/jobs'
  },
  {
    label: 'About',
    href: '/profile/about'
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
        <Avatar className='md:h-[200px] md:w-[200px] h-[150px] w-[150px] border-2 border-white absolute left-1/2 top-full -translate-x-1/2 -translate-y-[60%]'>
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
      </div>
      <div className='mt-[90px] flex flex-col justify-between items-center gap-2'>
        <h1 className='md:text-4xl text-2xl font-bold'>Alibaba Salmon</h1>
        <div className='flex flex-col justify-between items-center gap-[6px]'>
          <p className='text-sm  opacity-60'>3D Animator</p>
          <p className='flex justify-center items-end opacity-60 text-sm'>
            <MaterialSymbolIcon>location_on</MaterialSymbolIcon>
            &nbsp; Florida,USA
          </p>
        </div>
        <div className='flex flex-col justify-between items-center gap-5 w-1/5 min-w-[250px]'>
          <div className='flex justify-between items-center gap-5 w-full'>
            <div className='text-center flex flex-row items-center gap-1'>
              <h1 className='font-bold text-sm'>234</h1>
              <p className='text-sm'>Posts</p>
            </div>
            {/* <Separator orientation='vertical' className='h-[40px] w-[2px]' /> */}
            <div className='text-center flex flex-row items-center gap-1'>
              <h1 className='font-bold text-sm'>234</h1>
              <p className='text-sm'>Followers</p>
            </div>
            {/* <Separator orientation='vertical' className='h-[40px] w-[2px]' /> */}
            <div className='text-center flex flex-row items-center gap-1'>
              <h1 className='font-bold text-sm'>234</h1>
              <p className='text-sm'>Following</p>
            </div>
          </div>
          <div className='flex gap-4  sm:flex-row justify-center'>
            <Button className='border-primary w-[150px]'>Follow</Button>
            <Button variant={'success'} className='border-primary w-[150px]'>
              Message
            </Button>
          </div>
        </div>
      </div>
      <div className='my-10'>
        <div className='flex justify-center items-center gap-1 my-2'>
          {tabs.map(tab => (
            <Link key={tab.href} href={tab.href}>
              <div
                className={cn(
                  'px-4 py-2 rounded hover:bg-lightAccent cursor-pointer',
                  pathName === tab.href && 'bg-lightAccent'
                )}
              >
                {tab.label}
              </div>
            </Link>
          ))}
        </div>
        {children}
      </div>
    </section>
  )
}
