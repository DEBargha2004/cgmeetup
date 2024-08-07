import { IconType } from '@/types/icon'
import { HTMLProps, forwardRef } from 'react'

const UploadType = forwardRef<
  HTMLDivElement,
  {
    Icon: IconType
    title: string
    supportedTypes: string
  } & HTMLProps<HTMLDivElement>
>(({ supportedTypes, Icon, title, ...props }, ref) => (
  <div
    className='flex flex-col items-center justify-start gap-1 cursor-pointer p-4
                      hover:bg-lightAccent w-full mx-auto rounded border-r last:border-none'
    ref={ref}
    {...props}
  >
    <Icon className='h-8 text-primary' />
    <h1 className='text-lg'>{title}</h1>
    <p className='text-xs opacity-70'>{supportedTypes}</p>
  </div>
))

UploadType.displayName = 'UploadType'

export default UploadType
