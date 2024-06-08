import React from 'react'

type FeedNav =
  | {
      type: 'link'
      id: string
      label: string
      href: string
      icon_name: string
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
    icon_name: 'person'
  },
  {
    type: 'link',
    id: 'edit-profile',
    label: 'Edit Profile',
    href: '/edit-profile',
    icon_name: 'edit'
  },
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
    icon_name: 'dashboard'
  },
  {
    type: 'link',
    id: 'manage-posts',
    label: 'Manage Posts',
    href: '/manage-posts',
    icon_name: 'manage_accounts'
  },
  {
    type: 'link',
    id: 'manage-jobs',
    label: 'Manage Jobs',
    href: '/manage-jobs',
    icon_name: 'manage_accounts'
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
    icon_name: 'settings'
  }
]
