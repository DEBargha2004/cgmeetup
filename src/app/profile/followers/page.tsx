import { SuggestionCard } from '@/components/custom/feed'

export default function FollowersPage () {
  return (
    <div className='grid grid-cols-4 gap-4 p-5'>
      {Array.from({ length: 20 }, (_, i) => i).map(item => (
        <SuggestionCard key={item} />
      ))}
    </div>
  )
}
