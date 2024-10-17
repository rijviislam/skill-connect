
"use client"; 

import { usePathname } from "next/navigation";
import NavbarComponent from "./components/(share)/NavbarComponent";

export default function NavbarWrapper() {
  const pathname = usePathname();

  
  const noNavbarRoutes = [ '/dashboard' ,'/dashboard/profile', '/dashboard/earnings' ,'/dashboard/proposals' , '/dashboard/messages' , '/dashboard/myServices' , '/dashboard/job' , '/dashboard/clientProfile', '/dashboard/services' , '/dashboard/management' , '/dashboard/payment' , '/dashboard/feedback' , '/dashboard/user' , '/dashboard/report']; 

 
  return !noNavbarRoutes.includes(pathname) ? <NavbarComponent /> : null;
}
