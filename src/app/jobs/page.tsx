import Link from 'next/link'
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Input } from '@/components/ui/input'

import { JobCard, FeaturedJobCard } from '@/components/custom'

const sample_cateories = [
  '2D Programmer',

  '2D Sequence Lead',

  '2D Supervisor',

  'Compositor',

  'Lead Compositor',

  'Matte Painter',

  'Motion Graphic Artist',

  'Paint Artist',

  'Roto Artist',

  'Texturing'
]

export default function Dashboard () {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='my-4 flex flex-col justify-between items-center gap-12 text-center'>
          <div className='space-y-4'>
            <h1 className='text-4xl md:text-[52px] font-bold leading-tight'>
              Jobs
            </h1>
            <p className='text-lg md:text-xl'>
              Find your VFX Jobs , Animations Jobs, Video Game Jobs, TV & Flim
              Jobs, Software Jobs and more
            </p>
          </div>
          <div className='w-3/4 md:w-3/5 lg:w-2/5 relative'>
            <Input className='pl-10' placeholder='Search Jobs..' />
            <Search className='absolute left-2 top-1/2 -translate-y-1/2' />
          </div>
          <div>
            <Button className='uppercase'>Post Job</Button>
          </div>
        </div>
        <div className='lg:w-[77%] mx-auto grid gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
          <Card
            className='xl:col-span-2 col-span-3 flex flex-col gap-4 h-fit 
          border-none bg-transparent'
          >
            <CardContent className='space-y-4 px-0'>
              <JobCard />
              <JobCard />
              <JobCard />
            </CardContent>
          </Card>
          <Card className='bg-transparent border-none col-span-3 xl:col-span-1'>
            <Card className='bg-transparent border-none'>
              <CardHeader className='xl:pt-0 px-0'>
                <CardTitle>Featured Jobs</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-4 px-0'>
                <FeaturedJobCard />
                <FeaturedJobCard />
                <FeaturedJobCard />
                <FeaturedJobCard />
              </CardContent>
            </Card>
            <Card className='bg-transparent border-none'>
              <CardHeader className=''>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-4'>
                {sample_cateories.map(cat => (
                  <Button
                    variant={'outline'}
                    className='w-full rounded bg-transparent hover:bg-lightAccent'
                    key={cat}
                  >
                    {cat}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </Card>
        </div>
      </main>
    </div>
  )
}
