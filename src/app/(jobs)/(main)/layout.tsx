'use client'

import { MaterialSymbolIcon, Tabs } from '@/components/custom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button, ButtonProps } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  expertise_level,
  industry,
  job_type,
  location,
  medium,
  tags
} from '@/constants/job-filters'
import { cn } from '@/lib/utils'
import { TabItem } from '@/types/tab'
import { Search } from 'lucide-react'
import { Roboto } from 'next/font/google'
import { HTMLProps, useState } from 'react'

const tabList: TabItem[] = [
  { label: 'Jobs', href: '/jobs', icon: 'work' },
  {
    label: 'Trending',
    href: '',
    icon: 'trending_up'
  },
  {
    label: 'Latest',
    href: '',
    icon: 'schedule'
  },
  { label: 'Studios', href: '/studios', icon: 'apartment' },
  { label: 'Bookmark Jobs', href: '/bookmark-jobs', icon: 'bookmark' },
  { label: 'Job Preferences', href: '/job-preference', icon: 'manage_accounts' }
]

const roboto = Roboto({ subsets: ['cyrillic'], weight: '700' })

export default function Layout ({ children }: { children: React.ReactNode }) {
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([])
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col py-4 md:gap-0 md:py-12'>
        <div className='my-6 mb-4 flex flex-col justify-between items-center gap-12 text-center'>
          <div className='space-y-4'>
            <h1
              className={cn(
                'text-4xl md:text-[52px] font-bold',
                roboto.className
              )}
            >
              Jobs
            </h1>
            <p className='text-lg md:text-xl'>
              Find your VFX Jobs , Animations Jobs, Video Game Jobs, TV & Flim
              Jobs, Software Jobs and more
            </p>
          </div>
          <div className='w-3/4 md:w-3/5 lg:w-2/5 relative flex justify-between items-center gap-2'>
            <Input className='pl-10' placeholder='Search' />
            <Search className='absolute left-2 top-1/2 -translate-y-1/2' />

            <Sheet>
              <SheetTrigger asChild>
                <div className='flex items-center gap-1 cursor-pointer'>
                  <MaterialSymbolIcon>sort</MaterialSymbolIcon>
                  <span>Filter</span>
                </div>
              </SheetTrigger>
              <SheetContent
                side={'right'}
                className='bg-lightAccent overflow-y-auto scroller-hide'
              >
                <Accordion type='multiple'>
                  <AccordionItem value='location'>
                    <AccordionTrigger className='px-2'>
                      Location
                    </AccordionTrigger>
                    <AccordionContent className='space-y-4 p-2'>
                      <Input />
                      <div className='space-y-2'>
                        {location.map(item => (
                          <AccordionItemChildWrapper key={item}>
                            <Checkbox />
                            <span>{item}</span>
                          </AccordionItemChildWrapper>
                        ))}
                      </div>
                      <ClearButton />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='job_type'>
                    <AccordionTrigger className='px-2'>
                      Job Type
                    </AccordionTrigger>
                    <AccordionContent className='space-y-4 p-2'>
                      <div className='space-y-2'>
                        {job_type.map(item => (
                          <AccordionItemChildWrapper key={item}>
                            <Checkbox />
                            <span>{item}</span>
                          </AccordionItemChildWrapper>
                        ))}
                      </div>
                      <ClearButton />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='expertise_level'>
                    <AccordionTrigger className='px-2'>
                      Level of Expertise
                    </AccordionTrigger>
                    <AccordionContent className='space-y-4 p-2'>
                      <div className='space-y-2'>
                        {expertise_level.map(item => (
                          <AccordionItemChildWrapper key={item}>
                            <Checkbox />
                            <span>{item}</span>
                          </AccordionItemChildWrapper>
                        ))}
                      </div>
                      <ClearButton />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='industry'>
                    <AccordionTrigger className='px-2'>
                      Industry
                    </AccordionTrigger>
                    <AccordionContent className='space-y-4 p-2'>
                      <Input />
                      <div className='space-y-2'>
                        {industry.map(item => (
                          <AccordionItemChildWrapper key={item}>
                            <Checkbox />
                            <span>{item}</span>
                          </AccordionItemChildWrapper>
                        ))}
                      </div>
                      <ClearButton />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='tags'>
                    <AccordionTrigger className='px-2'>Tags</AccordionTrigger>
                    <AccordionContent className='space-y-4 p-2'>
                      <Input />
                      <div className='space-y-2'>
                        {tags.map(item => (
                          <AccordionItemChildWrapper key={item}>
                            <Checkbox />
                            <span>{item}</span>
                          </AccordionItemChildWrapper>
                        ))}
                      </div>
                      <ClearButton />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='medium'>
                    <AccordionTrigger className='px-2'>Medium</AccordionTrigger>
                    <AccordionContent className='space-y-4 p-2'>
                      <Input />
                      <div className='space-y-2'>
                        {medium.map(item => (
                          <AccordionItemChildWrapper key={item}>
                            <Checkbox />
                            <span>{item}</span>
                          </AccordionItemChildWrapper>
                        ))}
                      </div>
                      <ClearButton />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='software'>
                    <AccordionTrigger className='px-2'>
                      Software
                    </AccordionTrigger>
                    <AccordionContent className='space-y-4 p-2'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className='p-2 flex justify-between items-center w-full border rounded h-10 bg-darkAccent'>
                            <span>Software</span>
                            <MaterialSymbolIcon className=''>
                              keyboard_arrow_down
                            </MaterialSymbolIcon>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className='max-h-[300px] overflow-y-auto scroller h-[200px] 
                        w-[319px] space-y-1'
                        >
                          {tags.map(item => (
                            <DropdownMenuItem
                              key={item}
                              className={cn(
                                'flex justify-start items-center gap-1',
                                selectedSoftwares.includes(item)
                                  ? 'bg-lightAccent'
                                  : ''
                              )}
                              onSelect={e => {
                                e.preventDefault()
                                setSelectedSoftwares(prev => {
                                  if (prev.includes(item)) {
                                    return prev.filter(tag => tag !== item)
                                  }
                                  return [...prev, item]
                                })
                              }}
                            >
                              <span
                                className={cn(
                                  selectedSoftwares.includes(item)
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              >
                                <MaterialSymbolIcon>check</MaterialSymbolIcon>
                              </span>
                              <span>{item}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <div className='flex flex-wrap gap-2'>
                        {selectedSoftwares.map(item => (
                          <Badge
                            key={item}
                            className='bg-lightAccent p-2 flex justify-between items-center gap-1'
                          >
                            <span>{item}</span>
                            <MaterialSymbolIcon
                              className='text-sm cursor-pointer'
                              onClick={() => {
                                setSelectedSoftwares(prev => {
                                  return prev.filter(tag => tag !== item)
                                })
                              }}
                            >
                              close
                            </MaterialSymbolIcon>
                          </Badge>
                        ))}
                      </div>
                      <ClearButton />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='salary'>
                    <AccordionTrigger className='px-2'>Salary</AccordionTrigger>
                    <AccordionContent className='space-y-4 p-2'>
                      <AccordionItemChildWrapper>
                        <Checkbox />
                        <span>Only show listings with salary included</span>
                      </AccordionItemChildWrapper>
                      <ClearButton />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value='job_preferences'>
                    <AccordionTrigger className='px-2'>
                      Job Preferences
                    </AccordionTrigger>
                    <AccordionContent className='space-y-4 p-2'>
                      <AccordionItemChildWrapper>
                        <Checkbox />
                        <span>Apply Job Preferences</span>
                      </AccordionItemChildWrapper>
                      <ClearButton />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SheetContent>
            </Sheet>
          </div>
          <div>
            <Button>
              <span className='mr-2'>Find Talent</span>
              <MaterialSymbolIcon>arrow_right_alt</MaterialSymbolIcon>
            </Button>
          </div>
          <div
            className={cn(
              'w-full flex justify-start items-center gap-0 pl-3',
              roboto.className
            )}
          >
            <Tabs tabs={tabList} />
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}

function AccordionItemChildWrapper ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex justify-start items-center gap-2', className)}>
      {children}
    </div>
  )
}

function ClearButton ({
  className,
  children = 'Clear',
  ...props
}: { className?: string } & ButtonProps) {
  return (
    <Button
      className={cn(
        'w-full h-8 bg-lightAccent border-border border-2 rounded-sm hover:bg-darkAccent/40',
        className
      )}
      variant={'outline'}
      {...props}
    >
      {children}
    </Button>
  )
}
