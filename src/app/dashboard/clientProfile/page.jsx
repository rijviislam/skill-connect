"use client";

import React, { useState, useEffect } from 'react';
import {  Button, Slider } from "@nextui-org/react";


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
           {isAuthenticated ? ( <div className="flex flex-col items-center p-4 text-black">
                {/* Profile Card */}
                <div className="bg-green-100 p-4 rounded-lg shadow-md w-80 text-center transition-transform transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-green-900 duration-300">
                    <Image
                        src={userImage || 'https://i.postimg.cc/wT791byT/2919906.png'} 
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto mb-4 transition-opacity duration-300 hover:opacity-80"
                        width={96}
                        height={96}
                    />
                    <h2 className="text-1xl font-extrabold  mb-2 transition-colors duration-300 hover:text-green-500">{userEmail}</h2>
                    <p className="text-1xl font-extrabold text-gray-600 mb-2 transition-colors duration-300 hover:text-green-400">{userName}</p>
                    
                   
                    <div className="w-full px-4 mt-2">
                        <Slider
                            isDisabled
                            label="Profile Completeness"
                            step={0.01}
                            maxValue={1}
                            minValue={0}
                            defaultValue={profileData.completionPercentage / 100}
                            className="max-w-md"
                        />
                        <p className="text-green-700 mt-2">Completion: {profileData.completionPercentage}%</p>
                    </div>
                   <Link href={`/dashboard/clientProfile/updateClient/${userId}`}> <Button onPress={onOpen} className="mt-4 transition-colors duration-300 bg-green-500 text-green-100 rounded hover:bg-green-600 hover:shadow-lg">
                        Edit Profile
                    </Button></Link>
                </div>
            </div>
             ) : (
              <div>Profile not available</div>
            )}

          </div>
    );
};

export default ProfilePage;
