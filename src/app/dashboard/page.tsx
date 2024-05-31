import Link from 'next/link'
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Overview } from './_components/overview'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export default function Dashboard () {
  return (
    <div className='flex h-full w-full flex-col'>
      <header
        className='z-30 flex md:h-14 items-center gap-4 border-b bg-background px-4 
      sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 my-5'
      >
        <Breadcrumb className='hidden md:flex'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='#'>Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <Card x-chunk='dashboard-01-chunk-0' className='bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Revenue
              </CardTitle>
              <DollarSign className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>$45,231.89</div>
              <p className='text-xs text-muted-foreground'>
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-1' className='bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Subscriptions
              </CardTitle>
              <Users className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+2350</div>
              <p className='text-xs text-muted-foreground'>
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-2' className='bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Sales</CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+12,234</div>
              <p className='text-xs text-muted-foreground'>
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-3' className='bg-card'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
              <Activity className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>+573</div>
              <p className='text-xs text-muted-foreground'>
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
          <Card
            className='xl:col-span-2 bg-card'
            x-chunk='dashboard-01-chunk-4'
          >
            <CardHeader className='flex flex-row items-center'>
              <div className='grid gap-2'>
                <CardTitle className='text-xl'>Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
          <Card x-chunk='dashboard-01-chunk-5' className=' bg-card'>
            <CardHeader>
              <CardTitle className='text-xl'>Recent Comments</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-8'>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/01.png' alt='Avatar' />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    Olivia Martin
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    olivia.martin@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$1,999.00</div>
              </div>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/02.png' alt='Avatar' />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    Jackson Lee
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    jackson.lee@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$39.00</div>
              </div>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/03.png' alt='Avatar' />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    Isabella Nguyen
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$299.00</div>
              </div>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/04.png' alt='Avatar' />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    William Kim
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    will@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$99.00</div>
              </div>
              <div className='flex items-center gap-4'>
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage src='/avatars/05.png' alt='Avatar' />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>
                    Sofia Davis
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    sofia.davis@email.com
                  </p>
                </div>
                <div className='ml-auto font-medium'>+$39.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
