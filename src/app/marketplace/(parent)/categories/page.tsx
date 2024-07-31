import { marketplaceCategories } from '@/constants/marketplace-categories'
import CategoryCard from '../../_components/category-card'

export default function CategoriesPage () {
  return (
    <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 pb-10'>
      {marketplaceCategories.map((category, cat_idx) => (
        <CategoryCard key={cat_idx} category={category} />
      ))}
    </div>
  )
}
