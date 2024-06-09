import { FieldsContainer, FormCard, SignInForm } from '@/components/custom/form'
import Link from 'next/link'

export default function SignInPage () {
  return (
    <FormCard heading='Sign In' subHeading='Sign In with your email or phone'>
      <FieldsContainer className='w-1/2'>
        <SignInForm />
        <div>
          <div>
            <p className='text-sm'>
              Don't have an account?{' '}
              <Link href={'/sign-up'} className='text-primary'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </FieldsContainer>
    </FormCard>
  )
}
