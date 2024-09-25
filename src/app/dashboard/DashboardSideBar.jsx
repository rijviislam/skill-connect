"use client"; 

import Link from "next/link";
import { FaAd, FaBook, FaHome, FaList, FaUsers } from "react-icons/fa";
import { usePathname } from "next/navigation"; 
import React from 'react';

const DashboardSideBar = () => {
    const pathname = usePathname(); 

    const isActive = (path) => pathname === path;

    return (
        <div className="flex flex-col w-full h-screen bg-green-200 p-4">
            <ul className="menu flex flex-col w-full">
                {/* Freelancer specific links */}
                <li className="font-bold text-lg mb-4">Freelancer Menu</li>
                <li>
                    <Link href="/dashboard/profile" className={`flex items-center mb-3 text-lg ${isActive('/dashboard/profile') ? 'font-bold text-green-700' : ''}`}>
                        <FaHome className="mr-2" /> My Profile
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/earnings" className={`flex items-center mb-3 text-lg ${isActive('/dashboard/earnings') ? 'font-bold text-green-700' : ''}`}>
                        <FaBook className="mr-2" /> Earnings Tracking
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/proposals" className={`flex items-center mb-3 text-lg ${isActive('/dashboard/proposals') ? 'font-bold text-green-700' : ''}`}>
                        <FaList className="mr-2" /> My Proposals
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/messages" className={`flex items-center mb-3 text-lg ${isActive('/dashboard/messages') ? 'font-bold text-green-700' : ''}`}>
                        <FaUsers className="mr-2" /> Messages
                    </Link>
                </li>

                <div className="divider my-4"></div>


                

                {/* Client specific links */}
                <li className="font-bold text-lg mb-4">Client Menu</li>
                <li>
                    <Link href="/dashboard/job" className={`flex items-center mb-3 text-lg ${isActive('/dashboard/job') ? 'font-bold text-green-700' : ''}`}>
                        <FaHome className="mr-2" /> Job Posting
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/management" className={`flex items-center mb-3 text-lg ${isActive('/dashboard/management') ? 'font-bold text-green-700' : ''}`}>
                        <FaList className="mr-2" /> Proposals Management
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/payment" className={`flex items-center mb-3 text-lg ${isActive('/dashboard/payment') ? 'font-bold text-green-700' : ''}`}>
                        <FaBook className="mr-2" /> Payment Management
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/feedback" className={`flex items-center mb-3 text-lg ${isActive('/dashboard/feedback') ? 'font-bold text-green-700' : ''}`}>
                        <FaAd className="mr-2" /> Review & Feedback
                    </Link>
                </li>

                <div className="divider my-4"></div>

                {/* Shared nav links */}
                <li>
                    <Link href="/" className={`flex items-center mb-3 text-lg ${isActive('/') ? 'font-bold text-green-700' : ''}`}>
                        <FaHome className="mr-2" /> Home
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default DashboardSideBar;
