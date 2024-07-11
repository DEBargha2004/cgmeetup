import { JobCard } from '@/components/custom'

export default function JobPosts () {
  return (
    <>
      {Array.from({ length: 1 }).map((_, i) => (
        <JobCard key={i} className='sm:w-[90%] shrink-0 w-full' />
      ))}
    </>
  )
}
