'use client'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import NextImage from 'next/image'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MaterialSymbolIcon from '../material-symbol-icon'
import avatar from '../../../../public/images/profile-1.jpg'
import { getShortendName } from '@/functions'
import { Button } from '@/components/ui/button'
import FieldsContainer from './field-container'
import { Upload } from '@mui/icons-material'

export default function UploadImageSingle () {
  const [imageUrl, setImageUrl] = useState('')

  const profileImage = useDropzone({
    maxFiles: 1,
    multiple: false
  })

  useEffect(() => {
    const reader = new FileReader()
    const file = profileImage.acceptedFiles[0]

    if (file) {
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
    }
  }, [profileImage.acceptedFiles])

  return (
    <section className='space-y-4 w-full grid gap-4 px-2'>
      <FieldsContainer className='w-1/2'>
        <input hidden {...profileImage.getInputProps()} />
        <NextImage
          src={imageUrl || avatar.src}
          height={150}
          width={150}
          alt='avatar'
          className='h-[150px] w-[150px] object-cover rounded-full mx-auto'
        />
        <div className='flex justify-center items-center gap-3 w-full'>
          <p className='shrink-0'>Upload Avatar</p>
          <Button
            {...profileImage.getRootProps()}
            className='rounded min-w-24 shrink-0'
            variant={'success'}
          >
            <Upload className='mr-2' />
            Upload
          </Button>
        </div>
      </FieldsContainer>
    </section>
  )
}
