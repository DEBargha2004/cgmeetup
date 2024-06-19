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
                    `h-10 bg-lightAccent/60 hover:bg-lightAccent transition-all 
              md:px-10 px-5 py-4 flex justify-center items-center text-sm border-r border-r-darkAccent 
              last:border-r-none gap-2`,
                    pathname === tab.href
                      ? 'border-b-2 border-b-primary bg-lightAccent'
                      : '',
                    className
                  )}
                >
                  <span className='flex items-center'>
                    <MaterialSymbolIcon className={cn('opacity-100')}>
                      {tab.icon}
                    </MaterialSymbolIcon>
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
