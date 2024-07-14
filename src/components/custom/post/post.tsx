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
    <main className='h-screen flex md:flex-row flex-col justify-start items-start relative overflow-y-auto scroller'>
      <div
        className='w-full md:w-[calc(100%-400px)] md:h-full  flex flex-col justify-start items-stretch 
             relative'
      >
        <div className='md:overflow-y-auto h-fit md:h-full scroller-transition relative'>
          <div
            className='z-30 absolute h-10 w-10 rounded-full grid place-content-center left-8 top-5 
            bg-lightAccent/80'
            // style={{ left: 40, top: 40 }}
          >
            <Close className='' />
          </div>
          {Array.from({ length: 4 }, (_, i) => i).map(item => (
            <PostImage key={item} className='relative group'>
              <Image
                src={item % 2 === 0 ? horizontal : vertical}
                alt={project.title}
                height={800}
                width={800}
                className='md:h-screen w-fit mx-auto shrink-0 object-contain '
              />
              <div
                className='px-4 py-1 rounded-lg absolute bottom-5 left-1/2 -translate-x-1/2 
              bg-darkAccent flex justify-between items-center gap-6 group-hover:opacity-100 opacity-0
              transition-all'
              >
                <Download className='h-5' />
                <OpenInNew className='h-5' />
              </div>
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
          <Navigator Icon={ArrowBackIos} className='left-0' />
        </Link>
        <Link
          href={`/post/${
            projects.data[
              project_idx + 1 >= projects.data.length ? 0 : project_idx + 1
            ]?.id
          }`}
        >
          <Navigator Icon={ArrowForwardIos} className='right-0' />
        </Link>
      </div>

      <Sidebar postId={postId} />
    </main>
  )
}

function Navigator ({
  Icon,
  className,
  ...props
}: { Icon: IconType } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `h-14 w-14 rounded-full absolute top-1/2 -translate-y-1/2 flex justify-center items-center px-4
        hover:bg-lightAccent/40 bg-lightAccent/20 transition-all cursor-pointer`,
        className
      )}
      {...props}
    >
      <Icon className='h-5' />
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
  return <div className={cn('shrink-0', className)}>{children}</div>
}
