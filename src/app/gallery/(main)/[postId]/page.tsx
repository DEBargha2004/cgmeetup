import { PostComponent } from '@/components/custom/post'

export default function Post ({ params }: { params: { postId: string } }) {
  return (
    <>
      <div className='h-screen absolute -top-2 left-0 w-full scroller p-0 bg-darkAccent'>
        <PostComponent params={params} />
      </div>
    </>
  )
}
