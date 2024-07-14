'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import CloseIcon from '@mui/icons-material/Close'

export default function Close ({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <CloseIcon
      className={cn('h-4 cursor-pointer', className)}
      onClick={() => router.back()}
    />
  )
}
