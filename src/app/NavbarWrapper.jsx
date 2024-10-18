"use client";

import { usePathname } from "next/navigation";
import NavbarComponent from "./components/(share)/NavbarComponent";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Define the base paths without worrying about the dynamic [id]
  const noNavbarBasePaths = [
    '/dashboard',
    '/dashboard/profile',
    '/dashboard/earnings',
    '/dashboard/proposals',
    '/dashboard/messages',
    '/dashboard/myServices',
    '/dashboard/job',
    '/dashboard/clientProfile',
    '/dashboard/services',
    '/dashboard/management',
    '/dashboard/payment',
    '/dashboard/feedback',
    '/dashboard/user',
    '/dashboard/report',
    '/dashboard/ongoing',
    '/dashboard/posted-job-client',
    '/dashboard/manageJobs'
  ];

  // Check if the current path matches any of the base paths
  const shouldHideNavbar = noNavbarBasePaths.some(basePath => pathname.startsWith(basePath));

  return !shouldHideNavbar ? <NavbarComponent /> : null;
}
