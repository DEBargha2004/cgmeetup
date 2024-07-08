import Image from 'next/image'
import background from '@/../public/images/cover-image.jpg'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function NewsLetter () {
  return (
    <div className='h-[200px] w-full overflow-hidden relative flex items-center justify-center bg-black/50'>
      <Image
        className='w-full h-full object-cover  absolute top-0 left-0 -z-10'
        src={background}
        height={300}
        width={1000}
        alt='backgroung-image'
      />
      <div className='w-3/4 grid md:grid-cols-2 mx-auto z-20 '>
        <div className='space-y-4'>
          <h1 className='text-3xl font-bold'>Newsletter</h1>
          <p className=''>
            Subscribe to the CGMeetup newsletter to get your weekly dose of
            news, updates, tips and special offers.
          </p>
        </div>
        <div className='flex justify-start items-center'>
          <form className='w-3/4 flex justify-start items-center gap-4 my-auto'>
            <Input placeholder='Email' />
            <Button>Subscribe</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
