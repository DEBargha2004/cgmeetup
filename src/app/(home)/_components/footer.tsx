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
  { label: 'Privacy policy', href: '/privacy' },
  // { label: 'FAQ', href: '/faq' },
  { label: 'Sitemap', href: '' }
]

export default function Footer () {
  return (
    <div className='flex lg:flex-row flex-col lg:gap-0 gap-4 justify-between items-center px-5 py-4 bg-card'>
      <div className='flex lg:flex-row flex-col justify-between items-center gap-6 text-center'>
        <div className='grid xs:grid-cols-5 grid-cols-3 gap-2'>
          {more_info_links.map((link, index) => (
            <Link href={link.href} key={index}>
              <h2 className='text-sm hover:text-primary'>{link.label}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className='flex  justify-start items-center gap-2'>
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
      <h2 className='text-base opacity-70'>
        CGMeetup - Copyright ©{new Date().getFullYear()}
      </h2>
    </div>
  )
}
