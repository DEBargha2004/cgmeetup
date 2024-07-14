import { cn } from '@/lib/utils'
import Image from 'next/image'
import projects from '../../../../public/data/projects.json'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import vertical from '@/../public/images/dog-vertical.webp'
import horizontal from '@/../public/images/dog.webp'
import Comment from './_components/comment'
import {
  ArrowBackIos,
  ArrowForwardIos,
  Favorite,
  MoreVert,
  PersonAdd,
  Visibility,
  Comment as CommentIcon,
  Share,
  Bookmark,
  EmojiEmotions
} from '@mui/icons-material'

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
    <main
      className='lg:h-full h-auto overflow-y-auto scroller max-w-[100vw] flex lg:flex-row 
    flex-col justify-start items-start relative'
    >
      <Close className='lg:hidden block z-20 top-4 right-4' />
      <div
        className='w-full xl:w-[74%] lg:w-[70%] md:h-[calc(100vh-64px)]  flex flex-col justify-start items-stretch 
             relative bg-darkAccent'
      >
        <Breadcrumb className='w-full p-3 px-6'>
          <BreadcrumbList>
            <BreadcrumbItem>Gallery</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>MonstercarId</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='md:overflow-y-auto h-fit md:h-full md:snap-mandatory md:snap-y scroller'>
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
          <div
            className='h-full absolute top-0 left-0 flex justify-center items-center px-8
        hover:bg-lightAccent/20 transition-all cursor-pointer'
          >
            <ArrowBackIos />
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
            <ArrowForwardIos />
          </div>
        </Link>
      </div>
      <div className='w-full xl:w-[26%] lg:w-[30%] h-full overflow-y-auto px-1 scroller space-y-3 py-2'>
        <Card className='rounded bg-lightAccent relative'>
          <div className='flex justify-end gap-2 items-center absolute top-0 right-0 w-full pt-[6px]'>
            <MoreVert className='hover:text-primary h-5 cursor-pointer' />
            <Close className='lg:block lg:relative hidden text-[20px] opacity-100 hover:text-primary' />
          </div>
          <CardContent id='user-profile' className='space-y-6 pt-7 pb-3 pr-5'>
            <ProfileInfoOverView
              heading='text-[14px] xl:text-[16px]'
              description='text-[11px] xl:text-[12px] text-white opacity-70'
              className='items-center'
              image='w-14 h-14 xl:w-14 xl:h-14'
              textContainer='justify-start gap-1'
            >
              <div
                className='xl:text-sm text-xs h-8 w-8 bg-primary flex justify-center items-center 
              shrink-0 rounded-full'
              >
                <PersonAdd />
              </div>
            </ProfileInfoOverView>
          </CardContent>
          <CardContent id='post-info' className='space-y-2 pt-0'>
            <h1 className='text-xl font-bold'>{project.title}</h1>
            <LimitText className='text-sm'>{description}</LimitText>
            <i className='text-muted-foreground text-xs'>Posted 6 hours ago</i>
          </CardContent>
        </Card>
        <div className='flex justify-between items-center '>
          <div className='flex justify-between 2xl:gap-6 gap-3 items-center w-full'>
            <div className='flex 2xl:gap-6 gap-2 items-center'>
              <div className='flex justify-between items-center 2xl:gap-2 gap-1'>
                <div
                  className='flex justify-center items-center bg-lightAccent h-8 w-8 
                2xl:h-9 2xl:w-9 rounded-full'
                >
                  <Favorite className='2xl:h-5 h-4' />
                </div>
                <span className='font-bold opacity-90'>3</span>
              </div>
              <div className='flex justify-between items-center 2xl:gap-2 gap-1'>
                <div
                  className='flex justify-center items-center bg-lightAccent h-8 w-8 
                2xl:h-9 2xl:w-9 rounded-full'
                >
                  <Visibility className='2xl:h-5 h-4' />
                </div>
                <span className='font-bold opacity-90'>3</span>
              </div>
              <div className='flex justify-between items-center 2xl:gap-2 gap-1'>
                <div
                  className='flex justify-center items-center bg-lightAccent h-8 w-8 
                2xl:h-9 2xl:w-9 rounded-full'
                >
                  <CommentIcon className='2xl:h-5 h-4' />
                </div>
                <span className='font-bold opacity-90'>3</span>
              </div>
            </div>
            <div className='flex 2xl:gap-6 gap-3 items-center'>
              <div className='flex justify-between items-center 2xl:gap-2 gap-1'>
                <div
                  className='flex justify-center items-center bg-lightAccent h-8 w-8 
                2xl:h-9 2xl:w-9 rounded-full'
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Share className='2xl:h-5 h-4' />
                    </DialogTrigger>
                    <DialogContent className='bg-lightAccent'></DialogContent>
                  </Dialog>
                </div>
                <span className='font-bold opacity-90'>3</span>
              </div>
              <div className='flex justify-between items-center 2xl:gap-2 gap-1'>
                <div
                  className='flex justify-center items-center bg-lightAccent h-8 w-8 
                2xl:h-9 2xl:w-9 rounded-full'
                >
                  <Bookmark className='2xl:h-5 h-4' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Card
          id='comments'
          className='space-y-2 border bg-darkAccent rounded-lg'
        >
          <CardHeader className=' bg-lightAccent z-10 py-2 font-semibold border-b'>
            Comments (2)
          </CardHeader>
          <CardContent className='rounded h-[calc(39vh)] pb-0 pl-4 pr-[5px]'>
            <div className='pt-6 space-y-6 scroller overflow-y-auto h-full bg-darkAccent'>
              {Array.from({ length: 12 }, (_, i) => i).map(item => (
                <Comment key={item} showNestedComments />
              ))}
            </div>
          </CardContent>
          <div className='w-full'>
            <form className='relative'>
              <Input
                className='h-12 pl-10 pr-16 text-opacity-70'
                placeholder='Post a comment...'
              />
              <EmojiEmotions className='absolute top-1/2 -translate-y-1/2 left-3 h-6' />
              <span className='absolute top-1/2 -translate-y-1/2 right-3 text-primary'>
                POST
              </span>
            </form>
          </div>
        </Card>

        <Card className='bg-card'>
          <CardContent className='flex gap-2 flex-wrap pt-6'>
            <strong className='opacity-70'>Software :</strong>
            {sample_cateories.slice(0, 4).map(cat => (
              <Badge key={cat} className=' border opacity-70'>
                {cat}
              </Badge>
            ))}
          </CardContent>
          <CardContent className='flex gap-2 flex-wrap pt-6'>
            <strong className='opacity-70'>Category :</strong>
            {sample_cateories.slice(0, 4).map(cat => (
              <Badge key={cat} className=' border opacity-70'>
                {cat}
              </Badge>
            ))}
          </CardContent>

          <CardContent className='flex gap-2 flex-wrap'>
            <strong className='opacity-70'>Tags :</strong>
            {sample_cateories.slice(0, 3).map(cat => (
              <Badge key={cat} className='border opacity-70'>
                {cat}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card id='more-work' className='bg-card'>
          <CardHeader className='flex flex-row justify-start items-center gap-2'>
            More by{' '}
            <strong className='cursor-pointer hover:text-primary'>
              Guillaume
            </strong>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-1'>
            {Array.from({ length: 6 }, (_, i) => i).map(item => (
              <Image
                key={item}
                src={project.smaller_square_cover_url}
                alt='more-work'
                height={100}
                width={100}
                className='rounded-sm w-full'
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
    <div className={cn('h-full w-full snap-center shrink-0', className)}>
      {children}
    </div>
  )
}
