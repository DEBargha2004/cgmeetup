import { Tabs } from '@/components/custom'
import Artists from './_components/artists'
import Footer from './_components/footer'
import Jobs from './_components/jobs'
import News from './_components/news'
import NewsLetter from './_components/news-letter'
import { TabItem } from '@/types/tab'

const tabs: TabItem[] = [
  {
    label: 'Community',
    href: '/home',
    icon: 'language'
  },
  {
    label: 'Trending',
    href: '/home/trending',
    icon: 'trending_up'
  },
  {
    label: 'Featured',
    icon: 'featured_play_list',
    href: '/home/featured'
  },
  {
    label: 'Latest',
    href: '/home/latest',
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
    <main className='space-y-4 py-2'>
      <News />
      <div className='space-y-4 py-3'>
        <div className='flex justify-center items-center'>
          <Tabs tabs={tabs} />
        </div>
        {children}
        {modal}
      </div>
      <Artists />
      <Jobs />
      <NewsLetter />
      <Footer />
    </main>
  )
}