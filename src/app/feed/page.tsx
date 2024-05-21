import projects from '../../../public/data/projects.json'
import { FeedCard, JobCard, JobCardContainer } from '@/components/custom/feed'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { sample_cateories } from '@/constants/categories'

export default function FeedPage () {
  return (
    <main className='h-full flex md:flex-row flex-col-reverse justify-start items-start'>
      <div className='w-full h-10 bottom-0 left-0 md:w-[75px] xl:w-[250px] z-20 md:h-full bg-green-600 md:bg-red-500'></div>
      <div
        className='w-full h-[calc(100%-40px)] md:h-full md:w-[calc(100%-75px)] xl:w-[calc(100%-250px)]  overflow-y-auto flex justify-center 
      items-start sm:gap-[2%] scroller'
      >
        {/* <div className='w-full sm:max-w-[630px] my-4'> */}
        <div className='w-full sm:max-w-[630px] space-y-4 flex flex-col items-center px-2'>
          <JobCardContainer className='w-full'>
            {Array.from({ length: 9 }, (_, i) => i).map(i => (
              <JobCard key={i} className='select-none' />
            ))}
          </JobCardContainer>
          <Carousel className='w-full border rounded p-4'>
            <CarouselContent className='flex'>
              {sample_cateories.map(category => (
                <CarouselItem
                  className='basis-[33%] flex justify-center'
                  key={category}
                >
                  <Badge
                    variant={'outline'}
                    className='whitespace-nowrap w-full flex justify-center border-primary 
                  text-primary select-none'
                  >
                    {category}
                  </Badge>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {projects.data.map(project => (
            <FeedCard key={project.id} project={project} />
          ))}
        </div>
        {/* </div> */}
        <div className='w-0 lg:w-[30%] max-w-[320px] h-10 bg-red-600 sticky top-12 my-12 feed-right-bar'></div>
      </div>
    </main>
  )
}

;<div className='w-full shrink-0 sm:w-fit space-y-4 flex flex-col items-center px-2'>
  <JobCardContainer className='w-full'>
    {Array.from({ length: 9 }, (_, i) => i).map(i => (
      <JobCard key={i} className='select-none' />
    ))}
  </JobCardContainer>
  <Carousel className='w-full border rounded p-4'>
    <CarouselContent className='flex'>
      {sample_cateories.map(category => (
        <CarouselItem
          className='basis-[33%] flex justify-center'
          key={category}
        >
          <Badge
            variant={'outline'}
            className='whitespace-nowrap w-full flex justify-center border-primary 
                  text-primary select-none'
          >
            {category}
          </Badge>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
  {projects.data.map(project => (
    <FeedCard key={project.id} project={project} />
  ))}
</div>
