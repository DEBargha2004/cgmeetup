'use client'

import { cn } from '@/lib/utils'
import AppLogo from './app-logo'
import { extraNavItems, navItems } from '@/constants/nav-items'
import Link from 'next/link'
import { Input } from '../ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { profileItems, uploadButtonItems } from '@/constants/dropdown-items'
import { Menu, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import React, { HTMLProps, useState } from 'react'
import { useGlobalAppStore } from '@/store/global-app-store'
import MaterialSymbolIcon from './material-symbol-icon'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  NotificationCardProfileView,
  NotificationCardOtherView
} from './notification-card'
import { usePathname } from 'next/navigation'
import { PopoverClose } from '@radix-ui/react-popover'
import ProfileInfoOverView from './profile-info-overview'
import { Separator } from '../ui/separator'

export default function Navbar ({ className }: { className?: string }) {
  const {
    sidebarState,
    setSidebarState,
    setAuthDialogState,
    setPostDialogState,
    setJobDialogState
  } = useGlobalAppStore()
  const [signedin, setSignedin] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className={cn(
        'top-0 flex h-16 items-center md:gap-4 gap-2 border-b bg-card px-4 md:px-6',
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

        {navItems.map((item, item_idx) => (
          <React.Fragment key={item_idx}>
            {item.type === 'item' ? (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'transition-colors text-white',
                  (
                    item.catch_routes
                      ? item.catch_routes.includes(pathname)
                      : pathname === item.href
                  )
                    ? 'text-primary'
                    : ''
                )}
              >
                {item.label}
              </Link>
            ) : null}
          </React.Fragment>
        ))}
      </nav>
      <Sheet open={sidebarState} onOpenChange={setSidebarState}>
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
            {navItems.map((item, item_idx) => (
              <React.Fragment key={item_idx}>
                {item.type === 'item' ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 text-lg font-semibold',
                      (
                        item.catch_routes
                          ? item.catch_routes.includes(pathname)
                          : pathname === item.href
                      )
                        ? 'text-primary'
                        : ''
                    )}
                  >
                    <MaterialSymbolIcon className='opacity-100'>
                      {item.icon}
                    </MaterialSymbolIcon>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <Separator />
                )}
              </React.Fragment>
            ))}
            {extraNavItems.map((item, item_idx) => (
              <React.Fragment key={item_idx}>
                {item.type === 'item' ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 text-lg font-semibold',
                      (
                        item.catch_routes
                          ? item.catch_routes.includes(pathname)
                          : pathname === item.href
                      )
                        ? 'text-primary'
                        : ''
                    )}
                  >
                    <MaterialSymbolIcon className='opacity-100'>
                      {item.icon}
                    </MaterialSymbolIcon>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <Separator orientation='horizontal' />
                )}
              </React.Fragment>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex w-full items-center  md:ml-auto gap-2 lg:gap-4'>
        <form className='w-full sm:w-2/3 mr-auto ml-1/10'>
          <SearchInput />
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'success'}
              className='sm:px-3 px-2 h-8 flex justify-center items-center'
            >
              <MaterialSymbolIcon
                variant='filled'
                className='sm:mr-1 opacity-100'
              >
                add
              </MaterialSymbolIcon>
              <span className='sm:inline hidden'>Post</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='translate-y-2'>
            <DropdownMenuItem
              className='cursor-pointer flex gap-2 items-center pl-2'
              onClick={() => setPostDialogState(true)}
            >
              <MaterialSymbolIcon className='text-sm'>photo</MaterialSymbolIcon>
              <span>Add Post</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer flex gap-2 items-center pl-2'
              onClick={() => setJobDialogState(true)}
            >
              <MaterialSymbolIcon className='text-sm'>work</MaterialSymbolIcon>
              <span>Add Job</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {uploadButtonItems.map((item, item_idx) => (
              <React.Fragment key={item_idx}>
                {item.type === 'link' ? (
                  <Link href={item.href}>
                    <ProfileItemLabel item={item} />
                  </Link>
                ) : (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {!signedin ? (
          <div className='flex justify-between items-center gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <div className='cursor-pointer'>
                  <MaterialSymbolIcon>notifications_none</MaterialSymbolIcon>
                </div>
              </PopoverTrigger>
              <PopoverContent
                side='bottom'
                align='center'
                className='bg-card translate-y-3 space-y-3 max-h-[600px] lg:w-[500px] overflow-y-auto scroller'
              >
                <h1 className='text-xl font-semibold'>Notifications</h1>
                <div className='space-y-3'>
                  {Array.from({ length: 21 }, (_, i) => i).map(i =>
                    Math.floor(Math.random() * 2) ? (
                      <NotificationCardOtherView key={i} />
                    ) : (
                      <NotificationCardProfileView key={i} />
                    )
                  )}
                </div>
                <Link href={'/dashboard/notifications'}>
                  <PopoverClose className='w-full'>
                    <div className='p-2 flex justify-center items-center rounded hover:bg-lightAccent cursor-pointer transition-all'>
                      View All Notifications
                    </div>
                  </PopoverClose>
                </Link>
              </PopoverContent>
            </Popover>
            <Link href={'/chat'}>
              <MaterialSymbolIcon>chat</MaterialSymbolIcon>
            </Link>
            <Link href={''}>
              <MaterialSymbolIcon>add_shopping_cart</MaterialSymbolIcon>
            </Link>
          </div>
        ) : (
          <>
            <Link href={'/sign-up'}>
              <Button variant={'success'} className='h-9'>
                <MaterialSymbolIcon className='sm:mr-1'>
                  person
                </MaterialSymbolIcon>
                <span className='md:inline hidden'>Sign Up</span>
              </Button>
            </Link>

            <Link href={'/sign-in'}>
              <Button className='h-9'>
                <MaterialSymbolIcon className='sm:mr-1'>
                  login
                </MaterialSymbolIcon>
                <span className='md:inline hidden'>Sign In</span>
              </Button>
            </Link>
          </>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <MaterialSymbolIcon className='lg:text-[40px] text-3xl lg:w-10 w-[30px] inline-block'>
                account_circle
              </MaterialSymbolIcon>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='translate-y-1'>
            {profileItems
              .slice(0, profileItems.length - 1)
              .map((item, item_idx) => (
                <ProfileItemLink item={item} key={item_idx}>
                  <ProfileItemLabel item={item} />
                </ProfileItemLink>
              ))}
            <DropdownMenuItem
              className='cursor-pointer flex gap-2 w-full pl-2 '
              onClick={() => setAuthDialogState(true)}
            >
              <MaterialSymbolIcon className='text-sm'>login</MaterialSymbolIcon>
              Sign In
            </DropdownMenuItem>
            {profileItems
              .slice(profileItems.length - 1)
              .map((item, item_idx) => (
                <ProfileItemLink item={item} key={item_idx}>
                  <ProfileItemLabel item={item} />
                </ProfileItemLink>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function ProfileItemLabel ({ item }: { item: typeof profileItems[number] }) {
  return (
    <React.Fragment>
      {item.type === 'separator' ? (
        <DropdownMenuSeparator />
      ) : (
        <>
          <DropdownMenuItem
            key={item.id}
            className='cursor-pointer flex gap-2 w-full pl-2 '
          >
            <MaterialSymbolIcon className='text-sm'>
              {item.icon}
            </MaterialSymbolIcon>
            {item.label}
          </DropdownMenuItem>
        </>
      )}
    </React.Fragment>
  )
}

function ProfileItemLink ({
  item,
  children
}: {
  item: typeof profileItems[number]
  children: React.ReactNode
}) {
  return (
    <React.Fragment>
      {item.type === 'link' ? (
        <Link
          href={item.href}
          className='flex justify-start items-center w-full'
        >
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </React.Fragment>
  )
}

function SearchInput () {
  const [showSearchFields, setShowSearchFields] = useState(false)
  return (
    <div className='relative'>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder='Search...'
        className='pl-8 sm:w-full'
        onFocus={() => setShowSearchFields(true)}
        onBlur={() => setShowSearchFields(false)}
      />
      <div
        hidden={!showSearchFields}
        className='w-full h-fit p-2 bg-card absolute left-0 top-[calc(100%+5px)] z-50 rounded space-y-1 px-1 max-h-[600px] overflow-y-auto scroller'
      >
        {Array.from({ length: 5 }, (_, i) => i).map(item => (
          <SearchItem key={item}>
            <ProfileInfoOverView
              textContainer='justify-center'
              description='hidden'
              image='h-8 w-8'
            />
          </SearchItem>
        ))}
        {navItems.map((item, item_idx) => (
          <React.Fragment key={item_idx}>
            {item.type === 'item' ? (
              <Link
                href={item.href}
                key={item.id}
                className=' flex justify-start items-center gap-2 '
              >
                <SearchItem className='flex justify-start items-center gap-2'>
                  <MaterialSymbolIcon>{item.icon}</MaterialSymbolIcon>
                  <span>Search {item.label}</span>
                </SearchItem>
              </Link>
            ) : (
              <Separator />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function SearchItem ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'p-2 transition-all hover:bg-lightAccent w-full rounded cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
