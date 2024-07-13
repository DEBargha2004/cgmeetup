import { MaterialSymbolIcon } from '@/components/custom'
import { HTMLProps, forwardRef } from 'react'

const UploadType = forwardRef<
  HTMLDivElement,
  {
    icon: string
    title: string
    supportedTypes?: string
  } & HTMLProps<HTMLDivElement>
>(({ supportedTypes, icon, title, ...props }, ref) => (
  <div
    className='flex flex-col items-center justify-start gap-1 cursor-pointer p-4
                      hover:bg-lightAccent w-full mx-auto rounded border-r last:border-none'
    ref={ref}
    {...props}
  >
    <MaterialSymbolIcon className='text-3xl text-primary opacity-100 w-7'>
      {icon}
    </MaterialSymbolIcon>
    <h1 className='text-lg'>{title}</h1>
    <p className='text-xs opacity-70'>{supportedTypes}</p>
  </div>
))

UploadType.displayName = 'UploadType'

export default UploadType
