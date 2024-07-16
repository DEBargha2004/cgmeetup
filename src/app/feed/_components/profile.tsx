import Image from 'next/image'

export default function Profile () {
  return (
    <section className='w-full max-w-[250px] flex flex-col justify-between items-center '>
      <div className='px-2' id='profile-image'>
        <Image
          src={
            'https://cdnb.artstation.com/p/users/avatars/000/809/063/large/ffeb4741d6275c9a5f8e78eee0703a0f.jpg?1642309641'
          }
          alt='profile-image'
          height={100}
          width={100}
          className='object-cover rounded-full lg:h-[100px] lg:w-[100px] w-10 h-10 border-2 border-white 
        box-content'
        />
      </div>
      <div
        id='profile-description'
        className='lg:flex hidden flex-col justify-start items-center w-full gap-2'
      >
        <div className='flex justify-start items-center pt-2'>
          <h1 className='text-lg font-semibold'>Narendra Kumar</h1>
          {/* <Badge className='bg-primary rounded-full'>PRO</Badge> */}
        </div>
        <div className='flex justify-between items-end text-center'>
          <div>
            <p className='text-sm opacity-70 hover:text-primary cursor-pointer'>
              @narendrakumar
            </p>
            <p className='text-sm opacity-70'>Artist</p>
            <p className='text-sm opacity-70'>Rome,Italy</p>
          </div>
        </div>
      </div>
    </section>
  )
}
