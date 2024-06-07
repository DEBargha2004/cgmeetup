import { MaterialSymbolIcon } from '@/components/custom'
import { SuggestionCard } from '@/components/custom/feed'
import { Input } from '@/components/ui/input'

export default function CompanyPage () {
  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <main className='flex flex-1 flex-col py-4 md:gap-0 md:py-12'>
          <div className='my-6 flex flex-col justify-between items-center gap-12 text-center'>
            <div className='space-y-4'>
              <h1 className='text-4xl md:text-[52px] font-bold'>
                Showcase & Discover Creative Work
              </h1>
              <p className='text-lg md:text-xl'>
                for Concept Art , Visual Effects , Short Films and more.
              </p>
            </div>
            <div className='w-3/4 md:w-3/5 lg:w-2/5 relative flex justify-between items-center gap-2'>
              <Input className='pl-10' placeholder='Search' />
              <MaterialSymbolIcon className='absolute left-2 top-1/2 -translate-y-1/2'>
                search
              </MaterialSymbolIcon>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-5 w-[90%] mx-auto'>
            {Array.from({ length: 29 }).map((_, i) => (
              <SuggestionCard key={i} />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
