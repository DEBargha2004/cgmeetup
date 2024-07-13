import projects from '@/../public/data/projects.json'
import { FeedCard } from '@/components/custom/feed'

export default function PostsPage () {
  return (
    <div className='flex flex-col justify-start items-center gap-4'>
      {projects.data.slice(0, 10).map((project, index) => (
        <FeedCard
          project={project}
          key={project.id}
          className='sm:w-1/3 min-w-[330px] max-w-[550px]'
        />
      ))}
    </div>
  )
}
