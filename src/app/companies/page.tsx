import { MaterialSymbolIcon, ShowcaseCard } from '@/components/custom'
import { Input } from '@/components/ui/input'

export default function ArtistsPage () {
  return (
    <>
      <div className='grid lg:grid-cols-2 gap-5 px-4'>
        {Array.from({ length: 33 }, (_, i) => i).map(item => (
          <ShowcaseCard key={item} className='bg-card' />
        ))}
      </div>
    </>
  )
}