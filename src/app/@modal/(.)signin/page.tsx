'use client'

import { AuthDialog } from '@/components/custom/global-dialog'
import { useGlobalAppStore } from '@/store/global-app-store'
import { useEffect } from 'react'

export default function Page () {
  const { setAuthDialogState } = useGlobalAppStore()

  useEffect(() => {
    setAuthDialogState(true)
    return () => {
      setAuthDialogState(false)
    }
  }, [])
  return <AuthDialog />
}
