import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Link from 'next/link'

export default function Pages () {
  const pages: { label: string; href: string }[] = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Gallery',
      href: '/gallery'
    },
    {
      label: 'Jobs',
      href: '/jobs'
    },
    {
      label: 'Gallery post',
      href: '/galley/post/227842'
    },
    {
      label: 'Job Post',
      href: '/job-post/3'
    },
    {
      label: 'Feed',
      href: '/feed'
    },
    {
      label: 'Chat',
      href: '/chat'
    },
    {
      label: 'Profile - Posts',
      href: '/123'
    },
    {
      label: 'Profile - Jobs',
      href: '/123/jobs'
    },
    { label: 'Profile - About', href: '/123/about' },
    {
      label: 'Profile - Following',
      href: '/123/following'
    },
    {
      label: 'Profile - Followers',
      href: '/123/followers'
    },
    // Add more profile pages here
    {
      label: 'Dashboard',
      href: '/dashboard'
    },
    {
      label: 'Dashboard - Gallery',
      href: '/dashboard/gallery'
    },
    {
      label: 'Dashboard - Gallery - Create',
      href: '/dashboard/gallery/create'
    },
    {
      label: 'Dashboard - Jobs',
      href: '/dashboard/jobs'
    },
    {
      label: 'Dashboard - Jobs - Create',
      href: '/dashboard/jobs/create'
    }
  ]
  return (
    <div className='p-2'>
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>sl no</TableHead>
              <TableHead>label</TableHead>
              <TableHead>href</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{page.label}</TableCell>
                <TableCell>
                  <Link href={page.href}>{page.href}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </div>
  )
}
