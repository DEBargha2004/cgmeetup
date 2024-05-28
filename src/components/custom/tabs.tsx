'use client'

import { cn } from '@/lib/utils'
import { TabItem } from '@/types/tab'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MaterialSymbolIcon from './material-symbol-icon'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip'

export default function Tabs ({
  tabs,
  className
}: {
  tabs: TabItem[]
  className?: string
}) {
  const pathname = usePathname()
  return (
    <>
      {tabs.map((tab, index) => (
        <TooltipProvider delayDuration={20} key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={tab.href}>
                <div
                  className={cn(
                    'md:px-4 px-2 py-2 hover:bg-lightAccent cursor-pointer whitespace-nowrap md:text-base sm:text-sm text-xs flex justify-between items-center gap-2',
                    pathname === tab.href
                      ? 'border-b-2 border-primary md:text-lg sm:text-base text-sm'
                      : '',
                    className
                  )}
                >
                  <span>
                    <MaterialSymbolIcon>{tab.icon}</MaterialSymbolIcon>
                  </span>
                  <span className='lg:block hidden'>{tab.label}</span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent className='lg:hidden block bg-lightAccent'>
              {tab.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  )
}
