import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function AppLogo ({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'text-white flex justify-center items-center gap-1 font-medium',
        className
      )}
    >
      <div className='bg-[#FF0000] p-[2px] rounded-sm'>CG</div> Meetup
    </div>
  )
}
