import { JobCard } from '@/components/custom'

export default function JobsPage () {
  return (
    <section className='md:w-4/5 grid grid-cols-1 xl:grid-cols-2 gap-2 mx-auto px-2'>
      {Array.from({ length: 4 }).map((_, i) => (
        <JobCard key={i} />
      ))}
    </section>
  )
}
