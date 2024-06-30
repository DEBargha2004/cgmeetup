'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import { Dialog, DialogContent } from '../ui/dialog'
import MaterialSymbolIcon from './material-symbol-icon'
import { Textarea } from '../ui/textarea'
import { HTMLProps, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type PostImage = { id: string; url: string }

export default function PostCreateDialog () {
  const { setPostDialogState, postDialogState } = useGlobalAppStore()
  const [postDesc, setPostDesc] = useState('')
  const imageListRef = useRef<HTMLDivElement>(null)
  const imageDropzone = useDropzone({
    accept: { 'image/*': [] },
    multiple: true
  })
  const [imageList, setImageList] = useState<PostImage[]>([])

  const handleCarouselNavigation = (direction: 'next' | 'prev') => {
    if (imageListRef.current) {
      const currentScrollLeft = imageListRef.current.scrollLeft
      imageListRef.current.scrollTo({
        behavior: 'smooth',
        left:
          direction === 'next'
            ? currentScrollLeft + 200
            : currentScrollLeft - 200
      })
    }
  }

  const handleDeleteImage = (id: string) => {
    setImageList(prev => prev.filter(image => image.id !== id))
  }

  useEffect(() => {
    if (imageDropzone.acceptedFiles.length) {
      imageDropzone.acceptedFiles.forEach(file => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
          setImageList(prev => [
            ...prev,
            { id: crypto.randomUUID(), url: reader.result as string }
          ])
        }
      })
    }
  }, [imageDropzone.acceptedFiles])

  return (
    <Dialog
      open={postDialogState}
      onOpenChange={e => {
        setPostDesc('')
        setImageList([])
        setPostDialogState(e)
      }}
    >
      <DialogContent className='max-w-[800px]'>
        <div className='flex items-start justify-start gap-2'>
          <div id='user-image'>
            <div className='w-12 h-12 rounded-full flex justify-center items-center border'>
              <MaterialSymbolIcon>person</MaterialSymbolIcon>
            </div>
          </div>
          <div className='grid gap-2 w-full'>
            <Textarea
              className='overflow-y-auto scroller bg-transparent'
              rows={7}
              placeholder='Whats on your mind?'
              value={postDesc}
              onChange={e => setPostDesc(e.target.value)}
            />
            <p className='text-xs opacity-70'>{postDesc.length}/5000</p>
            <div className='w-full overflow-hidden relative'>
              <div
                className='flex gap-1 overflow-x-auto scroller-hide transition-all'
                ref={imageListRef}
              >
                {imageList.map(image => (
                  <PostImage
                    key={image.id}
                    id={image.id}
                    url={image.url}
                    className='w-[120px] shrink-0 select-none rounded overflow-hidden'
                    onDelete={handleDeleteImage}
                  />
                ))}
              </div>
              <Navigator
                icon='arrow_back_ios'
                className='absolute left-0 top-1/2 -translate-y-1/2 z-10 '
                onClick={() => handleCarouselNavigation('prev')}
              />
              <Navigator
                icon='arrow_forward_ios'
                className='absolute right-0 top-1/2 -translate-y-1/2 z-10 '
                onClick={() => handleCarouselNavigation('next')}
              />
            </div>
            <div hidden={!Boolean(imageList.length)}>
              <p>Thumbnail</p>
              <PostImage
                id={imageList[0]?.id}
                url={imageList[0]?.url}
                className='w-1/3 aspect-square'
              />
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex justify-start items-center gap-2'>
                <div>
                  <input
                    type='file'
                    {...imageDropzone.getInputProps()}
                    hidden
                  />
                  <MaterialSymbolIcon
                    {...imageDropzone.getRootProps()}
                    className='cursor-pointer'
                  >
                    image
                  </MaterialSymbolIcon>
                </div>
                <MaterialSymbolIcon>play_circle</MaterialSymbolIcon>
              </div>
              <div>
                <Button
                  className='h-8'
                  disabled={!(postDesc || imageList.length)}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Navigator ({
  icon,
  className,
  ...props
}: { icon: string } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `h-10 w-10 bg-lightAccent/80 rounded-full flex justify-center items-center cursor-pointer`,
        className
      )}
      {...props}
    >
      <MaterialSymbolIcon className='opacity-100 text-base select-none'>
        {icon}
      </MaterialSymbolIcon>
    </div>
  )
}

function PostImage ({
  id,
  url,
  className,
  onDelete,
  ...props
}: PostImage &
  HTMLProps<HTMLDivElement> & { onDelete?: (id: string) => void }) {
  return (
    <div className={cn('w-full h-full relative', className)} {...props}>
      <Image
        src={url}
        alt='post-image'
        className='w-full aspect-square object-cover'
        height={300}
        width={300}
      />
      <div
        className={cn(
          `h-7 w-7 flex justify-center items-center bg-darkAccent/50
      absolute top-2 right-2 rounded-full cursor-pointer`,
          !onDelete && 'hidden'
        )}
      >
        <MaterialSymbolIcon
          onClick={() => onDelete?.(id)}
          className='opacity-100 text-base'
        >
          close
        </MaterialSymbolIcon>
      </div>
    </div>
  )
}
