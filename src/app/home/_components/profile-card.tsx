import Image from 'next/image'
import avatar from '@/../public/images/profile-1.jpg'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MaterialSymbolIcon } from '@/components/custom'

export default function ProfileCard ({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-card p-3 px-5 flex flex-col justify-start items-center gap-4 rounded',
        className
      )}
    >
      <Image
        src={avatar}
        height={120}
        width={120}
        alt='profile'
        className='h-[120px] w-[120px] rounded-full object-cover'
      />
      <div className='space-y-2 text-center'>
        <h1 className='font-semibold text-lg'>Nayanika</h1>
        <p className='opacity-70 font-light'>3D Artist</p>
      </div>
      <Button className='w-fit'>
        <span className='mr-2 text-lg font-semibold'>Follow</span>
        <MaterialSymbolIcon>person_add</MaterialSymbolIcon>
      </Button>
    </div>
  )
}
