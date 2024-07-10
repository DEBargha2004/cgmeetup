import { FeaturedJobCard, JobCard } from '@/components/custom'
import Link from 'next/link'

export default function Jobs ({ className }: { className?: string }) {
  return (
    <div className='space-y-2 px-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl'>Jobs</h1>
        <Link href='#'>
          <p className='text-sm text-primary'>View More</p>
        </Link>
      </div>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3'>
        {Array.from({ length: 8 }).map((_, i) => (
          <FeaturedJobCard key={i} />
        ))}
      </div>
    </div>
  )
}
