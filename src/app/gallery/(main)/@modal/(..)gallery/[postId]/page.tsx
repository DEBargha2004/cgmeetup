import { cn } from '@/lib/utils'
import Image from 'next/image'
import projects from '@/../public/data/projects.json'
import { Card, CardContent } from '@/components/ui/card'
import {
  LimitText,
  MaterialSymbolIcon,
  ProfileInfoOverView
} from '@/components/custom'
import Link from 'next/link'
import Close from './_components/close'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import vertical from '@/../public/images/dog-vertical.webp'
import horizontal from '@/../public/images/dog.webp'
import { HTMLProps } from 'react'
import Sidebar from './_components/sidebar'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export default function Post ({
  params: { postId }
}: {
  params: { postId: string }
}) {
  const project_idx = projects.data.findIndex(
    project => project.id === Number(postId)
  )

  const project = projects.data[project_idx] || {}

  return (
    <Dialog open>
      <DialogContent className='h-screen max-w-full scroller p-0'>
        <main className='h-screen flex lg:flex-row flex-col justify-start items-start relative overflow-y-auto'>
          <div
            className='w-full xl:w-[74%] lg:w-[70%] lg:h-full  flex flex-col justify-start items-stretch 
             relative bg-darkAccent'
          >
            <div className='md:overflow-y-auto h-fit md:h-full scroller relative'>
              <Close className='z-20 top-4 left-14  w-fit' />
              {Array.from({ length: 4 }, (_, i) => i).map(item => (
                <PostImage key={item} className='relative group'>
                  <Image
                    src={item % 2 === 0 ? horizontal : vertical}
                    alt={project.title}
                    height={800}
                    width={800}
                    className='md:h-full w-fit mx-auto shrink-0 object-contain '
                  />
                  <div
                    className='px-4 py-1 rounded-lg absolute bottom-5 left-1/2 -translate-x-1/2 
              bg-darkAccent flex justify-between items-center gap-6 group-hover:opacity-100 opacity-0
              transition-all'
                  >
                    <MaterialSymbolIcon className='text-xl opacity-100'>
                      download
                    </MaterialSymbolIcon>
                    <MaterialSymbolIcon className='text-xl opacity-100'>
                      open_in_new
                    </MaterialSymbolIcon>
                  </div>
                </PostImage>
              ))}
            </div>
            <Link
              href={`/post/${
                projects.data[
                  project_idx - 1 < 0
                    ? projects.data.length - 1
                    : project_idx - 1
                ]?.id
              }`}
            >
              <Navigator icon='arrow_back_ios' className='left-0' />
            </Link>
            <Link
              href={`/post/${
                projects.data[
                  project_idx + 1 >= projects.data.length ? 0 : project_idx + 1
                ]?.id
              }`}
            >
              <Navigator icon='arrow_forward_ios' className='right-0' />
            </Link>
          </div>

          <Sidebar postId={postId} />
        </main>
      </DialogContent>
    </Dialog>
  )
}

function Navigator ({
  icon,
  className,
  ...props
}: { icon: string } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `h-full absolute top-0 flex justify-center items-center px-4
        hover:bg-lightAccent/20 transition-all cursor-pointer `,
        className
      )}
      {...props}
    >
      <MaterialSymbolIcon className='text-4xl opacity-100'>
        {icon}
      </MaterialSymbolIcon>
    </div>
  )
}

function PostImage ({
  children,
  className
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn('lg:h-full lg:w-full snap-center shrink-0', className)}>
      {children}
    </div>
  )
}
