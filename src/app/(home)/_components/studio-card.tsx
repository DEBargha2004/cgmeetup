import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import profile from '@/../public/images/profile-1.jpg'
import { cn } from '@/lib/utils'
import { MaterialSymbolIcon } from '@/components/custom'
import { Button } from '@/components/ui/button'

export default function StudioCard ({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        'bg-card min-w-[250px] p-5 flex flex-col justify-start items-center gap-6',
        className
      )}
    >
      <Image
        src={profile}
        alt='profile'
        height={100}
        width={100}
        className='rounded-sm h-20 w-20'
      />
      <div className='text-center flex flex-col items-center justify-start gap-1 [&>button]:mt-3'>
        <h1 className='text-lg '>Ubisoft Canada</h1>
        <div className='flex items-center justify-center gap-2'>
          <p className='text-sm opacity-70'>VFX Studio</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <MaterialSymbolIcon className='text-sm'>
            location_on
          </MaterialSymbolIcon>
          <p className='text-sm opacity-70'>Canada</p>
        </div>
        <Button
          variant={'outline'}
          className='flex justify-center items-center gap-2 bg-transparent hover:bg-darkAccent'
        >
          <MaterialSymbolIcon>work</MaterialSymbolIcon>
          <span>39 Jobs Open</span>
        </Button>
        <Button className='w-fit h-7 px-2 mt-3'>
          <span className='mr-1 font-semibold text-sm'>Follow</span>
          <MaterialSymbolIcon className='text-base'>
            person_add
          </MaterialSymbolIcon>
        </Button>
      </div>
    </Card>
  )
}
