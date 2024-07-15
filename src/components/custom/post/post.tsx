import { cn } from '@/lib/utils'
import Image from 'next/image'
import projects from '@/../public/data/projects.json'
import Link from 'next/link'
import Close from './_components/close'
import vertical from '@/../public/images/dog-vertical.webp'
import horizontal from '@/../public/images/dog.webp'
import { HTMLProps } from 'react'
import Sidebar from './_components/sidebar'
import {
  ArrowBackIos,
  ArrowForwardIos,
  Download,
  OpenInNew
} from '@mui/icons-material'
import { IconType } from '@/types/icon'
import { Separator } from '@/components/ui/separator'

export default function Post ({
  params: { postId }
}: {
  params: { postId: string }
}) {
  return (
    <main className='h-full w-full md:flex justify-start items-center relative overflow-y-auto md:overflow-hidden scroller'>
      <div className='md:w-[calc(100%-400px)] w-full h-fit md:h-full md:overflow-y-auto scroller-transition relative'>
        {Array.from({ length: 4 }).map((_, i) => (
          <PostImageContainer key={i}>
            <Image
              className='md:h-full md:w-auto h-auto w-full object-contain'
              src={i % 2 === 0 ? vertical : horizontal}
              alt='vertical'
              height={400}
              width={400}
            />
          </PostImageContainer>
        ))}
        <div className='h-10 w-10 rounded-full bg-lightAccent/50 hover:bg-lightAccent/90 absolute top-4 left-4 grid place-content-center'>
          <Close />
        </div>
        <Link
          href={'#'}
          className='md:fixed absolute top-1/2 -translate-y-1/2 right-2 md:right-[405px] cursor-pointer'
        >
          <NavigationElement>
            <ArrowForwardIos />
          </NavigationElement>
        </Link>
        <Link
          href={'#'}
          className='md:fixed absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer'
        >
          <NavigationElement>
            <ArrowBackIos />
          </NavigationElement>
        </Link>
      </div>
      <div className='bg-red-500 md:h-full md:w-[400px] h-screen w-full'>
        <Sidebar postId={postId} />
      </div>
    </main>
  )
}

function NavigationElement ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'w-14 h-14 rounded-full grid place-content-center bg-lightAccent/40 hover:bg-lightAccent/90 transition-all',
        className
      )}
    >
      {children}
    </div>
  )
}

function PostImageContainer ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'md:h-full h-fit w-full flex justify-center group relative',
        className
      )}
    >
      {children}
      <div className='p-2 bg-darkAccent hidden justify-center items-center gap-4 group-hover:flex absolute bottom-10 left-1/2 -translate-x-1/2 rounded-xl'>
        <Download className='cursor-pointer' />
        <Separator orientation='vertical' className='h-6' />
        <OpenInNew className='cursor-pointer' />
      </div>
    </div>
  )
}
