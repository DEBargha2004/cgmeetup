'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function LimitText ({
  children,
  className,
  limitCount = 80,
  defaultLimited = true,
  toggllerLabel = { showMore: 'Show More', showLess: 'Show Less' }
}: {
  children: string
  className?: string
  limitCount?: number
  defaultLimited?: boolean
  toggllerLabel?: {
    showMore: string
    showLess: string
  }
}) {
  const [limit, setLimit] = useState({
    isLimited: defaultLimited,
    limitCount: limitCount
  })

  return (
    <article className={cn('', className)}>
      {children.slice(0, limit.isLimited ? limit.limitCount : children.length)}
      &nbsp;
      <span
        className='text-primary underline'
        onClick={() =>
          setLimit(prev => ({ ...prev, isLimited: !prev.isLimited }))
        }
      >
        {limit.isLimited ? toggllerLabel.showMore : toggllerLabel.showLess}
      </span>
    </article>
  )
}
