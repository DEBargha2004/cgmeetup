type NavItem = {
  id: string
  label: string
  href: string
  icon: string
  catch_routes?: string[]
}

export const navItems: NavItem[] = [
  {
    id: 'gallery',
    label: 'Gallery',
    href: '/gallery',
    icon: 'imagesmode',
    catch_routes: [
      '/gallery/trending',
      '/gallery/latest',
      '/gallery',
      '/gallery/featured'
    ]
  },
  {
    id: 'jobs',
    label: 'Jobs',
    href: '/jobs',
    icon: 'work',
    catch_routes: ['/jobs', '/jobs/latest', '/jobs/trending', '/jobs/featured']
  },
  {
    id: 'artists',
    label: 'Artists',
    href: '/artists',
    icon: 'person',
    catch_routes: ['/artists', '/artists/latest', '/artists/trending']
  },
  {
    id: 'company',
    label: 'Companies',
    href: '/companies',
    icon: 'apartment',
    catch_routes: ['/companies', '/companies/latest', '/companies/trending']
  }
]
