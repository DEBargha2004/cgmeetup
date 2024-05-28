import { SuggestionCard } from '@/components/custom/feed'

export default function StudiosPage () {
  return (
    <div className='grid grid-cols-4 gap-1 w-[90%] mx-auto'>
      {Array.from({ length: 29 }).map((_, i) => (
        <SuggestionCard key={i} />
      ))}
    </div>
  )
}
