import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { JobCard, FeaturedJobCard } from '@/components/custom'
import { sample_cateories } from '@/constants/categories'
import { Filter } from '../_components/filter'

export default function Dashboard () {
  return (
    <div className='lg:w-[77%] mx-auto grid gap-4 md:gap-8 lg:grid-cols-3'>
      <Card
        className='xl:col-span-2 col-span-3 flex flex-col gap-4 h-fit 
border-none bg-transparent'
      >
        <CardContent className='space-y-4 px-1'>
          {Array.from({ length: 3 }, (_, i) => i).map(i => (
            <JobCard key={i} />
          ))}
        </CardContent>
      </Card>
      <Card className='bg-transparent border-none col-span-3 xl:col-span-1 space-y-3 xl:max-w-[400px] px-2'>
        <Card className='bg-card border xl:block hidden'>
          <CardHeader className='pb-0'>
            <CardTitle className='text-xl'>Filters</CardTitle>
          </CardHeader>
          <CardContent className='pt-4'>
            <Filter />
          </CardContent>
        </Card>
        <Card className='bg-transparent border-none'>
          <CardHeader className='xl:pt-0 px-1 pb-3'>
            <CardTitle className='text-lg font-bold'>Featured Jobs</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4 px-1'>
            {Array.from({ length: 3 }, (_, i) => i).map(i => (
              <Link href={'/jobs/123'} className='inline-block w-full' key={i}>
                <FeaturedJobCard />
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card className='bg-transparent border-none'>
          <CardHeader className='px-1 pt-0'>
            <CardTitle className='text-xl'>Categories</CardTitle>
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
  )
}
