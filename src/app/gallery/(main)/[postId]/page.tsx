import { PostComponent } from '@/components/custom/post'

export default function Post ({ params }: { params: { postId: string } }) {
  return (
    <>
      <div className='h-full absolute top-0 left-0 w-full scroller p-0 bg-darkAccent z-40'>
        <PostComponent params={params} />
        {/* <div className='h-1/2 w-full bg-red-500'></div>
        <div className='h-1/2 w-full bg-green-500 relative'>
          <div className='w-full h-20 absolute bottom-0 bg-white flex items-end'>
            <h1 className='text-black'>ediuwd</h1>
          </div>
        </div> */}
      </div>
    </>
  )
}
