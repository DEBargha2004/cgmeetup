import { IconType } from '@/types/icon'
import {
  AddShoppingCart,
  Apartment,
  Chat,
  Image,
  Newspaper,
  Notifications,
  Person,
  Work
} from '@mui/icons-material'

type NavItem =
  | {
      type: 'item'
      id: string
      label: string
      href: string
      Icon: IconType
      catch_routes?: string[]
    }
  | { type: 'separator' }

export const navItems: NavItem[] = [
  {
    type: 'item',
    id: 'gallery',
    label: 'Gallery',
    href: '/gallery',
    Icon: Image,
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
    Icon: Work,
    catch_routes: ['/jobs', '/jobs/latest', '/jobs/trending', '/jobs/featured']
  },
  {
    type: 'item',
    id: 'news',
    label: 'News',
    href: '/news',
    Icon: Newspaper,
    catch_routes: ['/news']
  },
  // {
  //   type: 'item',
  //   id: 'artists',
  //   label: 'Artists',
  //   href: '/artists',
  //   Icon: Person,
  //   catch_routes: ['/artists', '/artists/latest', '/artists/trending']
  // },
  // {
  //   type: 'item',
  //   id: 'company',
  //   label: 'Companies',
  //   href: '/companies',
  //   Icon: Apartment,
  //   catch_routes: ['/companies', '/companies/latest', '/companies/trending']
  // }
  {
    type: 'item',
    id: 'marketplace',
    href: '/marketplace',
    label: 'Marketplace',
    Icon: AddShoppingCart
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
    Icon: Notifications
  },
  {
    type: 'item',
    id: 'chat',
    href: '/chat',
    label: 'Chat',
    Icon: Chat
  },
  {
    type: 'item',
    id: 'cart',
    href: '',
    label: 'Cart',
    Icon: AddShoppingCart
  }
]
