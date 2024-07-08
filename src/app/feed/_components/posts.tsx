import projects from '@/../public/data/projects.json'
import { FeedCard } from '@/components/custom/feed'

export default function Posts () {
  return (
    <>
      {projects.data.map(project => (
        <FeedCard project={project} key={project.id} />
      ))}
    </>
  )
}
