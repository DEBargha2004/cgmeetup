'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function NavigationHelper () {
  const pathname = usePathname()
  const { setSidebarState, setDashboardSidebarState } = useGlobalAppStore()

  // const previousAuthDialogState = usePrevious(authDialogState)
  // const previousJobDialogState = usePrevious(jobDialogState)
  // const previousPostDialogState = usePrevious(postDialogState)

  // const handleDialogState = (hash: string) => {
  //   if (hash === dialogHash.auth) {
  //     setAuthDialogState(true)
  //   } else {
  //     setAuthDialogState(false)
  //   }

  //   if (hash === dialogHash.postCreate) {
  //     setPostDialogState(true)
  //   } else {
  //     setPostDialogState(false)
  //   }

  //   if (hash === dialogHash.jobCreate) {
  //     setJobDialogState(true)
  //   } else {
  //     setJobDialogState(false)
  //   }
  // }
  // const handleHashChange = (e: HashChangeEvent) => {
  //   const hash = e.newURL.replaceAll(e.oldURL, '')
  //   handleDialogState(hash)
  // }

  useEffect(() => {
    setSidebarState(false)
    setDashboardSidebarState(false)
  }, [pathname])

  // useEffect(() => {
  //   handleDialogState(window.location.hash)
  //   window.addEventListener('hashchange', handleHashChange)
  //   return () => {
  //     window.removeEventListener('hashchange', handleHashChange)
  //   }
  // }, [])

  return null
}
