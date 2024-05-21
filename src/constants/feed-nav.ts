type FeedNav =
  | {
      type: 'link'
      id: string
      label: string
      href: string
    }
  | {
      type: 'separator'
    }
  | {
      type: 'header'
      label: string
    }

export const feedNavItems: FeedNav[] = [
  {
    type: 'header',
    label: 'Discover'
  },
  {
    type: 'link',
    id: 'explore',
    label: 'Explore',
    href: '/feed'
  },
  {
    type: 'link',
    id: 'trending',
    label: 'Trending',
    href: '/trending'
  },
  {
    type: 'link',
    id: 'latest',
    label: 'Latest',
    href: '/latest'
  },
  {
    type: 'link',
    id: 'search',
    label: 'Search',
    href: '/search'
  },
  {
    type: 'separator'
  },
  {
    type: 'link',
    id: 'chat',
    label: 'Chat',
    href: '/chat'
  },
  {
    type: 'link',
    id: 'bookmarks',
    label: 'Bookmarks',
    href: '/bookmarks'
  },
  {
    type: 'link',
    id: 'notifications',
    label: 'Notifications',
    href: '/notifications'
  },
  {
    type: 'link',
    id: 'liked',
    label: 'Liked',
    href: '/liked'
  },
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
    href: '/profile'
  },
  {
    type: 'link',
    id: 'edit-profile',
    label: 'Edit Profile',
    href: '/edit-profile'
  },
  {
    type: 'link',
    id: 'edit-bio',
    label: 'Edit Bio',
    href: '/edit-bio'
  },
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
    href: '/dashboard'
  },
  {
    type: 'link',
    id: 'manage-posts',
    label: 'Manage Posts',
    href: '/manage-posts'
  },
  {
    type: 'link',
    id: 'manage-jobs',
    label: 'Manage Jobs',
    href: '/manage-jobs'
  },
  {
    type: 'separator'
  },
  // Settings
  {
    type: 'link',
    id: 'settings',
    label: 'Settings',
    href: '/settings'
  }
]
