type NavItem = {
  id: string
  label: string
  href: string
}

export const navItems: NavItem[] = [
  {
    id: 'gallery',
    label: 'Gallery',
    href: '/gallery'
  },
  {
    id: 'jobs',
    label: 'Jobs',
    href: '/jobs'
  },
  {
    id: 'artists',
    label: 'Artists',
    href: '/artists'
  },
  {
    id: 'company',
    label: 'Company',
    href: '/company'
  }
]
