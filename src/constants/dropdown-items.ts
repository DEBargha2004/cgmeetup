'use client'

import { useGlobalAppStore } from '@/store/global-app-store'

type ProfileItem =
  | {
      id: string
      label: string
      href: string
      type: 'link'
      icon: string
    }
  | { type: 'separator' }

export const profileItems: ProfileItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    href: '/@tuit',
    type: 'link',
    icon: 'person'
  },
  {
    type: 'link',
    id: 'edit-profile',
    label: 'Edit Profile',
    href: '/dashboard/profile',
    icon: 'edit'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    type: 'link',
    icon: 'dashboard'
  },
  {
    type: 'link',
    id: 'feed',
    label: 'Feed',
    href: '/feed',
    icon: 'smartphone'
  },
  {
    type: 'separator'
  },
  {
    type: 'link',
    id: 'chat',
    label: 'Chat',
    href: '/chat',
    icon: 'chat'
  },
  {
    type: 'link',
    label: 'Bookmarks',
    id: 'bookmarks',
    href: '/dashboard/bookmarks',
    icon: 'bookmark'
  },
  {
    type: 'link',
    id: 'notifications',
    href: '/dashboard/notifications',
    label: 'Notifications',
    icon: 'notifications'
  },
  {
    type: 'separator'
  },
  {
    id: 'logout',
    label: 'Logout',
    href: '/logout',
    type: 'link',
    icon: 'logout'
  }
]

export const uploadButtonItems: ProfileItem[] = [
  {
    id: 'add-artwork',
    label: 'Add Artwork',
    href: '/dashboard/gallery/create',
    type: 'link',
    icon: 'photo'
  },
  {
    type: 'link',
    id: 'add-demoreel',
    label: 'Add DemoReel',
    href: '/dashboard/gallery/create',
    icon: 'slow_motion_video'
  },
  {
    type: 'link',
    id: 'add-making-of',
    label: 'Add Making Of',
    href: '/dashboard/gallery/create',
    icon: 'slow_motion_video'
  },
  {
    type: 'link',
    id: 'add-short-film',
    label: 'Add Short Film',
    href: '/dashboard/gallery/create',
    icon: 'slow_motion_video'
  },

  {
    type: 'separator'
  },
  {
    type: 'link',
    id: 'add-job',
    label: 'Add Job',
    href: '/dashboard/jobs/create',
    icon: 'work'
  }
]
