'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function Close ({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <MaterialSymbolIcon
      variant='filled'
      className={cn(
        'text-base absolute right-2 top-0 cursor-pointer',
        className
      )}
      onClick={() => router.back()}
    >
      close
    </MaterialSymbolIcon>
  )
}
