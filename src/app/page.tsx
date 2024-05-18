import Image from 'next/image'
import landing_page from '../../public/images/landing-page.png'
import { SignInForm } from '@/components/custom/form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home () {
  return (
    <main className='h-full w-[90%] mx-auto grid grid-cols-2 gap-5  pt-10'>
      <div className='flex justify-end items-start'>
        <Image
          src={landing_page}
          alt='landing_page'
          height={500}
          width={500}
          className='w-[80%] object-contain'
        />
      </div>
      <div className='flex justify-start items-start'>
        <div
          className='flex flex-col justify-center items-center gap-4
      h-fit rounded-lg w-[60%] text-center bg-lightAccent border py-5 px-2'
        >
          <h1 className='text-xl font-semibold mx-auto'>
            Welcome to the Professional Artist's Community
          </h1>
          <div
            className='w-full rounded-md flex flex-col justify-start 
        items-stretch gap-4 px-3'
          >
            <SignInForm />
            <Separator />
            <Link href={'/sign-up'}>
              <Button variant={'success'} className='w-full'>
                Create New Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
