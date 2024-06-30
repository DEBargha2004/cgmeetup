'use client'

import { useGlobalAppStore } from '@/store/global-app-store'

type ProfileItem =
  | {
      id: string
      label: string
      href: string
      type: 'link'
    }
  | { type: 'separator' }

export const profileItems: ProfileItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    href: '/@tuit',
    type: 'link'
  },
  {
    type: 'link',
    id: 'company',
    label: 'Company',
    href: '/@tuit/company'
  },
  {
    id: 'pages',
    label: 'Pages',
    href: '/pages',
    type: 'link'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    type: 'link'
  },
  {
    type: 'link',
    id: 'feed',
    label: 'Feed',
    href: '/feed'
  },
  {
    type: 'link',
    id: 'chat',
    label: 'Chat',
    href: '/chat'
  },

  {
    type: 'separator'
  },
  {
    id: 'logout',
    label: 'Logout',
    href: '/logout',
    type: 'link'
  },

  {
    id: 'sign-in',
    label: 'Sign In',
    href: '/sign-in',
    type: 'link'
  }
]

export const uploadButtonItems: ProfileItem[] = [
  {
    id: 'add-artwork',
    label: 'Add Artwork',
    href: '/dashboard/gallery/create',
    type: 'link'
  },
  {
    type: 'link',
    id: 'add-demoreel',
    label: 'Add DemoReel',
    href: '/dashboard/gallery/create'
  },
  {
    type: 'link',
    id: 'add-making-of',
    label: 'Add Making Of',
    href: '/dashboard/gallery/create'
  },
  {
    type: 'link',
    id: 'add-short-film',
    label: 'Add Short Film',
    href: '/dashboard/gallery/create'
  },

  {
    type: 'separator'
  },
  {
    type: 'link',
    id: 'add-job',
    label: 'Add Job',
    href: '/dashboard/jobs/create'
  }
]
