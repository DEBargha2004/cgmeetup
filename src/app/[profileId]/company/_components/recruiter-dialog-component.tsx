import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { getShortendName } from '@/functions'
import { cn } from '@/lib/utils'
import profile from '@/../public/images/profile-1.jpg'
import { MaterialSymbolIcon } from '@/components/custom'
import Link from 'next/link'
import { DialogClose } from '@/components/ui/dialog'

export default function RecruiterDialogComponent () {
  return (
    <div className='flex flex-col justify-start items-stretch gap-3 relative'>
      <div className='flex flex-col justify-start items-center gap-1 text-center'>
        <Avatar className='h-24 w-24 border-2 border-white'>
          <AvatarImage src={profile.src} />
          <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
        </Avatar>
        <div className='flex justify-center items-center gap-1'>
          <h1 className='text-lg'>John Doe</h1>
          <Link href={'/dashboard/profile'}>
            <MaterialSymbolIcon className='text-sm text-primary'>
              edit
            </MaterialSymbolIcon>
          </Link>
        </div>
        <p className='text-xs'>Recruiter</p>
      </div>
      <div className='space-y-2'>
        <ProfileInfoCard>
          <Heading>Personal Info</Heading>
          <Body>John Doe</Body>
        </ProfileInfoCard>
        <ProfileInfoCard>
          <Heading>Email</Heading>
          <Body>lNn2I@example.com</Body>
        </ProfileInfoCard>
        <ProfileInfoCard>
          <Heading>Mobile Number</Heading>
          <Body>+91 1212345678</Body>
        </ProfileInfoCard>
        <ProfileInfoCard>
          <Heading>My Bio</Heading>
          <Body>Best in Logistics IT</Body>
        </ProfileInfoCard>
        <ProfileInfoCard>
          <Heading>Role</Heading>
          <Body>Recruiter</Body>
        </ProfileInfoCard>
      </div>
      <DialogClose className='absolute top-2 right-2'>
        <div className='h-8 w-8 rounded-full bg-lightAccent/70 grid place-content-center'>
          <MaterialSymbolIcon className='text-sm'>close</MaterialSymbolIcon>
        </div>
      </DialogClose>
    </div>
  )
}

function ProfileInfoCard ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return <Card className={cn('p-3 bg-transparent', className)}>{children}</Card>
}

const Heading = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => <h1 className={cn('text-base', className)}>{children}</h1>

const Body = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => <div className={cn('text-xs opacity-70', className)}>{children}</div>
