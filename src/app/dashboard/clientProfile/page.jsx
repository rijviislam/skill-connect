"use client";

import React, { useState, useEffect } from 'react';
import {  Button } from "@nextui-org/react";


import { useSession } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';

const ProfilePage = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(status === "loading");
  
    useEffect(() => {
      if (status !== "loading") {
        setLoading(false);
      }
    }, [status]);
  
    const isAuthenticated = status === "authenticated";
    const userImage = session?.user?.image;
    const userEmail = session?.user?.email;
    const userName = session?.user?.name;
    const userId = session?.user?._id; 

    if (loading) return <p>Loading...</p>;
    
    return (
        <div>
      {isAuthenticated ? (
        <div className="min-h-screen p-4 text-black">
          {/* Profile Section */}
          <div className="flex flex-col items-start">
            <Image
              src={userImage || 'https://i.postimg.cc/wT791byT/2919906.png'}
              alt="Profile"
              className="w-40 h-40 rounded-full mb-4 border-4 border-green-500 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
              width={160}
              height={160}
            />
            <h2 className="text-2xl font-extrabold mb-2 transition-colors duration-300 hover:text-green-500">
              {userName}
            </h2>
            <hr className="border-gray-300 my-2 w-full" />
            <p className="text-lg font-bold text-gray-600 mb-2 transition-colors duration-300 hover:text-green-400">
              {userEmail} 
            </p>
            <hr className="border-gray-300 my-2 w-full" />
            <div className="w-full px-4 mt-2"></div>
            <hr className="border-gray-300 my-2 w-full" />
            
              <Link href={`/dashboard/clientProfile/updateClient/${userId}`}>
                <Button className="mt-4 transition-colors duration-300 bg-green-500 text-green-100 rounded hover:bg-green-600 hover:shadow-lg">
                  Edit Profile
                </Button>
              </Link>
            
          </div>
        </div>
      ) : (
        <div>Profile not available</div>
      )}
    </div>
    );
};

export default ProfilePage;
