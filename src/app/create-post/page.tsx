'use client'

import { PostCreateDialog } from '@/components/custom/global-dialog'
import { useGlobalAppStore } from '@/store/global-app-store'
import { useEffect } from 'react'

export default function Page () {
  const { setPostDialogState, postDialogState } = useGlobalAppStore()
  useEffect(() => {
    setPostDialogState(true)
    return () => {
      setPostDialogState(false)
    }
  }, [])
  console.log(postDialogState)
  return <PostCreateDialog />
}
