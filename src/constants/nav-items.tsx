type NavItem =
  | {
      type: 'item'
      id: string
      label: string
      href: string
      icon: string
      catch_routes?: string[]
    }
  | { type: 'separator' }

export const navItems: NavItem[] = [
  {
    type: 'item',
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
    type: 'item',
    id: 'jobs',
    label: 'Jobs',
    href: '/jobs',
    icon: 'work',
    catch_routes: ['/jobs', '/jobs/latest', '/jobs/trending', '/jobs/featured']
  },
  {
    type: 'item',
    id: 'news',
    label: 'News',
    href: '/news',
    icon: 'newspaper',
    catch_routes: ['/news']
  },
  {
    type: 'item',
    id: 'artists',
    label: 'Artists',
    href: '/artists',
    icon: 'person',
    catch_routes: ['/artists', '/artists/latest', '/artists/trending']
  },
  {
    type: 'item',
    id: 'company',
    label: 'Companies',
    href: '/companies',
    icon: 'apartment',
    catch_routes: ['/companies', '/companies/latest', '/companies/trending']
  }
]

export const extraNavItems: NavItem[] = [
  {
    type: 'separator'
  },
  {
    type: 'item',
    id: 'notifications',
    label: 'Notifications',
    href: '/notifications',
    icon: 'notifications'
  },
  {
    type: 'item',
    id: 'chat',
    href: '/chat',
    label: 'Chat',
    icon: 'chat'
  },
  {
    type: 'item',
    id: 'cart',
    href: '',
    label: 'Cart',
    icon: 'add_shopping_cart'
  }
]
