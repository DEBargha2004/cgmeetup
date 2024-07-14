import not_found from '@/../public/images/not-found.png'
import Image from 'next/image'
import Link from 'next/link'

const links: { label: string; href: string }[] = [
  {
    label: 'Gallery',
    href: '/gallery'
  },
  {
    label: 'Jobs',
    href: '/jobs'
  },
  {
    label: 'News',
    href: '/news'
  },
  {
    label: 'Marketplace',
    href: '/marketplace'
  },
  {
    label: 'Tutorials',
    href: '/tutorials'
  }
]

export default function NotFoundPage () {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center gap-4'>
      <Image
        src={not_found}
        alt='not-found'
        width={500}
        height={500}
        className='w-[400px] aspect-square object-cover shrink-0'
      />

      <p className='max-w-[600px] text-center'>
        The page you are looking for is temporarily unavailable. Visit :
      </p>
      <ul className='flex justify-center items-center gap-3 marker:hidden list-none'>
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className='text-primary'>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
