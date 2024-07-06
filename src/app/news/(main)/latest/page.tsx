import { FeaturedNewsCard, NewsCard } from '@/components/custom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewsLatestPage () {
  return (
    <div className='lg:w-[77%] mx-auto grid gap-4 md:gap-8 lg:grid-cols-3'>
      <Card
        className='xl:col-span-2 col-span-3 flex flex-col gap-4 h-fit 
      border-none bg-transparent'
      >
        <CardContent className='space-y-4 px-1'>
          {Array.from({ length: 15 }, (_, i) => i).map(i => (
            <NewsCard key={i} />
          ))}
        </CardContent>
      </Card>
      <Card className='bg-transparent border-none col-span-3 xl:col-span-1'>
        <Card className='bg-transparent border-none'>
          <CardHeader className='xl:pt-0 px-1 pb-3'>
            <CardTitle className='text-lg font-bold'>Featured News</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4 px-1'>
            {Array.from({ length: 5 }, (_, i) => i).map(i => (
              <FeaturedNewsCard key={i} />
            ))}
          </CardContent>
        </Card>
      </Card>
    </div>
  )
}
