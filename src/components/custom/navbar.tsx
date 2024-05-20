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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import user_profile from '../../../public/images/userProf.jpg'
import { profileItems } from '@/constants/user-profile-dropdown'
import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import React from 'react'

export default function Navbar ({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'top-0 flex h-16 items-center gap-4 border-b bg-lightAccent px-4 md:px-6',
        className
      )}
    >
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link
          href='/'
          className='flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <AppLogo />
        </Link>

        {navItems.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className='text-muted-foreground transition-colors hover:text-foreground'
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link
              href='/'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <AppLogo />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            {navItems.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className='flex items-center gap-2 text-lg font-semibold'
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='w-full sm:w-2/3 ml-auto'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='pl-8 sm:w-full'
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' size='icon' className='rounded-full'>
              <CircleUser className='h-5 w-5' />
              <span className='sr-only'>Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {profileItems.map((item, item_idx) => (
              <React.Fragment key={item_idx}>
                {item.type === 'link' ? (
                  <DropdownMenuItem key={item.id} className='cursor-pointer'>
                    {item.label}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
