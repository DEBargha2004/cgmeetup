'use client'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Close as CloseIcon } from '@mui/icons-material'

export default function Close ({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <CloseIcon
      className={cn('cursor-pointer', className)}
      onClick={() => {
        if (window.history.length > 1) router.back()
        else {
          router.replace('/')
        }
      }}
    />
  )
}
