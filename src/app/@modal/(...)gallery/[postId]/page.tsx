import { PostComponent } from '@/components/custom/post'

export default function Post ({
  params: { postId }
}: {
  params: { postId: string }
}) {
  return (
    <div className='h-screen absolute -top-0 left-0 w-full scroller p-0 bg-darkAccent/80'>
      <PostComponent params={{ postId }} />
    </div>
  )
}
