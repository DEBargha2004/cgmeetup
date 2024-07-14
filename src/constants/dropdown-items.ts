'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import { IconType } from '@/types/icon'
import { Bookmark, Chat, Dashboard, Edit, Image, Logout, Notifications, Person, SlowMotionVideo, Smartphone, Work } from '@mui/icons-material'

type ProfileItem =
  | {
      id: string
      label: string
      href: string
      type: 'link'
      Icon: IconType
    }
  | { type: 'separator' }

export const profileItems: ProfileItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    href: '/@tuit',
    type: 'link',
    Icon: Person
  },
  {
    type: 'link',
    id: 'edit-profile',
    label: 'Edit Profile',
    href: '/dashboard/profile',
    Icon: Edit
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    type: 'link',
    Icon: Dashboard
  },
  {
    type: 'link',
    id: 'feed',
    label: 'Feed',
    href: '/feed',
    Icon: Smartphone
  },
  {
    type: 'separator'
  },
  {
    type: 'link',
    id: 'chat',
    label: 'Chat',
    href: '/chat',
    Icon: Chat
  },
  {
    type: 'link',
    label: 'Bookmarks',
    id: 'bookmarks',
    href: '/dashboard/bookmarks',
    Icon: Bookmark
  },
  {
    type: 'link',
    id: 'notifications',
    href: '/dashboard/notifications',
    label: 'Notifications',
    Icon: Notifications
  },
  {
    type: 'separator'
  },
  {
    id: 'logout',
    label: 'Logout',
    href: '/logout',
    type: 'link',
    Icon: Logout
  }
]

export const uploadButtonItems: ProfileItem[] = [
  {
    id: 'add-artwork',
    label: 'Add Artwork',
    href: '/dashboard/gallery/create',
    type: 'link',
    Icon: Image
  },
  {
    type: 'link',
    id: 'add-demoreel',
    label: 'Add DemoReel',
    href: '/dashboard/gallery/create',
    Icon: SlowMotionVideo
  },
  {
    type: 'link',
    id: 'add-making-of',
    label: 'Add Making Of',
    href: '/dashboard/gallery/create',
    Icon: SlowMotionVideo
  },
  {
    type: 'link',
    id: 'add-short-film',
    label: 'Add Short Film',
    href: '/dashboard/gallery/create',
    Icon: SlowMotionVideo
  },

  {
    type: 'separator'
  },
  {
    type: 'link',
    id: 'add-job',
    label: 'Add Job',
    href: '/dashboard/jobs/create',
    Icon: Work
  }
]
