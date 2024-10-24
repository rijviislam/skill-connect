"use client";

import { usePathname } from "next/navigation";

import Footer from "./components/(share)/Footer";

export default function FooterWrapper() {
  const pathname = usePathname();


  const noFooterBasePaths = [
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

  
  const shouldHideFooter = noFooterBasePaths.some(basePath => pathname.startsWith(basePath));

  return !shouldHideFooter ? <Footer /> : null;
}
