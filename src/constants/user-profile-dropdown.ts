type ProfileItem = {
  id: string
  label: string
  href: string
}

export const profileItems: ProfileItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile'
  },
  {
    id: 'account',
    label: 'Account',
    href: '/account'
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    id: 'logout',
    label: 'Logout',
    href: '/logout'
  },
  {
    id: 'sign-in',
    label: 'Sign In',
    href: '/sign-in'
  }
]
