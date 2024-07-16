'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function NavigationHelper () {
  const pathname = usePathname()
  const { setSidebarState, setDashboardSidebarState } = useGlobalAppStore()
  useEffect(() => {
    setSidebarState(false)
    setDashboardSidebarState(false)
  }, [pathname])

  return null
}
