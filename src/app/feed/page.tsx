import projects from '../../../public/data/projects.json'
import {
  FeedCard,
  JobCard,
  JobCardContainer,
  SuggestionCard
} from '@/components/custom/feed'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { sample_cateories } from '@/constants/categories'
import { feedNavItems } from '@/constants/feed-nav'
import Link from 'next/link'
import { PlayCircle } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { MaterialSymbolIcon } from '@/components/custom'

export default function FeedPage () {
  return (
    <main className='h-full flex md:flex-row flex-col-reverse justify-start items-start'>
      <div
        className='w-full h-fit bottom-0 left-0 md:w-[75px] xl:w-[250px] 
      z-20 md:h-full border-r border-t px-2 flex flex-row md:flex-col justify-center md:justify-start 
      items-center md:items-start py-2 md:pt-8 md:overflow-y-auto scroller overflow-x-auto'
      >
        {feedNavItems.map((item, item_idx) => (
          <React.Fragment key={item_idx}>
            {item.type === 'separator' ? (
              <div className='py-2' />
            ) : item.type === 'header' ? (
              <div
                className='hidden xl:flex justify-start items-center rounded p-2 
              text-xl font-bold shrink-0 w-full'
              >
                <h1>{item.label}</h1>
              </div>
            ) : (
              <Link href={item.href} className='w-full'>
                <div
                  className='flex justify-center lg:gap-2 xl:justify-start items-center rounded hover:bg-lightAccent 
              p-2 font-semibold shrink-0'
                >
                  <MaterialSymbolIcon className=''>
                    {item.icon_name || ''}
                  </MaterialSymbolIcon>
                  <p className='xl:block hidden'>{item.label}</p>
                </div>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
      <div
        className='w-full h-[calc(100%-40px)] md:h-full md:w-[calc(100%-75px)] xl:w-[calc(100%-250px)]  overflow-y-auto flex justify-center 
      items-start lg:gap-[2%] scroller'
      >
        {/* <div className='w-full sm:max-w-[630px] my-4'> */}
        <div className='w-full sm:max-w-[630px] space-y-4 flex flex-col items-center px-2 py-4'>
          <JobCardContainer className='w-full border-none'>
            {Array.from({ length: 9 }, (_, i) => i).map(i => (
              <JobCard key={i} className='select-none bg-transparent border' />
            ))}
          </JobCardContainer>
          <Carousel className='w-full rounded p-4'>
            <CarouselContent className='flex'>
              {sample_cateories.map(category => (
                <CarouselItem
                  className='basis-auto flex justify-center'
                  key={category}
                >
                  <Button
                    variant={'outline'}
                    className='whitespace-nowrap w-full flex justify-center border-primary 
                   select-none bg-transparent hover:bg-inherit'
                  >
                    {category}
                  </Button>
                </CarouselItem>
              ))}
              <CarouselItem className='basis-auto flex justify-center'>
                <Button
                  variant={'outline'}
                  className='whitespace-nowrap w-full flex justify-center border-primary 
                   select-none bg-transparent'
                >
                  <span className='material-symbols-outlined'>
                    work_history
                  </span>
                  <span className='material-symbols-outlined'>add</span>
                </Button>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          {projects.data.map(project => (
            <FeedCard key={project.id} project={project} />
          ))}
        </div>
        {/* </div> */}
        <div
          className='w-0 lg:w-[35%] max-w-[450px]  h-fit  
         my-12 feed-right-bar space-y-2 overflow-hidden'
        >
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
        </div>
      </div>
    </main>
  )
}
