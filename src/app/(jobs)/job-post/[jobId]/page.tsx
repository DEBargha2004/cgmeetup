import {
  FeaturedJobCard,
  LimitText,
  MaterialSymbolIcon
} from '@/components/custom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { sample_cateories } from '@/constants/categories'
import Image from 'next/image'
import Link from 'next/link'
import add1 from '../../../../../public/images/add_1.jpg'
import add2 from '../../../../../public/images/add-2.jpg'

const job_summary = [
  {
    title: 'Job Category',
    value: 'IT and Software'
  },
  {
    title: 'Job Category',
    value: 'IT and Software'
  }
  // {
  //   title: 'Job Category',
  //   value: 'IT and Software'
  // },
  // {
  //   title: 'Job Category',
  //   value: 'IT and Software'
  // }
]

export default function JobPage ({
  params: { jobId }
}: {
  params: { jobId: string }
}) {
  return (
    <div className='md:w-[90%] mx-auto p-4 space-y-8'>
      <section className='flex justify-between items-center'>
        <Breadcrumb className='w-full  '>
          <BreadcrumbList>
            <BreadcrumbItem>Jobs</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>job_id</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='flex justify-end gap-2 items-center w-full'>
          <MaterialSymbolIcon
            variant='filled'
            className='opacity-100 hover:text-primary text-[20px] cursor-pointer'
          >
            more_vert
          </MaterialSymbolIcon>
          <MaterialSymbolIcon
            variant='filled'
            className='opacity-100 hover:text-primary text-[20px] cursor-pointer'
          >
            close
          </MaterialSymbolIcon>
        </div>
      </section>
      <div className='flex justify-between items-start gap-2'>
        <div className='w-full lg:w-[calc(100%-400px)] gap-2'>
          <section className='my-10 flex gap-5'>
            <Avatar className='h-20 w-20 rounded'>
              <AvatarImage src='https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204' />
              <AvatarFallback>HU</AvatarFallback>
            </Avatar>
            <div className='w-full flex flex-col gap-2'>
              <h1 className='text-3xl font-black'>Lead Environment Artist</h1>
              <div className='text-sm flex items-center gap-2'>
                <Link href={''} className='hover:text-primary'>
                  <span>Ubisoft</span>
                </Link>
                <div className='xl:text-sm text-xs w-8 h-8 rounded-full bg-primary grid place-content-center'>
                  <MaterialSymbolIcon className='opacity-100'>
                    person_add
                  </MaterialSymbolIcon>
                </div>
              </div>
            </div>
          </section>
          <section className=''>
            <div className='flex gap-2 items-center '>
              <MaterialSymbolIcon
                variant='filled'
                className='text-lg text-white opacity-100'
              >
                location_on
              </MaterialSymbolIcon>
              <span className='text-lg'>Los Angeles, Singapore</span>
            </div>
            <div>
              <div className='flex gap-3 justify-between items-center mt-1 w-fit'>
                <Badge variant={'outline'} className='bg-transparent'>
                  Full Time
                </Badge>
                <Badge variant={'outline'} className='bg-transparent'>
                  Onsite
                </Badge>
                <span className='text-sm text-primary'>
                  USD $ 3.5 - 4.5 LPA
                </span>
              </div>
            </div>
            <div
              className='flex flex-col xl:flex-row justify-between lg:items-start items-center 
          gap-y-5 xl:gap-2 my-4 w-full lg:w-full'
            >
              <div className='flex justify-between flex-row items-center w-full'>
                <div className='flex justify-between items-center gap-2'>
                  <Button className='px-7'>
                    <MaterialSymbolIcon
                      variant='filled'
                      className='mr-2 opacity-100'
                    >
                      work
                    </MaterialSymbolIcon>
                    Apply
                  </Button>
                </div>
                <div className='flex justify-end items-center w-fit xl:gap-5 gap-3 mr-5'>
                  <div className='flex gap-3 xl:gap-6 items-center'>
                    <div className='flex justify-between items-center gap-2'>
                      <div
                        className='flex justify-center items-center bg-lightAccent h-8 w-8 
                2xl:h-9 2xl:w-9 rounded-full'
                      >
                        <MaterialSymbolIcon
                          variant='filled'
                          className='2xl:text-[20px] text-base'
                        >
                          favorite
                        </MaterialSymbolIcon>
                      </div>
                      <span className='font-bold opacity-90'>3</span>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                      <div
                        className='flex justify-center items-center bg-lightAccent h-8 w-8 
                2xl:h-9 2xl:w-9 rounded-full'
                      >
                        <MaterialSymbolIcon
                          variant='filled'
                          className='2xl:text-[20px] text-base'
                        >
                          visibility
                        </MaterialSymbolIcon>
                      </div>
                      <span className='font-bold opacity-90'>3</span>
                    </div>
                  </div>
                  <div className='flex gap-6 items-center'>
                    <div className='flex justify-between items-center gap-2'>
                      <div
                        className='flex justify-center items-center bg-lightAccent h-8 w-8 
                2xl:h-9 2xl:w-9 rounded-full'
                      >
                        <MaterialSymbolIcon
                          variant='filled'
                          className='2xl:text-[20px] text-base'
                        >
                          share
                        </MaterialSymbolIcon>
                      </div>
                      <span className='font-bold opacity-90'>3</span>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                      <div
                        className='flex justify-center items-center bg-lightAccent h-8 w-8 
                2xl:h-9 2xl:w-9 rounded-full'
                      >
                        <MaterialSymbolIcon
                          variant='filled'
                          className='2xl:text-[20px] text-base'
                        >
                          bookmark
                        </MaterialSymbolIcon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='h-fit w-full lg:w-1/4 lg:min-w-[400px] space-y-2 rounded shrink-0'></div> */}
            </div>
          </section>
          <section className='space-y-4 col-span-3'>
            <Card className='' id='job-description'>
              <CardHeader className='text-xl font-semibold'>
                Job Description
              </CardHeader>
              <CardContent className=''>
                <p className='text-sm sm:text-base'>
                  We are a diverse team and experienced team of developers
                  driven by a passion for our art, united by our core values and
                  inspired by a culture of inclusivity to build amazing games
                  that thrill players everywhere. We pursue growth and
                  innovation in an environment of safety and trust. Our culture
                  is built on the belief that the more varied voices in our
                  collective will strengthen our team and our games. We are
                  looking for our next teammate who will raise our bar and make
                  us better. What we need: As a Lead Environment Artist at 31st
                  Union, your passion, knowledge, and experience will be
                  integral to growing a team of talented artists and defining
                  the look and style of a new generation of player driven
                  experiences. Your expertise will be central to bringing our
                  immersive landscapes, architecture, props, and natural
                  environments to life. Who you are: You are an experienced
                  Environment Artist with strong knowledge AAA games and have an
                  attention to detail. You are proficient in both Substance
                  Designer and Substance Painter with knowledge in developing
                  workflows and leading a team of artist. You are on the lookout
                  for next gen tools and practices that empower your team and
                  improve efficiency for the project. You possess a keen ability
                  to communicate and collaborate across disciplines sharing
                  ideas and articulating visions. You are inspired by growth and
                  excellence and thrive on sharing your knowledge with your
                  teammates while continually honing your craft. Iterating,
                  communicating, and creating together is what drives your
                  passion for art and games. You are knowledgeable in all the
                  tools, techniques, and asset creation pipelines: UE5,
                  Substance Designer, Substance Painter, ZBrush, Maya/Blender,
                  Photoshop, Jira, Confluence.
                </p>
                <i className='text-xs opacity-60 inline-block'>34 hours ago</i>
              </CardContent>
            </Card>
            <Card className='' id='job-skills'>
              <CardHeader className='text-xl font-semibold'>
                Required Skills
              </CardHeader>
              <CardContent className='flex flex-wrap gap-2'>
                {sample_cateories.map(cat => (
                  <Badge key={cat} className=' whitespace-nowrap'>
                    {cat}
                  </Badge>
                ))}
              </CardContent>
            </Card>
            <Card className=''>
              <CardHeader className='text-xl font-semibold'>
                Job Summary
              </CardHeader>
              <CardContent className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {job_summary.map(({ title, value }, index) => (
                  <div key={index} className='space-y-2'>
                    <h1 className='sm:text-base text-sm'>{title}</h1>
                    <p className='text-xs sm:text-sm text-primary'>{value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className='' id='about'>
              <CardHeader className='text-xl font-semibold text-primary pb-3'>
                <div className='flex items-center gap-4'>
                  <p className='text-white hover:text-primary'>Ubisoft</p>
                  <Button variant={'outline'} className='bg-transparent group'>
                    <span className='group-hover:text-primary mr-2'>
                      View All Jobs
                    </span>
                    <MaterialSymbolIcon classID=''>
                      arrow_right_alt
                    </MaterialSymbolIcon>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className='text-sm sm:text-base'>
                Paragraphs are the building blocks of papers. Many students
                define paragraphs in terms of length: a paragraph is a group of
                at least five sentences, a paragraph is half a page long, etc.
                In reality, though, the unity and coherence of ideas among
                sentences is what constitutes a paragraph.
              </CardContent>
            </Card>
            <Card>
              {/* <CardHeader>Tags</CardHeader> */}
              <CardContent className='flex gap-2 flex-wrap pt-6'>
                <strong className='opacity-70'>Tags :</strong>
                {sample_cateories.map(cat => (
                  <Badge key={cat} className='border opacity-70'>
                    {cat}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
        <div>
          <section>
            {Array.from({ length: 1 }, (_, i) => i).map(i => (
              <Link
                href={'/gallery/a8'}
                key={i}
                className='inline-block w-full'
              >
                <Image
                  src={i % 2 === 0 ? add1 : add2}
                  height={300}
                  width={300}
                  alt='add'
                  className='max-w-[300px] aspect-square object-cover mx-auto'
                />
              </Link>
            ))}
          </section>
          <section className='h-fit w-full lg:w-1/4 lg:min-w-[400px] space-y-2 rounded shrink-0'>
            <Button
              variant={'outline'}
              className='bg-transparent hover:bg-transparent group'
            >
              <span className='group-hover:text-primary mr-2 '>
                View All Jobs
              </span>
              <MaterialSymbolIcon classID=''>
                arrow_right_alt
              </MaterialSymbolIcon>
            </Button>
            <FeaturedJobCard avatar='rounded' />
            <FeaturedJobCard avatar='rounded' />
            <FeaturedJobCard avatar='rounded' />
            <FeaturedJobCard avatar='rounded' />
          </section>
        </div>
      </div>
    </div>
  )
}
