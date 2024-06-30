import { cn } from '@/lib/utils'
import Image from 'next/image'
import projects from '../../../../../public/data/projects.json'
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
import vertical from '../../../../../public/images/dog-vertical.webp'
import horizontal from '../../../../../public/images/dog.webp'
import { HTMLProps } from 'react'
import Sidebar from './_components/sidebar'

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
    <main
      className='lg:h-full h-auto overflow-y-auto scroller max-w-[100vw] flex lg:flex-row 
    flex-col justify-start items-start relative'
    >
      <div
        className='w-full xl:w-[74%] lg:w-[70%] lg:h-[calc(100vh-64px)]  flex flex-col justify-start items-stretch 
             relative bg-darkAccent'
      >
        <div className='md:overflow-y-auto h-fit md:h-full md:snap-mandatory md:snap-y scroller relative'>
          <Close className='z-20 top-4 left-14  w-fit' />
          {Array.from({ length: 4 }, (_, i) => i).map(item => (
            <PostImage key={item}>
              <Image
                src={item % 2 === 0 ? horizontal : vertical}
                alt={project.title}
                height={800}
                width={800}
                className='md:h-full w-fit mx-auto shrink-0 object-contain '
              />
            </PostImage>
          ))}
        </div>
        <Link
          href={`/post/${
            projects.data[
              project_idx - 1 < 0 ? projects.data.length - 1 : project_idx - 1
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
        hover:bg-lightAccent/20 transition-all cursor-pointer`,
        className
      )}
      {...props}
    >
      <MaterialSymbolIcon>{icon}</MaterialSymbolIcon>
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
    <div className={cn('h-full w-full snap-center shrink-0', className)}>
      {children}
    </div>
  )
}
