import { cn } from '@/lib/utils'
import projects from '../../../../public/data/projects.json'
import GalleryImage from './image'
import Link from 'next/link'

export default function ImageCollection ({
  imageScale = false,
  className
}: {
  imageScale?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        `grid gap-1 px-1 transition-all data-[scale='true']:grid-cols-1 
      data-[scale='false']:grid-cols-2 sm:data-[scale='false']:grid-cols-4 
      sm:data-[scale='true']:grid-cols-2 md:data-[scale='true']:grid-cols-4 
      data-[scale='false']:md:grid-cols-6  lg:data-[scale='true']:grid-cols-5
      lg:data-[scale=false]:grid-cols-7`,
        className
      )}
      data-scale={imageScale}
    >
      {projects.data.map((project, index) => (
        <Link href={`/gallery/${project.id}`} key={index} scroll={false}>
          <GalleryImage project={project} key={project.id} />
        </Link>
      ))}
    </div>
  )
}
