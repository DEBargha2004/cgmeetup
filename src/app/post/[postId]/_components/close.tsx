'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { useRouter } from 'next/navigation'

export default function Close () {
  const router = useRouter()
  return (
    <MaterialSymbolIcon
      className='text-base absolute right-2 top-0 cursor-pointer'
      onClick={() => router.back()}
    >
      close
    </MaterialSymbolIcon>
  )
}
