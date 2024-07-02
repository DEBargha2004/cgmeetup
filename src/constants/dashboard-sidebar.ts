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
    icon_name: 'work',
    catch_routes: ['/dashboard/jobs', '/dashboard/jobs/create']
  },
  {
    type: 'link',
    label: 'News',
    id: 'news',
    href: '/dashboard/news',
    icon_name: 'newspaper',
    catch_routes: ['/dashboard/news', '/dashboard/news/create']
  },
  {
    type: 'separator'
  },
  {
    type: 'link',
    label: 'Bookmarks',
    href: '/dashboard/bookmarks',
    icon_name: 'bookmark',
    id: 'bookmarks',
    catch_routes: ['/dashboard/bookmarks']
  },
  {
    type: 'link',
    label: 'Notifications',
    href: '/dashboard/notifications',
    icon_name: 'notifications',
    id: 'notifications',
    catch_routes: ['/dashboard/notifications']
  },
  {
    type: 'separator'
  },
  {
    type: 'link',
    label: 'Edit Profile',
    href: '/dashboard/profile',
    icon_name: 'person',
    id: 'edit-profileprofile',
    catch_routes: [
      '/dashboard/profile',
      '/dashboard/job-preference',
      '/dashboard/work-experience',
      '/dashboard/highest-education',
      '/dashboard/bio'
    ]
  },
  {
    type: 'link',
    label: 'Edit Company',
    href: '/dashboard/company',
    icon_name: 'business',
    id: 'edit-company',
    catch_routes: ['/dashboard/company', '/dashboard/company/verification']
  },
  {
    type: 'link',
    label: 'Settings',
    id: 'settings',
    href: '/dashboard/settings',
    icon_name: 'settings',
    catch_routes: [
      '/dashboard/settings',
      '/dashboard/settings/notifications',
      '/dashboard/settings/blocking',
      '/dashboard/settings/payment'
    ]
  }
]
