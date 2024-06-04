import { MaterialSymbolIcon } from '@/components/custom'
import { format } from 'date-fns'
import Image from 'next/image'

export default function BookmarkCard () {
  return (
    <div className='pt-4 pb-2 border rounded px-3 bg-card'>
      <div className='flex justify-start items-start gap-3'>
        <Image
          src={
            'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
          }
          alt='bookmark-image'
          height={100}
          width={100}
          className='rounded'
        />
        <div className='w-full space-y-1'>
          <div className='flex justify-between items-center gap-2'>
            <h1 className='text-lg font-semibold w-[90%] shrink-0 line-clamp-1'>
              Animals are most loving Animals Animals are most loving Animals
              are most loving
            </h1>
            <MaterialSymbolIcon className='opacity-100'>
              bookmark
            </MaterialSymbolIcon>
          </div>
          <p className='line-clamp-1 w-[90%] opacity-70'>
            Long description of the bookmark Long description of the bookmark
          </p>
          {/* Frbruary 17, 2022 */}
          <p className='opacity-70'>{format(new Date(), 'MMMM dd, yyyy')}</p>
        </div>
      </div>
      <div className='flex justify-end items-center'>
        <MaterialSymbolIcon className='opacity-100 text-red-500'>
          delete
        </MaterialSymbolIcon>
      </div>
    </div>
  )
}
