import { cn } from '@/lib/utils'
import backgrond from '@/../public/images/cover-image.jpg'
import Image from 'next/image'

export default function NewsCard ({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-[320px] aspect-video rounded border relative overflow-hidden group cursor-pointer',
        className
      )}
    >
      <Image
        src={backgrond}
        alt='news'
        height={400}
        width={400 * (16 / 9)}
        className='w-full h-full object-cover absolute top-0 left-0 -z-10 opacity-70 transition-all group-hover:scale-105'
      />
      <div className='flex items-end justify-start w-full h-full py-2 px-4'>
        <h1 className='line-clamp-1 text-xl font-semibold max-w-[90%]'>
          This is the news title here and this is the news title here
        </h1>
      </div>
    </div>
  )
}
