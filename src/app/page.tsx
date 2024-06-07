import Image from 'next/image'
import Link from 'next/link'
import landing_image from '../../public/images/landing-page.png'
import { SignInSchemaType } from '@/schema/sign-in'
import { MainPageForm } from '@/components/custom'

export default function Home () {
  const handleFormSubmit = async (data: SignInSchemaType) => {
    'use server'
  }
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px]'>
      <div className='flex items-center justify-center col-span-2 mb-10'>
        <h1 className='text-2xl md:text-[40px] lg:text-[48px] font-bold text-center mt-10 w-2/3 md:w-1/2 leading-tight'>
          Welcome to the Professional Artist's Community
        </h1>
      </div>
      <div className='hidden lg:flex lg:justify-end items-start'>
        <div className='h-[90%] flex justify-end'>
          <Image
            src={landing_image}
            alt='Image'
            width='1920'
            height='1080'
            className='min-w-[350px] w-[50%] object-contain'
          />
        </div>
      </div>
      <div className='flex items-start justify-center lg:justify-start py-12'>
        <div className='lg:mx-20 grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-3xl font-semibold'>Signin</h1>
          </div>
          <MainPageForm handleSubmit={handleFormSubmit} />
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/sign-up' className='underline text-primary'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
