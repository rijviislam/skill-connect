"use client";

import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaAd,
  FaBars,
  FaBook,
  FaHome,
  FaList,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import logo from "../../Image/Skill-removebg-preview.png";

const Dashboard = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const currentUserRole = session?.user?.role;

  const isActive = (path) => pathname === path;
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex justify-between items-center p-4 bg-violet-200 border-b border-gray-200 lg:hidden">
        <button onClick={toggleSidebar} className="text-xl md:hidden">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="text-xl font-bold ">Dashboard</h1>
      </header>

      <div
        className={`flex flex-grow h-full ${
          isSidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        {/* Sidebar */}
        <div className="flex flex-col w-72 bg-gray-100 border-2 border-x-violet-400 p-4">
          <Link href="/" className="w-72 h-20 -mt-32 mb-24 -ml-14">
            <Image src={logo} alt="Digital Web Design" />
          </Link>
          <hr className="border-2 border-violet-300 my-2" />

          <div>
            <div className="mr-4">
              <div>
                <Avatar
                  isBordered
                  className="w-20 h-20 border-5 border-violet-500"
                  color="secondary"
                  name="User Avatar"
                  size="sm"
                  src={
                    session?.user?.profile?.avatarUrl ||
                    "https://i.postimg.cc/MGvwhcVk/photo-1500648767791-00dcc994a43e.avif"
                  }
                />
              </div>
              <div>
                <p className="font-semibold">
                  <span>{session?.user?.role}</span>:{" "}
                  <span>{session?.user?.email}</span>
                </p>
              </div>
            </div>
            <hr className="border-2 border-violet-300 my-2" />

            <ul className="menu flex flex-col w-full">
              {currentUserRole === "freelancer" && (
                <>
                  <li className="font-bold text-lg mb-4 mt-5">
                    Freelancer Menu
                  </li>
                  <li>
                    <Link
                      href="/dashboard/profile"
                      className={`flex items-center mb-4 text-lg ${
                        isActive("/dashboard/profile")
                          ? "font-extrabold bg-violet-200 rounded-lg"
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
                          ? "font-extrabold bg-violet-200 rounded-lg"
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
                          ? "font-extrabold bg-violet-200 rounded-lg"
                          : ""
                      }`}
                    >
                      <FaList className="mr-2" /> My Proposals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/ongoing"
                      className={`flex items-center mb-4 text-lg ${
                        isActive("/dashboard/ongoing")
                          ? "font-extrabold bg-violet-200 rounded-lg"
                          : ""
                      }`}
                    >
                      <FaList className="mr-2" /> Ongoing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/messages"
                      className={`flex items-center mb-4 text-lg ${
                        isActive("/dashboard/messages")
                          ? "font-extrabold bg-violet-200 rounded-lg"
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
                          ? "font-extrabold bg-violet-200 rounded-lg"
                          : ""
                      }`}
                    >
                      <FaUsers className="mr-2" /> My Services
                    </Link>
                  </li>
                </>
              )}

              {currentUserRole === "client" && (
                <>
                  <li className="font-bold text-lg mb-4">Client Menu</li>
                  <li>
                    <Link
                      href="/dashboard/clientProfile"
                      className={`flex items-center mb-4 text-lg ${
                        isActive("/dashboard/clientProfile")
                          ? "font-extrabold bg-violet-200 rounded-lg"
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
                          ? "font-extrabold bg-violet-200 rounded-lg"
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
                          ? "font-extrabold bg-violet-200 rounded-lg"
                          : ""
                      }`}
                    >
                      <FaHome className="mr-2" /> Posted Job
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/manageJobs"
                      className={`flex items-center mb-4 text-lg ${
                        isActive("/dashboard/manageJobs")
                          ? "font-extrabold bg-violet-200 rounded-lg"
                          : ""
                      }`}
                    >
                      <FaHome className="mr-2" /> Manage Job
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/services"
                      className={`flex items-center mb-4 text-lg ${
                        isActive("/dashboard/services")
                          ? "font-extrabold bg-violet-200 rounded-lg"
                          : ""
                      }`}
                    >
                      <FaHome className="mr-2" /> Services
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
                          ? "font-extrabold bg-violet-200 rounded-lg"
                          : ""
                      }`}
                    >
                      <FaAd className="mr-2" /> User Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/report"
                      className={`flex items-center mb-4 text-lg ${
                        isActive("/dashboard/report")
                          ? "font-extrabold bg-violet-200 rounded-lg"
                          : ""
                      }`}
                    >
                      <FaAd className="mr-2" /> Reports
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
