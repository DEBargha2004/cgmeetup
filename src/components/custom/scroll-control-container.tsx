'use client'

import { useEffect, useRef, useState } from 'react'
import MaterialSymbolIcon from './material-symbol-icon'
import { cn } from '@/lib/utils'

export default function ScrollControlContainer ({
  children
}: {
  children: React.ReactNode
}) {
  const [showScrollControl, setShowScrollControl] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollToTop = () => {
    if (!containerRef.current) return
    containerRef.current.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }
  const handleScroll = () => {
    if (!containerRef.current) return
    if (containerRef.current.scrollTop > 100) {
      setShowScrollControl(true)
    } else {
      setShowScrollControl(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className='h-full w-full overflow-y-auto scroller'
      onScroll={handleScroll}
    >
      {children}
      <div
        className={cn(
          `fixed bottom-4 right-4 h-14 w-14 rounded-full grid place-content-center 
      bg-darkAccent/50 hover:bg-darkAccent/80 cursor-pointer`,
          showScrollControl ? 'grid' : 'hidden'
        )}
        onClick={scrollToTop}
      >
        <MaterialSymbolIcon>arrow_upward</MaterialSymbolIcon>
      </div>
    </div>
  )
}
