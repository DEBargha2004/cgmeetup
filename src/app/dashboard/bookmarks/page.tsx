import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Image from 'next/image'
import { MaterialSymbolIcon } from '@/components/custom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { FieldType } from '@/types/field-type'
import { Delete, MoreVert, Visibility } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'

const info_options: (FieldType & {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
})[] = [
  //   { label: 'Edit', value: 'edit', icon: 'edit' },
  { label: 'View', value: 'view', Icon: Visibility },
  { label: 'Delete', value: 'delete', Icon: Delete }
]
export default function BookmarksPage () {
  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4'>
        <header
          className=' z-30 flex md:h-14 items-center gap-4 bg-background px-4 
        sm:static sm:h-auto  sm:bg-transparent sm:px-6'
        >
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
                  <Link href='#'>Bookmarks</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className='p-4 sm:px-6 sm:py-0 space-y-5'>
          {/* <h1 className='text-2xl font-semibold'>Bookmarks</h1> */}
          <Card x-chunk='dashboard-06-chunk-0' className='bg-card'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-xl'>Bookmarks</CardTitle>
              <CardDescription>Manage your bookmarks.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className=''>
                    <TableHead className='w-[100px]'>
                      <span className='sr-only'>Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    {/* <TableHead>Status</TableHead> */}
                    {/* <TableHead className='hidden md:table-cell'>View</TableHead> */}
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
                  {Array.from({ length: 19 }, (_, i) => i).map(i => (
                    <TableRow className='hover:bg-darkAccent' key={i}>
                      <TableCell>
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

                      <TableCell className='hidden md:table-cell '>
                        Jobs
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
                              <MoreVert />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            {info_options.map(item => (
                              <DropdownMenuItem key={item.value}>
                                <item.Icon className='mr-2' />
                                {item.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className=''>
              <div className='text-xs text-muted-foreground'>
                Showing <strong>1-10</strong> of <strong>32</strong> Posts
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}
