'use client'

import { JobCardContainer, UserInfoProfile } from '@/components/custom/feed'
import { JobCard } from '@/components/custom'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import Tags from './_components/tags'
import PostCreate from './_components/post-create'
import Posts from './_components/posts'
import ProfileCarousel from './_components/profile-carousel'
import FeedNav from './_components/feed-nav'
import Profile from './_components/profile'
import ProfileComplete from './_components/profile-complete'
import Advertisements from './_components/advertisements'
import JobPosts from './_components/job-posts'

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
    <>
      <main className='h-full flex flex-row  justify-start items-start bg-darkAccent'>
        <div
          className='bottom-0 left-0  6xl:w-[45%] 5xl:w-2/5
        4xl:w-1/3 xl:w-1/4 lg:w-1/5 z-20 h-full border-r  lg:px-2 lg:flex hidden flex-col 
         justify-start items-end overflow-y-auto scroller overflow-x-auto  pt-8'
        >
          <Profile />
          <FeedNav />
        </div>
        <div
          className=' h-full w-full 6xl:w-[55%] 5xl:w-3/5 4xl:w-2/3 
         xl:w-3/4 lg:w-4/5 overflow-y-auto flex justify-center lg:justify-start items-start lg:gap-[2%] scroller'
        >
          <div
            className='w-full sm:max-w-[630px] lg:w-[60%] space-y-4 flex flex-col items-center 
        px-2 py-4 border-r '
            ref={feedRef}
          >
            <ProfileCarousel />
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
            <Posts />
            <JobPosts />
          </div>

          <div
            className='w-0 lg:w-[40%] max-w-[370px]
         my-5 feed-right-bar space-y-2 lg:block hidden'
            ref={rightSidebarRef}
          >
            <ProfileComplete />
            <Advertisements />
            <div className='h-[calc(100%-100vh)] ' />
          </div>
        </div>
      </main>
    </>
  )
}
