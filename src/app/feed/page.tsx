import { JobCardContainer, UserInfoProfile } from '@/components/custom/feed'
import { JobCard, ScrollControlContainer } from '@/components/custom'
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
import LatestComments from './_components/latest-comments'
import LatestLikes from './_components/latest-likes'

export default function FeedPage () {
  return (
    <ScrollControlContainer>
      <main className='h-fit flex justify-center items-start bg-darkAccent'>
        <div
          className='w-[200px] h-[calc(100vh-64px)] overflow-y-auto scroller
        hidden lg:flex flex-col justify-start items-end gap-2 pt-8 sticky top-0 px-2'
        >
          <Profile />
          <FeedNav />
        </div>
        <div className='lg:w-1/3 md:w-3/5 w-full lg:min-w-[500px] flex flex-col justify-start items-center gap-4 border-x px-2'>
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
        </div>
        <div className='w-1/5 min-w-[350px] hidden lg:flex flex-col justify-start items-center gap-2 px-4 self-stretch'>
          <ProfileComplete />
          <Advertisements />
          <LatestComments />
          <LatestLikes className='sticky top-0' />
        </div>
      </main>
    </ScrollControlContainer>
  )
}
