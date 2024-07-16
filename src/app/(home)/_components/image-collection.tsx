import { GalleryImage } from '@/components/custom/gallery'
import Link from 'next/link'
import projects from '@/../public/data/projects.json'
import { cn } from '@/lib/utils'

export default function ImageCollection ({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'grid xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-1',
        className
      )}
    >
      {projects.data.slice(0, 17).map((project, index) => (
        <Link
          href={`/gallery/${project.id}`}
          key={index}
          scroll={false}
          className={cn('', index === 4 && 'col-span-2 row-span-2')}
        >
          <GalleryImage
            project={project}
            key={project.id}
            className=''
            showArtInfo={false}
            showUserInfo={false}
          />
        </Link>
      ))}
      {projects.data.slice(0, 17).map((project, index) => (
        <Link
          href={`/gallery/${project.id}`}
          key={index}
          scroll={false}
          className={cn('', index === 1 && 'col-span-2 row-span-2')}
        >
          <GalleryImage
            project={project}
            key={project.id}
            className=''
            showArtInfo={false}
            showUserInfo={false}
          />
        </Link>
      ))}
      {projects.data.slice(0, 17).map((project, index) => (
        <Link
          href={`/gallery/${project.id}`}
          key={index}
          scroll={false}
          className={cn('', index === 5 && 'col-span-2 row-span-2')}
        >
          <GalleryImage
            project={project}
            key={project.id}
            className=''
            showArtInfo={false}
            showUserInfo={false}
          />
        </Link>
      ))}
    </div>
  )
}
