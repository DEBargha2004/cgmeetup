'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useEffect, useRef, useState } from 'react'
import MaterialSymbolIcon from '../material-symbol-icon'

const list: string[] = [
  'Microsoft Corporation',
  'Google LLC',
  'Apple Inc.',
  'Amazon.com, Inc.',
  'Adobe Systems Incorporated',
  'Netflix, Inc.',
  'Snap Inc.',
  'Tesla, Inc.',
  'Meta Platforms, Inc.',
  'Facebook, Inc.',
  'Atlassian Corporation',
  'LinkedIn Corporation',
  'Twitter, Inc.',
  'Square, Inc.',
  'Airbnb, Inc.',
  'Lyft, Inc.',
  'Spotify AB',
  'Slack Technologies, Inc.',
  'Dropbox, Inc.'
]

export default function CompanyLegalNameForm ({}: {}) {
  const [salaryPopoverWidth, setSalaryPopoverWidth] = useState(0)
  const salaryTriggerRef = useRef<HTMLInputElement>(null)
  const dropdownTriggerRef = useRef<HTMLDivElement>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const handleResize = (e: ResizeObserverEntry[]) => {
      for (const entry of e) {
        setSalaryPopoverWidth(entry.contentBoxSize[0].inlineSize + 26)
      }
    }

    const ro = new ResizeObserver(handleResize)

    salaryTriggerRef.current && ro.observe(salaryTriggerRef.current!)

    return () => {
      ro?.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!salaryTriggerRef.current) return
    salaryTriggerRef.current.onclick = () => {
      dropdownTriggerRef.current?.focus()
    }

    salaryTriggerRef.current.onblur = () => {
      setDropdownOpen(false)
    }
  }, [])
  return (
    <>
      <div className='relative'>
        <Input
          className='placeholder:text-muted-foreground pl-10'
          ref={salaryTriggerRef}
        />
        <MaterialSymbolIcon className='absolute left-2 top-1/2 -translate-y-1/2'>
          search
        </MaterialSymbolIcon>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div ref={dropdownTriggerRef}></div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='max-h-[300px] overflow-y-auto scroller'
          style={{ width: salaryPopoverWidth }}
        >
          {list?.map(item => (
            <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
