'use client'

import { JobCreateDialog } from '@/components/custom/global-dialog'
import { useGlobalAppStore } from '@/store/global-app-store'
import { useEffect } from 'react'

export default function Page () {
  const { setJobDialogState } = useGlobalAppStore()
  useEffect(() => {
    setJobDialogState(true)
    return () => {
      setJobDialogState(false)
    }
  }, [])
  return <JobCreateDialog />
}
