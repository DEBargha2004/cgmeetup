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
    <main className='space-y-4 py-2'>
      <News />
      <div className='space-y-4 py-3'>
        <div className='flex justify-center items-center'>
          <Tabs tabs={tabs} />
        </div>
        {children}
      </div>
      <Artists />
      <Jobs />
      <NewsLetter />
      <Footer />
    </main>
  )
}
