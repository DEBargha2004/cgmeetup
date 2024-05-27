'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function LimitText ({
  children,
  className,
  limitCount = 80,
  defaultLimited = true,
  toggllerLabel = {
    showMore: 'Show More',
    showLess: 'Show Less',
    className: ''
  }
}: {
  children: string
  className?: string
  limitCount?: number
  defaultLimited?: boolean
  toggllerLabel?: {
    showMore: string
    showLess: string
    className?: string
  }
}) {
  const [limit, setLimit] = useState({
    isLimited: defaultLimited,
    limitCount: limitCount
  })

  return (
    <article className={cn('', className)}>
      {children.slice(0, limit.isLimited ? limit.limitCount : children.length)}{' '}
      <span
        className='text-primary underline whitespace-nowrap'
        onClick={() =>
          setLimit(prev => ({ ...prev, isLimited: !prev.isLimited }))
        }
      >
        <span className={cn('', toggllerLabel.className)}>
          {' '}
          {limit.isLimited ? toggllerLabel.showMore : toggllerLabel.showLess}
        </span>
      </span>
    </article>
  )
}
