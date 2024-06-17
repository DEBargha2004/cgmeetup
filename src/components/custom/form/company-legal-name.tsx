'use client'

import { Input } from '@/components/ui/input'
import { HTMLProps, useRef, useState } from 'react'
import MaterialSymbolIcon from '../material-symbol-icon'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useClickAway } from '@uidotdev/usehooks'

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

export default function CompanyLegalNameForm ({
  onCreateClick,
  onListItemClick
}: {
  onCreateClick?: () => void
  onListItemClick?: () => void
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const salaryTriggerRef = useClickAway(() => setDropdownOpen(false))

  return (
    <>
      <div
        className='relative'
        //@ts-ignore
        ref={salaryTriggerRef}
        onClick={() => setDropdownOpen(true)}
      >
        <Input className='placeholder:text-muted-foreground pl-10' />
        <MaterialSymbolIcon className='absolute left-2 top-1/2 -translate-y-1/2'>
          search
        </MaterialSymbolIcon>

        {dropdownOpen && (
          <div
            className={cn(
              `absolute top-full translate-y-2 left-0 w-full bg-card border rounded 
            overflow-y-auto scroller space-y-1 p-1 shadow-md h-fit max-h-[250px]`
            )}
          >
            {list.map((item, index) => (
              <DropodownItem
                key={item}
                onClick={() => {
                  onListItemClick?.()
                }}
              >
                {item}
              </DropodownItem>
            ))}
            <DropodownItem className='flex justify-between items-start'>
              <p>This company has not been created </p>
              <Button onClick={() => onCreateClick?.()}>Create</Button>
            </DropodownItem>
          </div>
        )}
      </div>
    </>
  )
}

function DropodownItem ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'p-2 cursor-pointer hover:bg-lightAccent transition-all rounded-sm text-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
