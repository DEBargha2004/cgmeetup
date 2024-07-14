'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import CloseIcon from '@mui/icons-material/Close'

export default function Close ({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <CloseIcon
      className={cn('h-4 absolute right-2 top-0 cursor-pointer', className)}
      onClick={() => router.back()}
    />
  )
}
