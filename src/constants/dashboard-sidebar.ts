import {
  Apartment,
  Bookmark,
  Dashboard,
  Image,
  Newspaper,
  Notifications,
  Person,
  School,
  Sell,
  Settings,
  Store,
  Work
} from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type SidebarItem =
  | {
      type: "link";
      id: string;
      label: string;
      href: string;
      Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
      };
      catch_routes?: string[];
    }
  | {
      type: "separator";
    }
  | {
      type: "header";
      label: string;
    };

export const dashboardSidebar: SidebarItem[] = [
  {
    type: "link",
    label: "Dashboard",
    id: "dashboard",
    href: "/dashboard",
    Icon: Dashboard
  },
  {
    type: "link",
    label: "Gallery",
    id: "gallery",
    href: "/dashboard/gallery",
    Icon: Image,
    catch_routes: ["/dashboard/gallery", "/dashboard/gallery/create"]
  },
  {
    type: "link",
    label: "Jobs",
    id: "jobs",
    href: "/dashboard/jobs",
    Icon: Work,
    catch_routes: ["/dashboard/jobs", "/dashboard/jobs/create"]
  },
  {
    type: "link",
    label: "News",
    id: "news",
    href: "/dashboard/news",
    Icon: Newspaper,
    catch_routes: ["/dashboard/news", "/dashboard/news/create"]
  },
  {
    type: "link",
    label: "Marketplace",
    id: "marketplace",
    href: "/dashboard/marketplace",
    Icon: Store,
    catch_routes: ["/dashboard/marketplace", "/dashboard/marketplace/create"]
  },
  {
    type: "link",
    label: "Tutorials",
    id: "tutorials",
    href: "/dashboard/tutorials",
    Icon: School,
    catch_routes: ["/dashboard/tutorials", "/dashboard/tutorials/create"]
  },
  {
    type: "separator"
  },
  {
    type: "link",
    label: "Bookmarks",
    href: "/dashboard/bookmarks",
    Icon: Bookmark,
    id: "bookmarks",
    catch_routes: ["/dashboard/bookmarks"]
  },
  {
    type: "link",
    label: "Notifications",
    href: "/dashboard/notifications",
    Icon: Notifications,
    id: "notifications",
    catch_routes: ["/dashboard/notifications"]
  },
  {
    type: "link",
    label: "My Sales",
    id: "my-sales",
    href: "/dashboard/my-sales",
    Icon: Sell,
    catch_routes: [
      "/dashboard/my-sales",
      "/dashboard/my-sales/monthly-summary",
      "/dashboard/my-sales/payment-information"
    ]
  },
  {
    type: "separator"
  },
  {
    type: "link",
    label: "Edit Profile",
    href: "/dashboard/profile",
    Icon: Person,
    id: "edit-profile",
    catch_routes: [
      "/dashboard/profile",
      "/dashboard/job-preference",
      "/dashboard/work-experience",
      "/dashboard/education",
      "/dashboard/bio",
      "/dashboard/verification",
      "/dashboard/productions",
      "/dashboard/resume",
      "/dashboard/demoreel",
      "/dashboard/links",
      "/dashboard/skills",
      "/dashboard/softwares"
    ]
  },
  {
    type: "link",
    label: "Edit Company",
    href: "/dashboard/company",
    Icon: Apartment,
    id: "edit-company",
    catch_routes: [
      "/dashboard/company",
      "/dashboard/company/verification",
      "/dashboard/company/productions",
      "/dashboard/company/demoreel",
      "/dashboard/company/links",
      "/dashboard/company/skills",
      "/dashboard/company/softwares",
      "/dashboard/company/bio",
      "/dashboard/company/address",
      "/dashboard/company/recruiters",
      "/dashboard/company/new"
    ]
  },
  {
    type: "link",
    label: "Settings",
    id: "settings",
    href: "/dashboard/settings",
    Icon: Settings,
    catch_routes: [
      "/dashboard/settings",
      "/dashboard/settings/notifications",
      "/dashboard/settings/blocking",
      "/dashboard/settings/payment"
    ]
  }
];
