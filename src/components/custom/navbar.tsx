import { cn } from '@/lib/utils'
import AppLogo from './app-logo'
import { navItems } from '@/constants/nav-items'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import user_profile from '../../../public/images/userProf.jpg'
import { profileItems } from '@/constants/user-profile-dropdown'
import { Search } from 'lucide-react'

export default function Navbar ({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'px-4 py-2 flex justify-between items-center border-b bg-lightAccent',
        className
      )}
    >
      <div className='flex justify-between items-center gap-3'>
        <Link href={'/'}>
          <AppLogo />
        </Link>
        {navItems.map(navItem => (
          <Link href={navItem.href} key={navItem.id}>
            <div
              className='flex justify-start items-center uppercase text-sm p-3 py-2 
            rounded-md hover:bg-darkAccent transition-all'
            >
              {navItem.label}
            </div>
          </Link>
        ))}
      </div>
      <div className='w-3/5 relative'>
        <Input className='w-full pl-8' placeholder='Search' />
        <Search
          className='absolute left-2 top-1/2 -translate-y-1/2 
        h-5 w-5'
        />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='cursor-pointer h-8 w-8'>
              <AvatarImage src={user_profile.src} />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {profileItems.map(profileItem => (
              <Link href={profileItem.href} key={profileItem.id}>
                <DropdownMenuItem>{profileItem.label}</DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
