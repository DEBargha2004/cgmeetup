import { cn } from '@/lib/utils'
import Image from 'next/image'
import projects from '@/../public/data/projects.json'
import { MaterialSymbolIcon } from '@/components/custom'
import Link from 'next/link'
import Close from './_components/close'
import vertical from '@/../public/images/dog-vertical.webp'
import horizontal from '@/../public/images/dog.webp'
import { HTMLProps } from 'react'
import Sidebar from './_components/sidebar'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { PostComponent } from '@/components/custom/post'

export default function Post ({
  params: { postId }
}: {
  params: { postId: string }
}) {
  const project_idx = projects.data.findIndex(
    project => project.id === Number(postId)
  )

  const project = projects.data[project_idx] || {}

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

// function Navigator ({
//   icon,
//   className,
//   ...props
// }: { icon: string } & HTMLProps<HTMLDivElement>) {
//   return (
//     <div
//       className={cn(
//         `h-20 aspect-square absolute top-1/2 -translate-y-1/2 flex justify-center items-center px-4
//         hover:bg-lightAccent/20 transition-all cursor-pointer`,
//         className
//       )}
//       {...props}
//     >
//       <MaterialSymbolIcon className='text-4xl opacity-100'>
//         {icon}
//       </MaterialSymbolIcon>
//     </div>
//   )
// }

// function PostImage ({
//   children,
//   className
// }: {
//   className?: string
//   children?: React.ReactNode
// }) {
//   return (
//     <div className={cn('lg:h-full lg:w-full snap-center shrink-0', className)}>
//       {children}
//     </div>
//   )
// }
