import Image from 'next/image'
import landing_page from '../../public/images/landing-page.png'
import { SignInForm } from '@/components/custom/form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home () {
  return (
    <main className='h-[70%] w-[90%] mx-auto grid items-center grid-cols-2 gap-5 pt-10'>
      <div className='flex justify-end items-center'>
        <Image
          src={landing_page}
          alt='landing_page'
          height={500}
          width={500}
          className='w-[50%] min-w-[300px] object-contain'
        />
      </div>
      <div className='flex justify-start items-start min-h-4/5'>
        <div
          className='flex flex-col justify-center items-start gap-12
      h-fit rounded-lg w-[50%] text-center px-2'
        >
          <div
            className='w-full h-fit rounded-lg flex flex-col justify-start 
        items-stretch gap-4 px-3 py-4 border border-border bg-lightAccent'
          >
            <h1 className='text-lg font-semibold mx-auto'>
              Welcome to the Professional Artist's Community
            </h1>
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
