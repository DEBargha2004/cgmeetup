'use client'

import projects from '../../../public/data/projects.json'
import {
  FeedCard,
  JobCardContainer,
  ProfileAvatarStatus,
  UserInfoProfile
} from '@/components/custom/feed'
import { JobCard } from '@/components/custom'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { feedNavItems } from '@/constants/feed-nav'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { MaterialSymbolIcon } from '@/components/custom'
import 'react-circular-progressbar/dist/styles.css'
import ProgressBar from '@/components/custom/progress-bar'
import Image from 'next/image'
import Tags from './_components/tags'
import add1 from '../../../public/images/add_1.jpg'
import add2 from '../../../public/images/add-2.jpg'
import PostCreate from './_components/post-create'

export default function FeedPage () {
  const feedRef = useRef<HTMLDivElement>(null)
  const rightSidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (feedRef.current && rightSidebarRef.current) {
        rightSidebarRef.current.style.height = `${entries[0].contentRect.height}px`
      }
    })

    resizeObserver.observe(feedRef.current!)
  }, [])
  return (
    <main className='h-full flex md:flex-row flex-col-reverse justify-start items-start bg-darkAccent'>
      <div
        className='w-full h-fit bottom-0 left-0 md:w-[75px] 6xl:w-[45%] 5xl:w-2/5
        4xl:w-1/3 xl:w-1/4 lg:w-1/5 z-20 md:h-full border-r  px-2 flex flex-row md:flex-col 
        justify-center md:justify-start items-center md:items-end 
        md:overflow-y-auto scroller overflow-x-auto overflow-y-auto md:pt-8'
      >
        <section className='w-full max-w-[250px] md:flex hidden flex-col justify-between items-center md:mb-10 '>
          <div className='px-2' id='profile-image'>
            <Image
              src={
                'https://cdnb.artstation.com/p/users/avatars/000/809/063/large/ffeb4741d6275c9a5f8e78eee0703a0f.jpg?1642309641'
              }
              alt='profile-image'
              height={100}
              width={100}
              className='object-cover rounded-full lg:h-[100px] lg:w-[100px] w-10 h-10 border-2 border-white 
              box-content'
            />
          </div>
          <div
            id='profile-description'
            className='lg:flex hidden flex-col justify-start items-center w-full '
          >
            <div className='flex justify-start items-center gap-2 pt-2'>
              <h1 className='text-lg font-semibold'>Narendra Kumar</h1>
              {/* <Badge className='bg-primary rounded-full'>PRO</Badge> */}
            </div>
            <div className='flex justify-between items-end text-center'>
              <div>
                <p className='text-sm opacity-70'>Artist</p>
                <p className='text-sm opacity-70'>Rome,Italy</p>
              </div>
            </div>
          </div>
        </section>
        {feedNavItems.map((item, item_idx) => (
          <React.Fragment key={item_idx}>
            {item.type === 'separator' ? (
              <div className='py-2' />
            ) : item.type === 'header' ? (
              <div
                className='hidden lg:flex justify-start items-center rounded p-2 
              text-xl font-bold shrink-0 w-full max-w-[200px]'
              >
                <h1>{item.label}</h1>
              </div>
            ) : (
              <Link href={item.href} className='w-full max-w-[200px]'>
                <div
                  className='flex justify-center lg:gap-2 lg:justify-start items-center rounded 
                  hover:bg-lightAccent p-2 font-semibold shrink-0'
                >
                  <MaterialSymbolIcon className=''>
                    {item.icon_name || ''}
                  </MaterialSymbolIcon>
                  <p className='lg:block hidden'>{item.label}</p>
                </div>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
      <div
        className='w-full h-[calc(100%-40px)] md:h-full md:w-[calc(100%-75px)] 6xl:w-[55%] 5xl:w-3/5 4xl:w-2/3 
         xl:w-3/4 lg:w-4/5 overflow-y-auto flex justify-center lg:justify-start items-start lg:gap-[2%] scroller'
      >
        {/* <div className='w-full sm:max-w-[630px] my-4'> */}
        <div
          className='w-full sm:max-w-[630px] lg:w-[60%] space-y-4 flex flex-col items-center 
        px-2 py-4 border-r '
          ref={feedRef}
        >
          <Carousel className='w-full'>
            <CarouselContent className='mt-4'>
              {Array.from({ length: 19 }, (_, i) => i).map(i => (
                <CarouselItem key={i} className='basis-auto'>
                  <ProfileAvatarStatus
                    className='select-none cursor-pointer '
                    avatar='bg-gradient-to-tr from-primary to-white p-[2px] h-14 w-14'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className='-translate-x-10 bg-transparent' />
            <CarouselPrevious className='translate-x-10 bg-transparent' />
          </Carousel>
          <PostCreate />
          <div className='flex justify-between items-center w-full'>
            <h1 className='text-lg'>Job Recommendation</h1>
            <Link href={'/jobs'} className='text-primary text-sm'>
              See All
            </Link>
          </div>
          <JobCardContainer className='w-full border-none'>
            {Array.from({ length: 9 }, (_, i) => i).map(i => (
              <JobCard
                key={i}
                className='select-none bg-transparent border shrink-0'
              />
            ))}
          </JobCardContainer>
          <JobCardContainer className='w-full border-none'>
            {Array.from({ length: 9 }, (_, i) => i).map(i => (
              <UserInfoProfile key={i} className='shrink-0' />
            ))}
          </JobCardContainer>
          <Tags />

          {projects.data.map(project => (
            <FeedCard project={project} key={project.id} />
          ))}
        </div>

        <div
          className='w-0 lg:w-[40%] max-w-[370px]
         my-5 feed-right-bar space-y-2 overflow-hidden'
          style={{ height: feedRef.current?.scrollHeight }}
          ref={rightSidebarRef}
        >
          <div className='w-full rounded bg-card flex justify-start items-start gap-2 p-4'>
            <div>
              <ProgressBar value={20} />
            </div>
            <div className='space-y-1'>
              <div className='text-xl font-bold flex justify-between items-start'>
                <h1 className='text-lg'>20% Profile Completed!</h1>
                <div className='flex items-center justify-center text-white opacity-70'>
                  <MaterialSymbolIcon className='text-sm mr-1'>
                    edit
                  </MaterialSymbolIcon>
                  <span className='text-sm font-light'>Edit</span>
                </div>
              </div>
              <p className='font-medium text-sm'>
                A complete profile increases the chances of a recruiter being
                more interested in recruiting you
              </p>
            </div>
          </div>
          <div className='w-full space-y-3 sticky top-0'>
            {Array.from({ length: 2 }, (_, i) => i).map(i => (
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
          </div>
          <div className='h-[calc(100%-100vh)] ' />
        </div>
      </div>
    </main>
  )
}
