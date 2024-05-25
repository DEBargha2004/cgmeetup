import { cn } from '@/lib/utils'
import Image from 'next/image'
import projects from '../../../../public/data/projects.json'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { sample_cateories } from '@/constants/categories'
import { Badge } from '@/components/ui/badge'
import {
  LimitText,
  MaterialSymbolIcon,
  ProfileInfoOverView
} from '@/components/custom'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import Close from './_components/close'

export default function Post ({
  params: { postId }
}: {
  params: { postId: string }
}) {
  const project_idx = projects.data.findIndex(
    project => project.id === Number(postId)
  )
  const description = `Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text ever
since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only
five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. It was popularised in the 1960s with
the release of Letraset sheets containing Lorem Ipsum passages, and
more recently with desktop publishing software like Aldus PageMaker
including versions of Lorem Ipsum`

  const project = projects.data[project_idx] || {}

  return (
    <main className='h-full max-w-[100vw] flex justify-between items-start'>
      <div
        className='w-[70%] h-full flex justify-center items-center 
             relative bg-darkAccent'
      >
        <div className='overflow-y-auto h-full snap-mandatory snap-y scroller-hide'>
          {Array.from({ length: 4 }, (_, i) => i).map(item => (
            <PostImage key={item}>
              <Image
                src={project.smaller_square_cover_url}
                alt={project.title}
                height={800}
                width={800}
                className='h-full w-auto shrink-0'
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
          <div
            className='h-full absolute top-0 left-0 flex justify-center items-center px-8
        hover:bg-lightAccent/20 transition-all cursor-pointer'
          >
            <MaterialSymbolIcon>arrow_back_ios</MaterialSymbolIcon>
          </div>
        </Link>
        <Link
          href={`/post/${
            projects.data[
              project_idx + 1 >= projects.data.length ? 0 : project_idx + 1
            ]?.id
          }`}
        >
          <div
            className='h-full absolute top-0 right-0 flex justify-center items-center px-8
          hover:bg-lightAccent/20 transition-all cursor-pointer'
          >
            <MaterialSymbolIcon>arrow_forward_ios</MaterialSymbolIcon>
          </div>
        </Link>
      </div>
      <div className='w-[30%] h-full overflow-y-auto border-l px-4 scroller space-y-3 py-5'>
        <Card className='rounded bg-lightAccent relative'>
          <Close />
          <CardContent id='user-profile' className='space-y-6 pt-6 pb-3'>
            <ProfileInfoOverView
              heading='text-[16px]'
              description='text-[12px] text-white opacity-70'
            >
              <Button>
                {/* <MaterialSymbolIcon className='mr-2'>
                  person_add
                </MaterialSymbolIcon>{' '} */}
                Follow
              </Button>
            </ProfileInfoOverView>
          </CardContent>
          <CardContent id='post-info' className='space-y-2 pt-0'>
            <h1 className='text-xl font-bold'>{project.title}</h1>
            <LimitText className='text-[14px]'>{description}</LimitText>
            <i className='text-muted-foreground text-xs'>Posted 6 hours ago</i>
          </CardContent>
        </Card>
        <div className='flex justify-between items-center px-2'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex gap-6 items-center'>
              <div className='flex justify-between items-center gap-2'>
                <div className='flex justify-center items-center bg-lightAccent h-10 w-10 rounded-full'>
                  <MaterialSymbolIcon className='text-2xl'>
                    favorite
                  </MaterialSymbolIcon>
                </div>
                <span className='font-bold opacity-90'>3</span>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <div className='flex justify-center items-center bg-lightAccent h-10 w-10 rounded-full'>
                  <MaterialSymbolIcon className='text-2xl'>
                    visibility
                  </MaterialSymbolIcon>
                </div>
                <span className='font-bold opacity-90'>3</span>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <div className='flex justify-center items-center bg-lightAccent h-10 w-10 rounded-full'>
                  <MaterialSymbolIcon className='text-2xl'>
                    comment
                  </MaterialSymbolIcon>
                </div>
                <span className='font-bold opacity-90'>3</span>
              </div>
            </div>
            <div className='flex gap-6 items-center'>
              <div className='flex justify-between items-center gap-2'>
                <div className='flex justify-center items-center bg-lightAccent h-10 w-10 rounded-full'>
                  <MaterialSymbolIcon className='text-2xl'>
                    send
                  </MaterialSymbolIcon>
                </div>
                <span className='font-bold opacity-90'>3</span>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <div className='flex justify-center items-center bg-lightAccent h-10 w-10 rounded-full'>
                  <MaterialSymbolIcon className='text-2xl'>
                    bookmark
                  </MaterialSymbolIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Card id='comments' className='space-y-2 border'>
          <CardHeader className=' bg-lightAccent z-10 py-2 font-semibold border-b'>
            Comments (2)
          </CardHeader>
          <CardContent className='pt-6 space-y-6 rounded h-[500px] scroller overflow-y-auto bg-darkAccent'>
            {Array.from({ length: 12 }, (_, i) => i).map(item => (
              <Comment key={item} />
            ))}
          </CardContent>
          <div className='w-full'>
            <form className='relative'>
              <Input
                className='h-12 pl-10 pr-16 text-opacity-70'
                placeholder='Post a comment...'
              />
              <MaterialSymbolIcon className='absolute top-1/2 -translate-y-1/2 left-3 text-2xl'>
                face
              </MaterialSymbolIcon>
              <span className='absolute top-1/2 -translate-y-1/2 right-3 text-primary'>
                POST
              </span>
            </form>
          </div>
        </Card>

        <Card className='bg-lightAccent'>
          <CardHeader>
            <strong>Tags</strong>
          </CardHeader>
          <CardContent className='flex gap-2 flex-wrap'>
            {sample_cateories.map(cat => (
              <Badge key={cat} className=' border-primary'>
                {cat}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className='bg-lightAccent'>
          <CardHeader>
            <strong>Category</strong>
          </CardHeader>
          <CardContent className='flex gap-2 flex-wrap'>
            {sample_cateories.map(cat => (
              <Badge key={cat} className=' border-primary'>
                {cat}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card id='more-work' className='bg-lightAccent'>
          <CardHeader className='flex flex-row justify-start items-center gap-2'>
            More by <strong>Guillaume</strong>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-1'>
            {Array.from({ length: 6 }, (_, i) => i).map(item => (
              <Image
                key={item}
                src={project.smaller_square_cover_url}
                alt='more-work'
                height={100}
                width={100}
                className='rounded w-full'
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
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
    <div className={cn('h-full w-auto snap-center shrink-0', className)}>
      {children}
    </div>
  )
}

function Comment () {
  return (
    <div className='flex flex-col justify-start items-start gap-2'>
      <ProfileInfoOverView
        heading='text-white opacity-60 text-[16px]'
        description='text-white opacity-60 text-[12px]'
      />
      <p className='w-[calc(100%-50px)] ml-auto font-semibold'>Lorem ipsum</p>
    </div>
  )
}
