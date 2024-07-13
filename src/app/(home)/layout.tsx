import { ScrollControlContainer, Tabs } from '@/components/custom'
import Artists from './_components/artists'
import Footer from './_components/footer'
import Jobs from './_components/jobs'
import News from './_components/news'
import NewsLetter from './_components/news-letter'
import { TabItem } from '@/types/tab'
import Studios from './_components/studios'
import LatestLikes from './_components/latest-likes'
import LatestComments from './_components/latest-comments'

const tabs: TabItem[] = [
  {
    label: 'Community',
    href: '/',
    icon: 'language'
  },
  {
    label: 'Trending',
    href: '/trending',
    icon: 'trending_up'
  },
  {
    label: 'Featured',
    icon: 'trophy',
    href: '/featured'
  },
  {
    label: 'Latest',
    href: '/latest',
    icon: 'schedule'
  }
]

export default function Layout ({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <ScrollControlContainer>
      <main className='space-y-4 py-2'>
        <News />
        <div className='space-y-4 py-3'>
          <div className='flex justify-center items-center'>
            <Tabs tabs={tabs} />
          </div>
          {children}
        </div>
        <Jobs />
        <div className='grid md:grid-cols-2 gap-6 px-4'>
          <LatestLikes />
          <LatestComments />
        </div>
        <Artists />
        <Studios />
        <NewsLetter />
        <Footer />
      </main>
    </ScrollControlContainer>
  )
}
