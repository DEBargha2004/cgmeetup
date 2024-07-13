import { MaterialSymbolIcon } from '@/components/custom'
import Link from 'next/link'
import facebook from '@/../public/icons/socials/facebook.png'
import twitter from '@/../public/icons/socials/twitter.png'
import instagram from '@/../public/icons/socials/instagram.png'
import linkedin from '@/../public/icons/socials/linkedin.png'
import youtube from '@/../public/icons/socials/youtube.png'
import Image, { StaticImageData } from 'next/image'

const social_links: { icon: StaticImageData; href: string }[] = [
  {
    icon: facebook,
    href: 'https://facebook.com'
  },
  {
    icon: youtube,
    href: 'https://youtube.com'
  },
  {
    icon: twitter,
    href: 'https://twitter.com'
  },
  {
    icon: instagram,
    href: 'https://instagram.com'
  },
  {
    icon: linkedin,
    href: 'https://linkedin.com'
  }
]

const more_info_links: { label: string; href: string }[] = [
  { label: 'About us', href: '/aboutus' },
  { label: 'Contact us', href: '/contactus' },
  { label: 'Terms of use', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' }
]

export default function Footer () {
  return (
    <div className='flex md:flex-row flex-col md:gap-0 gap-10 justify-between items-center px-10 py-4 bg-card'>
      <div className='flex md:flex-row flex-col justify-start items-center gap-6 text-center'>
        <h2 className='text-base opacity-70'>
          Copyright © {new Date().getFullYear()}- CGMEETUP
        </h2>
        <div className='grid xs:grid-cols-4 grid-cols-2 gap-4'>
          {more_info_links.map((link, index) => (
            <Link href={link.href} key={index}>
              <h2 className='text-sm hover:text-primary'>{link.label}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex  justify-start items-center gap-4'>
        {social_links.map((social, index) => (
          <Link href={social.href} key={index} className='shrink-0'>
            <Image
              src={social.icon}
              alt={social.href}
              height={30}
              width={30}
              className='invert h-6 w-6 opacity-70'
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
