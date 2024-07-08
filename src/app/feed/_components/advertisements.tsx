import Image from 'next/image'
import Link from 'next/link'
import ad1 from '@/../public/images/add_1.jpg'
import ad2 from '@/../public/images/add-2.jpg'
import { cn } from '@/lib/utils'

export default function Advertisements ({ className }: { className?: string }) {
  return (
    <div className={cn('w-full space-y-3 sticky top-0', className)}>
      {Array.from({ length: 2 }, (_, i) => i).map(i => (
        <Link href={'/gallery/a8'} key={i} className='inline-block w-full'>
          <Image
            src={i % 2 === 0 ? ad1 : ad2}
            height={300}
            width={300}
            alt='add'
            className='max-w-[300px] aspect-square object-cover mx-auto'
          />
        </Link>
      ))}
    </div>
  )
}
