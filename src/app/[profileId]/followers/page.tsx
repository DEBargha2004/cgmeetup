import { ShowcaseCard } from '@/components/custom'
import { SuggestionCard } from '@/components/custom/feed'

export default function FollowersPage () {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-5'>
      {Array.from({ length: 20 }, (_, i) => i).map(item => (
        <ShowcaseCard key={item} />
      ))}
    </div>
  )
}
