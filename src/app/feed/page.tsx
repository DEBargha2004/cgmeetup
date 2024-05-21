import Image from 'next/image'
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
    <main className='flex justify-center items-start gap-10 py-12 sm:px-4 w-full'>
      <div className='w-[30%] h-[400px] bg-red-500 sticky top-12'></div>
      <div className='w-full shrink-0 sm:w-fit space-y-4 flex flex-col items-center px-2'>
        <JobCardContainer className='w-full sm:max-w-[530px]'>
          {Array.from({ length: 9 }, (_, i) => i).map(i => (
            <JobCard key={i} className='select-none' />
          ))}
        </JobCardContainer>
        <Carousel className='w-full sm:max-w-[530px] border rounded p-4'>
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

      <div className='w-[30%] h-[400px] bg-red-500 sticky top-12'></div>
    </main>
  )
}
