"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAd, FaBook, FaHome, FaList, FaUsers } from "react-icons/fa";
import logo from "../../Image/C-removebg-preview.png";

const DashboardSideBar = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;
  const { data: session } = useSession();
  const currentUserRole = session?.user?.role;
  console.log("FindRole", currentUserRole);

  return (
    <div className="flex flex-col w-62 h-full bg-green-300 p-4">
      <div className="">
        <ul className="menu flex flex-col w-full">
          <Link href="/" className="w-20 h-8 mb-5">
            <Image src={logo} alt="Digital Web Design" className="" />
          </Link>
          {currentUserRole === "freelancer" && (
            <>
              <li className="font-bold text-lg mb-4 mt-5">Freelancer Menu</li>
              <li>
                <Link
                  href="/dashboard/profile"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/profile")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaHome className="mr-2" />
                  Freelancer Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/earnings"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/earnings")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaBook className="mr-2" /> Earnings Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/proposals"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/proposals")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaList className="mr-2" /> My Proposals
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/messages"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/messages")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaUsers className="mr-2" /> Messages
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/myServices"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/myServices")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaUsers className="mr-2" /> My Services
                </Link>
              </li>
            </>
          )}

          <div className="divider my-4"></div>

          {currentUserRole === "client" && (
            <>
              <li className="font-bold text-lg mb-4">Client Menu</li>
              <li>
                <Link
                  href="/dashboard/clientProfile"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/clientProfile")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaHome className="mr-2" /> My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/job"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/job")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaHome className="mr-2" /> Job Posting
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/posted-job-client"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/posted-job-client")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaHome className="mr-2" /> Posted Job
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/services"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/services")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaHome className="mr-2" /> Services
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/management"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/management")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaList className="mr-2" /> Proposals Management
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/payment"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/payment")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaBook className="mr-2" /> Payment Management
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/feedback"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/feedback")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaAd className="mr-2" /> Review & Feedback
                </Link>
              </li>
            </>
          )}
          {currentUserRole === "admin" && (
            <>
              <div className="divider my-4"></div>
              <li className="font-bold text-lg mb-4">Admin Menu</li>
              <li>
                <Link
                  href="/dashboard/user"
                  className={`flex items-center mb-4 text-lg ${
                    isActive("/dashboard/user")
                      ? "font-extrabold text-green-800"
                      : ""
                  }`}
                >
                  <FaAd className="mr-2" /> User Management
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSideBar;
