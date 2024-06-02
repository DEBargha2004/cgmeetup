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
    href: '/profile',
    type: 'link'
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
  },
  {
    type: 'link',
    id: 'otp',
    label: 'OTP',
    href: '/otp'
  },
  {
    type: 'link',
    id: 'phone-number',
    label: 'Phone Number',
    href: '/phone-number'
  },
  {
    type: 'link',
    id: 'password',
    label: 'Password',
    href: '/password'
  }
]

export const uploadButtonItems: ProfileItem[] = [
  {
    id: 'add-artwork',
    label: 'Add Artwork',
    href: '/add-artwork',
    type: 'link'
  },
  {
    type: 'link',
    id: 'add-demoreel',
    label: 'Add DemoReel',
    href: '/add-demoreel'
  },
  {
    type: 'link',
    id: 'add-making-of',
    label: 'Add Making Of',
    href: '/add-making-of'
  },
  {
    type: 'link',
    id: 'add-short-film',
    label: 'Add Short Film',
    href: '/add-short-film'
  },
  {
    type: 'separator'
  },
  {
    type: 'link',
    id: 'add-job',
    label: 'Add Job',
    href: '/add-job'
  }
]
