import { SignInForm } from '@/components/custom/form'
import Link from 'next/link'

export default function SignInPage () {
  return (
    <div
      className='p-4 w-full flex flex-col justify-start items-stretch gap-4 
rounded-lg border bg-card'
    >
      <SignInForm />
      <div>
        <p className='text-sm'>
          Don't have an account?{' '}
          <Link href={'/sign-up'} className='text-primary'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
