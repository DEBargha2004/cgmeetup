import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ImageCollection } from '@/components/custom/gallery'

export default function GalleryPage () {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col gap-4 py-4 md:gap-8 md:py-12'>
        <div className='my-4 flex flex-col justify-between items-center gap-12 text-center'>
          <div className='space-y-4'>
            <h1 className='text-4xl md:text-[52px] font-bold'>
              Showcase & Discover Creative Work
            </h1>
            <p className='text-lg md:text-xl'>
              for Concept Art , Visual Effects , Short Films and more.
            </p>
          </div>
          <div className='w-3/4 md:w-3/5 lg:w-2/5 relative'>
            <Input className='pl-10' placeholder='Search' />
            <Search className='absolute left-2 top-1/2 -translate-y-1/2' />
          </div>
          <div>
            <Button className='uppercase'>Post Artwork</Button>
          </div>
        </div>
        <ImageCollection imageScale={false} />
        {/* <div
          className={cn(`aspect-square rounded-full bg-white fixed bottom-10 left-10 
        shadow-lg cursor-pointer h-14 transition-all duration-300 `)}
          //@ts-ignore
          ref={gridTabref}
        >
          <div
            className={cn(
              `w-full h-full flex justify-center items-center
        text-primary transition-all px-4`,
              showGridTab ? 'gap-2' : 'gap-0'
            )}
          >
            <Minus
              className={cn(
                'grayscale hover:grayscale-0 transition-all',
                showGridTab ? 'w-7 h-7' : 'w-0 h-0'
              )}
              onClick={() => setImageScale(false)}
            />
            <Grid
              className='h-7 w-7'
              onClick={() => setShowGridTab(prev => !prev)}
            />
            <Plus
              className={cn(
                'grayscale hover:grayscale-0 transition-all',
                showGridTab ? 'w-7 h-7' : 'w-0 h-0'
              )}
              onClick={() => setImageScale(true)}
            />
          </div>
        </div> */}
      </main>
    </div>
  )
}
