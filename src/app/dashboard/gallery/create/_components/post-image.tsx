import { MaterialSymbolIcon } from '@/components/custom'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HTMLProps, forwardRef } from 'react'

type PostImage = { id: string; url: string; type: string; caption: string }

const PostImage = forwardRef<
  HTMLDivElement,
  {
    image: PostImage
    className?: string
    onDelete: (id: string) => void
    handleCaptionChange: (id: string, caption: string) => void
  } & HTMLProps<HTMLDivElement>
>(({ image, className, onDelete, handleCaptionChange, ...props }, ref) => (
  <div className={cn('border', className)} ref={ref} {...props}>
    <div className='bg-darkAccent relative'>
      <Image
        src={image.url}
        alt='post-image'
        height={300}
        width={300}
        className={cn('w-full aspect-square object-cover')}
      />
      <div className='absolute w-full h-8 top-0 left-0 bg-darkAccent/50 flex justify-between items-center px-2'>
        <div className='flex justify-between items-center gap-3'>
          <MaterialSymbolIcon className=' '>image</MaterialSymbolIcon>
        </div>
        <div>
          <MaterialSymbolIcon
            variant='filled'
            className=' text-red-500 opacity-100 cursor-pointer'
            onClick={() => onDelete(image.id)}
          >
            delete
          </MaterialSymbolIcon>
        </div>
      </div>
    </div>
    <div className='p-2 space-y-4'>
      <Textarea
        placeholder='Caption'
        className='w-full rounded'
        value={image.caption}
        onChange={e => handleCaptionChange(image.id, e.target.value)}
      />
    </div>
  </div>
))

PostImage.displayName = 'PostImage'

export default PostImage
