import { cn } from '@/lib/utils'
import React, { HTMLProps, ReactNode } from 'react'

export default function LatestSectionContainer ({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn('bg-card space-y-3 p-4 rounded', className)} {...props}>
      {children}
    </div>
  )
}

LatestSectionContainer.Title = function LatestSectionContainerTitle ({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLProps<HTMLHeadingElement>) {
  return (
    <h1 className={cn('text-xl', className)} {...props}>
      {children}
    </h1>
  )
}

LatestSectionContainer.ItemsContainer =
  function LatestSectionContainerItemsContainer ({
    children,
    className,
    ...props
  }: { children: ReactNode } & HTMLProps<HTMLDivElement>) {
    return (
      <div className={cn('space-y-2', className)} {...props}>
        {children}
      </div>
    )
  }

LatestSectionContainer.Item = function LatestSectionContainerItem ({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}
