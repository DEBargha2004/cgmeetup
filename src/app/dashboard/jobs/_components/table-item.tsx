'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { FieldType } from '@/types/field-type'
import { IconType } from '@/types/icon'
import {
  Comment,
  Delete,
  Edit,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Visibility
} from '@mui/icons-material'
import Image from 'next/image'
import { useState } from 'react'

const info_options: (FieldType & { Icon: IconType })[] = [
  { label: 'Edit', value: 'edit', Icon: Edit },
  { label: 'View', value: 'view', Icon: Visibility },
  { label: 'Delete', value: 'delete', Icon: Delete }
]

export default function TableItem () {
  const [showLiked, setShowLiked] = useState(false)
  return (
    <TableRow className='hover:bg-darkAccent'>
      <TableCell className='sm:p-2 px-0 w-fit'>
        <div className='lg:h-[150px] lg:w-[150px] h-[80px] w-[80px]'>
          <Image
            src='https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
            height={150}
            width={150}
            className='h-full aspect-square object-cover'
            alt='gallery-image'
          />
        </div>
      </TableCell>
      <TableCell className='font-medium '>Laser Lemonade Machine</TableCell>
      <TableCell className='max-w-[150px] sm:table-cell hidden'>
        <Badge variant='outline'>Draft</Badge>
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        <div className='flex lg:flex-row flex-col justify-start items-center gap-3'>
          <div className='flex justify-center items-center gap-1'>
            <div
              className='cursor-pointer flex items-start'
              onClick={() => setShowLiked(!showLiked)}
            >
              {showLiked ? (
                <Favorite className='text-red-600' />
              ) : (
                <FavoriteBorder />
              )}
            </div>
            <span>2</span>
          </div>
          <div className='flex justify-center items-center gap-1'>
            <Visibility />
            <span>2</span>
          </div>
          <div className='flex justify-center items-center gap-1'>
            <Comment />
            <span>2</span>
          </div>
        </div>
      </TableCell>
      <TableCell className='hidden md:table-cell '>
        Artwork, Shortfilm,
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        2023-07-12 10:42 AM
      </TableCell>
      <TableCell className='px-0'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup='true'
              size='icon'
              variant='ghost'
              className='px-0'
            >
              <MoreVert />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {info_options.map(item => (
              <DropdownMenuItem key={item.value}>
                <item.Icon className='mr-2' />
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
