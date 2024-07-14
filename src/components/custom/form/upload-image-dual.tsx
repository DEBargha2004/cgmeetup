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
import { Button } from '@/components/ui/button'
import FieldsContainer from './field-container'
import cover from '../../../../public/images/cover-image.jpg'
import { Upload } from '@mui/icons-material'

export default function UploadImageDual () {
  const [imageUrl, setImageUrl] = useState('')
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('')

  const profileImage = useDropzone({
    maxFiles: 1,
    multiple: false
  })

  const backgroundImage = useDropzone({
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

  useEffect(() => {
    const reader = new FileReader()
    const file = backgroundImage.acceptedFiles[0]

    if (file) {
      reader.readAsDataURL(file)

      reader.onloadend = () => {
        setBackgroundImageUrl(reader.result as string)
      }
    }
  }, [backgroundImage.acceptedFiles])
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
          <p>Upload Avatar</p>
          <Button
            {...profileImage.getRootProps()}
            className='rounded min-w-24'
            variant={'success'}
          >
            <Upload className='mr-2' />
            Upload
          </Button>
        </div>
      </FieldsContainer>
      <FieldsContainer className='w-full'>
        <input hidden {...backgroundImage.getInputProps()} />
        <NextImage
          src={backgroundImageUrl || cover}
          height={500}
          width={500}
          alt='avatar'
          className='w-full max-h-[250px] object-cover rounded'
        />
        <span className='mx-auto opacity-70 text-sm'>
          Size of image should be 1920px x 740px
        </span>
        <div className='flex justify-center items-center gap-3 w-full'>
          <p>Upload Cover Image</p>
          <Button
            {...backgroundImage.getRootProps()}
            className='rounded min-w-24'
            variant={'success'}
          >
            <Upload className='mr-2' />
            Upload
          </Button>
        </div>
        <Button className='w-24 ml-auto'>Submit</Button>
      </FieldsContainer>
    </section>
  )
}
