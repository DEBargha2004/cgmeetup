import Image from 'next/image'
import Link from 'next/link'
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { MaterialSymbolIcon } from '@/components/custom'

export default function Gallery () {
  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4 sm:py-4 '>
        <header className='sticky top-0 z-30 flex md:h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
          <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Gallery</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Posts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          <Tabs defaultValue='all'>
            <div className='flex items-center gap-2'>
              <TabsList className='bg-lightAccent'>
                <TabsTrigger value='all'>All</TabsTrigger>
                <TabsTrigger value='active'>Public</TabsTrigger>
                <TabsTrigger value='draft'>Draft</TabsTrigger>
              </TabsList>
              <Link href={'/dashboard/gallery/create'}>
                <Button size='sm' className='h-8 gap-1'>
                  <PlusCircle className='h-3.5 w-3.5' />
                  <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                    Add Post
                  </span>
                </Button>
              </Link>
              <div className='ml-auto flex items-center gap-2'>
                <div className='relative ml-auto flex-1 md:grow-0'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    type='search'
                    placeholder='Search...'
                    className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] h-8'
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm' className='h-8 gap-1'>
                      <ListFilter className='h-3.5 w-3.5' />
                      <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value='all'>
              <Card x-chunk='dashboard-06-chunk-0'>
                <CardHeader>
                  <CardTitle>Gallery Posts</CardTitle>
                  <CardDescription>
                    Manage your posts and view their performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className=''>
                        <TableHead className='hidden w-[100px] sm:table-cell'>
                          <span className='sr-only'>Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='hidden md:table-cell'>
                          View
                        </TableHead>
                        <TableHead className='hidden md:table-cell'>
                          Category
                        </TableHead>
                        <TableHead className='hidden md:table-cell'>
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className='sr-only'>Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className='hidden sm:table-cell  '>
                          <div className='lg:h-[150px] lg:w-[150px] h-[100px] w-[100px]'>
                            <Image
                              src='https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
                              height={150}
                              width={150}
                              className='h-full aspect-square object-cover'
                              alt='gallery-image'
                            />
                          </div>
                        </TableCell>
                        <TableCell className='font-medium '>
                          Laser Lemonade Machine
                        </TableCell>
                        <TableCell className='max-w-[150px]'>
                          <Badge variant='outline'>Draft</Badge>
                        </TableCell>
                        <TableCell className='hidden md:table-cell'>
                          <div className='flex lg:flex-row flex-col justify-start items-center gap-3'>
                            <div className='flex justify-center items-center gap-1'>
                              <MaterialSymbolIcon>favorite</MaterialSymbolIcon>
                              <span>2</span>
                            </div>
                            <div className='flex justify-center items-center gap-1'>
                              <MaterialSymbolIcon>
                                visibility
                              </MaterialSymbolIcon>
                              <span>2</span>
                            </div>
                            <div className='flex justify-center items-center gap-1'>
                              <MaterialSymbolIcon>comment</MaterialSymbolIcon>
                              <span>2</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='hidden md:table-cell '>
                          Artwork, Shortfilm,
                        </TableCell>
                        <TableCell className='hidden md:table-cell'>
                          2023-07-12 10:42 AM
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup='true'
                                size='icon'
                                variant='ghost'
                              >
                                <MaterialSymbolIcon
                                  variant='filled'
                                  className='opacity-100'
                                >
                                  more_vert
                                </MaterialSymbolIcon>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className=''>
                  <div className='text-xs text-muted-foreground'>
                    Showing <strong>1-10</strong> of <strong>32</strong> Posts
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
