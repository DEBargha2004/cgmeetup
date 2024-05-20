import Image from 'next/image'
import projects from '../../../public/data/projects.json'
import FeedCard from '@/components/feed-card'

export default function FeedPage () {
  return (
    <main className='flex justify-center items-start gap-10 py-12 sm:px-4 w-full'>
      <div className='w-[30%] h-[400px] bg-red-500 sticky top-12'></div>
      <div className='w-full shrink-0 sm:w-fit space-y-4 flex flex-col items-center px-2'>
        {projects.data.map(project => (
          <FeedCard key={project.id} project={project} />
        ))}
      </div>
      <div className='w-[30%] h-[400px] bg-red-500 sticky top-12'></div>
    </main>
  )
}
