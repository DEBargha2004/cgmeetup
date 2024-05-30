type SidebarItem =
  | {
      type: 'link'
      id: string
      label: string
      href: string
      icon_name: string
      catch_routes?: string[]
    }
  | {
      type: 'separator'
    }
  | {
      type: 'header'
      label: string
    }

export const dashboardSidebar: SidebarItem[] = [
  {
    type: 'link',
    label: 'Dashboard',
    id: 'dashboard',
    href: '/dashboard',
    icon_name: 'dashboard'
  },
  {
    type: 'link',
    label: 'Gallery',
    id: 'gallery',
    href: '/dashboard/gallery',
    icon_name: 'image',
    catch_routes: ['/dashboard/gallery', '/dashboard/gallery/create']
  },
  {
    type: 'link',
    label: 'Jobs',
    id: 'jobs',
    href: '/dashboard/jobs',
    icon_name: 'work'
  }
]
