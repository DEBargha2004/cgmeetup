import { SuggestionCard } from '@/components/custom/feed'

export default function FollowingPage () {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-5'>
      {Array.from({ length: 20 }, (_, i) => i).map(item => (
        <SuggestionCard key={item} />
      ))}
    </div>
  )
}
