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
    id: 'account',
    label: 'Account',
    href: '/account',
    type: 'link'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    type: 'link'
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
