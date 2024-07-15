import { PostComponent } from '@/components/custom/post'
// import { redirect } from 'next/navigation'

// const ignoredRoutes: string[] = [
//   '/gallery/trending',
//   '/gallery/featured',
//   '/gallery/latest'
// ]

export default function Post ({
  params: { postId }
}: {
  params: { postId: string }
}) {
  // if (ignoredRoutes.includes(`/gallery/${postId}`))
  //   redirect(`/gallery/${postId}`)
  return (
    <div className='h-full absolute -top-0 left-0 w-full scroller p-0 bg-darkAccent/80 z-40'>
      <PostComponent params={{ postId }} />
    </div>
  )
}
