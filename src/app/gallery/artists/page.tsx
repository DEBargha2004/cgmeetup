import { SuggestionCard } from '@/components/custom/feed'

export default function ArtistsPage () {
  return (
    <div className='grid grid-cols-4 gap-5 w-[90%] mx-auto'>
      {Array.from({ length: 29 }).map((_, i) => (
        <SuggestionCard key={i} title='Ramon' description='VFX Company' />
      ))}
    </div>
  )
}
