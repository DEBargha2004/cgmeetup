import { PostComponent } from '@/components/custom/post'

export default function Post ({ params }: { params: { postId: string } }) {
  return (
    <>
      <div className='h-full absolute top-0 left-0 w-full scroller p-0 bg-darkAccent z-40'>
        <PostComponent params={params} />
      </div>
    </>
  )
}
