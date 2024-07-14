'https://cdnb.artstation.com/p/users/covers/000/618/337/default/fac6732bc80210accc4f78774225a1a1.jpg?1659954166'

import { IconType } from '@/types/icon'
import {
  Dashboard,
  Edit,
  ManageAccounts,
  Person,
  Settings
} from '@mui/icons-material'

type FeedNav =
  | {
      type: 'link'
      id: string
      label: string
      href: string
      Icon: IconType
    }
  | {
      type: 'separator'
    }
  | {
      type: 'header'
      label: string
    }

export const feedNavItems: FeedNav[] = [
  // {
  //   type: 'header',
  //   label: 'Discover'
  // },
  // {
  //   type: 'link',
  //   id: 'explore',
  //   label: 'Explore',
  //   href: '/feed',
  //   icon_name: 'explore'
  // },
  // {
  //   type: 'link',
  //   id: 'trending',
  //   label: 'Trending',
  //   href: '/trending',
  //   icon_name: 'trending_up'
  // },
  // {
  //   type: 'link',
  //   id: 'latest',
  //   label: 'Latest',
  //   href: '/latest',
  //   icon_name: 'new_releases'
  // },
  // {
  //   type: 'link',
  //   id: 'search',
  //   label: 'Search',
  //   href: '/search',
  //   icon_name: 'search'
  // },
  // {
  //   type: 'separator'
  // },
  // {
  //   type: 'link',
  //   id: 'chat',
  //   label: 'Chat',
  //   href: '/chat',
  //   icon_name: 'chat'
  // },
  // {
  //   type: 'link',
  //   id: 'bookmarks',
  //   label: 'Bookmarks',
  //   href: '/bookmarks',
  //   icon_name: 'bookmark'
  // },
  // {
  //   type: 'link',
  //   id: 'notifications',
  //   label: 'Notifications',
  //   href: '/notifications',
  //   icon_name: 'notifications'
  // },
  // {
  //   type: 'link',
  //   id: 'liked',
  //   label: 'Liked',
  //   href: '/liked',
  //   icon_name: 'favorite'
  // },
  //My Profile
  // Edit Profile
  // Edit Bio
  {
    type: 'separator'
  },
  {
    type: 'link',
    id: 'profile',
    label: 'My Profile',
    href: '/profile',
    Icon: Person
  },
  {
    type: 'link',
    id: 'edit-profile',
    label: 'Edit Profile',
    href: '/edit-profile',
    Icon: Edit
  },
  // {
  //   type: 'link',
  //   id: 'edit-company-profile',
  //   label: 'Edit Company Profile',
  //   href: '/edit-profile',
  //   icon_name: 'edit'
  // },
  // {
  //   type: 'link',
  //   id: 'edit-bio',
  //   label: 'Edit Bio',
  //   href: '/edit-bio',
  //   icon_name: 'edit'
  // },
  {
    type: 'separator'
  },
  // Dashboard
  // Manage Posts
  // Manage Jobs
  {
    type: 'link',
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    Icon: Dashboard
  },
  {
    type: 'link',
    id: 'manage-posts',
    label: 'Manage Posts',
    href: '/manage-posts',
    Icon: ManageAccounts
  },
  {
    type: 'link',
    id: 'manage-jobs',
    label: 'Manage Jobs',
    href: '/manage-jobs',
    Icon: ManageAccounts
  },
  {
    type: 'separator'
  },
  // Settings
  {
    type: 'link',
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    Icon: Settings
  }
]
