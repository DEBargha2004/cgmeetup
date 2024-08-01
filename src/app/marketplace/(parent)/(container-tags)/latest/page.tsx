import ListContainer from '../../../_components/list-container'

export default function MarketplaceTrendingPage () {
  return (
    <div className='p-2 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3'>
      {Array.from({ length: 36 }).map((_, i) => (
        <ListContainer.Card
          className=''
          price={Math.random() > 0.5 ? '$10' : ''}
          key={i}
        />
      ))}
    </div>
  )
}