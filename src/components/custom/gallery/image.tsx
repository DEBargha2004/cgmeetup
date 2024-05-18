import { cn } from '@/lib/utils'
import Image from 'next/image'

type ArtWork = {
  id: number
  hash_id: string
  url: string
  smaller_square_cover_url: string
  hide_as_adult: boolean
  title: string
  icons: {
    video: boolean
    image: boolean
    model3d: boolean
    marmoset: boolean
    pano: boolean
    multiple_images: boolean
    video_clip: boolean
  }
  user: {
    id: number
    username: string
    medium_avatar_url: string
    is_staff: boolean
    pro_member: boolean
    is_plus_member: boolean
    is_studio_account: boolean
    is_school_account: boolean
    full_name: string
  }
}

export default function GalleryImage ({
  project,
  className
}: {
  project: ArtWork
  className?: string
}) {
  return (
    <div
      key={project.id}
      className={cn(
        'rounded-lg overflow-hidden relative group cursor-pointer',
        className
      )}
    >
      <Image
        src={project.smaller_square_cover_url}
        alt={project.title}
        height={200}
        width={200}
        className='w-full h-full object-cover'
      />
      <div
        className='absolute bottom-0 left-0 w-full h-1/2 translate-y-full 
        bg-gradient-to-t from-black/70 to-black/0 transition-all duration-300 
      group-hover:-translate-y-0 delay-300'
      />
      <div
        className='absolute bottom-0 translate-y-full left-0 w-full py-4 px-2
      group-hover:translate-y-0 transition-all duration-200 delay-300 flex justify-start 
      items-stretch gap-2'
      >
        <div className='my-auto'>
          <Image
            src={project.user.medium_avatar_url}
            alt={project.user.username}
            height={50}
            width={50}
            className='w-10 h-10 rounded-full object-cover '
          />
        </div>
        <div className='flex flex-col justify-start items-start'>
          <h1 className='font-bold line-clamp-1'>{project.title}</h1>
          <div className='flex justify-start items-center gap-2'>
            <p className='w-1/2 truncate'>{project.user.username}</p>
            {project.user.is_plus_member ? (
              <p className='bg-primary px-2 py-[2px] rounded-full text-xs'>
                Pro
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
