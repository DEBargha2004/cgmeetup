import { JobCard } from '@/components/custom'
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
      <div className='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCard key={i} />
        ))}
      </div>
    </div>
  )
}
