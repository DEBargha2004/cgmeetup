import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { JobCard, FeaturedJobCard } from '@/components/custom'
import { sample_cateories } from '@/constants/categories'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function TrendingJobs () {
  return (
    <div className='space-y-5'>
      <section className='flex justify-start items-center gap-10 px-2'>
        <Popover>
          <PopoverTrigger asChild>
            <Button className='bg-lightAccent'>Job Positions</Button>
          </PopoverTrigger>
          <PopoverContent
            side='right'
            className='space-y-4 bg-lightAccent rounded-sm'
          >
            <Input className='h-[37px] w-full' />
            <div className='h-[300px] overflow-y-auto scroller space-y-2 w-[260px]'>
              {['All', ...sample_cateories].map(item => (
                <div
                  key={item}
                  className={cn(
                    'h-10 bg-darkAccent flex justify-center items-center text-sm cursor-pointer rounded-sm',
                    item === 'All' ? 'bg-primary' : ''
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Carousel className='w-[calc(100%-190px)]'>
          <CarouselContent className=''>
            {sample_cateories.map((cat, index) => (
              <CarouselItem className='basis-auto' key={cat}>
                <Badge className='text-sm bg-lightAccent'>{cat}</Badge>
              </CarouselItem>
            ))}
            {sample_cateories.map((cat, index) => (
              <CarouselItem className='basis-auto' key={cat}>
                <Badge className='bg-lightAccent'>{cat}</Badge>
              </CarouselItem>
            ))}
            {sample_cateories.map((cat, index) => (
              <CarouselItem className='basis-auto' key={cat}>
                <Badge className='bg-lightAccent'>{cat}</Badge>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className='-translate-x-3' />
          <CarouselPrevious className='translate-x-3' />
        </Carousel>
      </section>
      <div className='lg:w-[77%] mx-auto grid gap-4 md:gap-8 lg:grid-cols-3'>
        <Card
          className='xl:col-span-2 col-span-3 flex flex-col gap-4 h-fit 
border-none bg-transparent'
        >
          <CardContent className='space-y-4 px-1'>
            <Link href={'/job-post/123'} className='inline-block w-full'>
              <JobCard />
            </Link>
            <Link href={'/job-post/123'} className='inline-block w-full'>
              <JobCard />
            </Link>
            <Link href={'/job-post/123'} className='inline-block w-full'>
              <JobCard />
            </Link>
          </CardContent>
        </Card>
        <Card className='bg-transparent border-none col-span-3 xl:col-span-1'>
          <Card className='bg-transparent border-none'>
            <CardHeader className='xl:pt-0 px-1 pb-3'>
              <CardTitle className='text-lg font-bold'>Featured Jobs</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-4 px-1'>
              <Link href={'/job-post/123'} className='inline-block w-full'>
                <FeaturedJobCard />
              </Link>
              <Link href={'/job-post/123'} className='inline-block w-full'>
                <FeaturedJobCard />
              </Link>
              <Link href={'/job-post/123'} className='inline-block w-full '>
                <FeaturedJobCard />
              </Link>
              <Link href={'/job-post/123'} className='inline-block w-full'>
                <FeaturedJobCard />
              </Link>
            </CardContent>
          </Card>
          <Card className='bg-transparent border-none'>
            <CardHeader className='px-1'>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 gap-2 px-1'>
              {sample_cateories.map(cat => (
                <Button
                  variant={'outline'}
                  className='w-full rounded bg-transparent hover:bg-lightAccent 
         lg:text-sm'
                  key={cat}
                >
                  {cat}
                </Button>
              ))}
            </CardContent>
          </Card>
        </Card>
      </div>
    </div>
  )
}
