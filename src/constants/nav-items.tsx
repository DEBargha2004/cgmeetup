type NavItem = {
  id: string
  label: string
  href: string
  icon: string
}

export const navItems: NavItem[] = [
  {
    id: 'gallery',
    label: 'Gallery',
    href: '/gallery',
    icon: 'imagesmode'
  },
  {
    id: 'jobs',
    label: 'Jobs',
    href: '/jobs',
    icon: 'work'
  },
  {
    id: 'artists',
    label: 'Artists',
    href: '/artists',
    icon: 'person'
  },
  {
    id: 'company',
    label: 'Companies',
    href: '/companies',
    icon: 'apartment'
  }
]
