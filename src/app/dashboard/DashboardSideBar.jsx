"use client"; 

import Link from "next/link";
import { FaAd, FaBook, FaHome, FaList, FaUsers } from "react-icons/fa";
import { usePathname } from "next/navigation"; 
import React from 'react';

const DashboardSideBar = () => {
    const pathname = usePathname(); 

    const isActive = (path) => pathname === path;

    return (
        <div className="flex flex-col w-48 h-screen bg-green-200 p-2"> {/* Adjusted width and padding */}
            {/* Wrapping the menu in a scrollable div with a fixed height */}
            <div className="overflow-y-auto max-h-[calc(100vh-64px)]"> {/* Adjust height as needed */}
                <ul className="menu flex flex-col w-full">
                    {/* Freelancer specific links */}
                    <li className="font-bold text-sm mb-2">Freelancer Menu</li> {/* Smaller font size */}
                    <li>
                        <Link href="/dashboard/profile" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/profile') ? 'font-bold text-green-700' : ''}`}>
                            <FaHome className="mr-1" />Freelancer  Profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/earnings" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/earnings') ? 'font-bold text-green-700' : ''}`}>
                            <FaBook className="mr-1" /> Earnings Tracking
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/proposals" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/proposals') ? 'font-bold text-green-700' : ''}`}>
                            <FaList className="mr-1" /> My Proposals
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/messages" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/messages') ? 'font-bold text-green-700' : ''}`}>
                            <FaUsers className="mr-1" /> Messages
                        </Link>
                    </li>

                    <div className="divider my-2"></div>

                    {/* Client specific links */}
                    <li className="font-bold text-sm mb-2">Client Menu</li> {/* Smaller font size */}
                    <li>
                        <Link href="/dashboard/clientProfile" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/job') ? 'font-bold text-green-700' : ''}`}>
                            <FaHome className="mr-1" /> my profile
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/job" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/job') ? 'font-bold text-green-700' : ''}`}>
                            <FaHome className="mr-1" /> Job Posting
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/management" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/management') ? 'font-bold text-green-700' : ''}`}>
                            <FaList className="mr-1" /> Proposals Management
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/payment" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/payment') ? 'font-bold text-green-700' : ''}`}>
                            <FaBook className="mr-1" /> Payment Management
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/feedback" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/feedback') ? 'font-bold text-green-700' : ''}`}>
                            <FaAd className="mr-1" /> Review & Feedback
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/user" className={`flex items-center mb-2 text-sm ${isActive('/dashboard/user') ? 'font-bold text-green-700' : ''}`}>
                            <FaAd className="mr-1" /> User Management 
                        </Link>
                    </li>

                    <div className="divider my-2"></div>

                    {/* Shared nav links */}
                    <li>
                        <Link href="/" className={`flex items-center mb-2 text-sm ${isActive('/') ? 'font-bold text-green-700' : ''}`}>
                            <FaHome className="mr-1" /> Home
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardSideBar;
