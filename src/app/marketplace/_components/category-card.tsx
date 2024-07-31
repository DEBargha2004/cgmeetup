import { getFormattedUrlFromTitle } from '@/functions/get-formatted-url-from-title'
import { cn } from '@/lib/utils'
import { MarketplaceCategory } from '@/types/marketplace'
import Link from 'next/link'
import React, { HTMLProps } from 'react'

export default function CategoryCard ({
  category,
  className,
  ...props
}: { category: MarketplaceCategory } & HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn('w-full border rounded', className)} {...props}>
      <Link
        href={`/marketplace/${getFormattedUrlFromTitle(category.title)}`}
        className='block w-full aspect-video relative border-b bg-lightAccent/60
        hover:bg-lightAccent transition-all'
      >
        <div className='w-full h-full absolute flex flex-col justify-center items-center gap-4 '>
          <div className='w-4/5 text-center space-y-3'>
            <h1 className='text-lg hover:text-primary'>{category.title}</h1>
            <p className='text-sm opacity-70 font-light'>
              {category.description}
            </p>
          </div>
        </div>
      </Link>
      <div className='w-full p-2 flex justify-center flex-wrap gap-2 bg-darkAccent'>
        {category.subcategories.map((subcategory, subcategory_idx) => (
          <React.Fragment key={subcategory}>
            <Link
              href={`/marketplace/${getFormattedUrlFromTitle(
                category.title
              )}/${getFormattedUrlFromTitle(subcategory)}`}
              className='text-sm text-gray-400 hover:text-primary'
            >
              {subcategory}
            </Link>
            <span
              className='text-sm text-gray-400'
              hidden={category.subcategories.length - 1 === subcategory_idx}
            >
              |
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
