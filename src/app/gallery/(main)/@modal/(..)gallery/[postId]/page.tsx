import { Dialog, DialogContent } from '@/components/ui/dialog'
import { PostComponent } from '@/components/custom/post'

export default function Post ({
  params: { postId }
}: {
  params: { postId: string }
}) {
  return (
    <Dialog open>
      <DialogContent
        className='h-screen max-w-full scroller p-0 bg-darkAccent'
        hideCloseButton
      >
        <PostComponent params={{ postId }} />
      </DialogContent>
    </Dialog>
  )
}
