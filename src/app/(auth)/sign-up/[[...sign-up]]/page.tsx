import { SignUpForm } from '@/components/custom/form'
import Link from 'next/link'

export default function SignUpPage () {
  return (
    <div
      className='p-4 w-full flex flex-col justify-start items-stretch gap-4 
    rounded-lg bg-transparent border'
    >
      <SignUpForm />
      <div>
        <p className='text-sm'>
          Already have an account?{' '}
          <Link href={'/sign-in'} className='text-primary'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
