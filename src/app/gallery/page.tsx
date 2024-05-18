import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import projects from '../../../public/data/projects.json'
import Image from 'next/image'

export default function GalleryPage () {
  return (
    <section className='py-10'>
      <div className='my-12 flex flex-col justify-between items-center gap-12 text-center'>
        <div className='space-y-4'>
          <h1 className='text-5xl font-bold'>
            Showcase & Discover Creative Work
          </h1>
          <p className='text-xl'>
            for Concept Art , Visual Effects , Short Films and more.
          </p>
        </div>
        <div className='w-2/5 relative'>
          <Input className='pl-10' placeholder='Search' />
          <Search className='absolute left-2 top-1/2 -translate-y-1/2' />
        </div>
        <div>
          <Button className='uppercase'>Post Artwork</Button>
        </div>
      </div>
      <div className='grid grid-cols-6 gap-2'>
        {projects.data.map((project, index) => (
          <div key={project.id} className='rounded-lg overflow-hidden'>
            <Image
              src={project.smaller_square_cover_url}
              alt={project.title}
              height={200}
              width={200}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
      </div>
    </section>
  )
}
