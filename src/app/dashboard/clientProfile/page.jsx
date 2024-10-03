"use client";

import React, { useState, useEffect } from 'react';
import {  Button} from "@nextui-org/react";
import { FaPhone, FaMapMarkerAlt, FaLinkedin, FaUser } from 'react-icons/fa';


import Link from 'next/link';
import Image from 'next/image';

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  console.log(user)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/get-user');
      const data = await response.json();
      setUser(data);
    };
    fetchUsers();
  }, []);

  
  const userImage = user?.profile?.avatarUrl;
  const userEmail = user?.email;
  const userName = user?.username;
  const userId = user?._id; 

 


    // Dummy data
  const dummyData = {
    password: '********',
    phone: '123-456-7890',
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipcode: '12345',
    country: 'USA',
    linkedIn: 'https://linkedin.com/in/example',
    requiredSkills: 'Next.js',
    bio: 'Passionate web developer with experience in building dynamic web applications.',
  };
    
    return (
      <div className="flex flex-col items-start justify-start min-h-screen p-4">
      {user ? (
        <div className="flex flex-col md:flex-row w-full max-w-5xl">
          <div className="flex flex-col items-center w-full md:w-1/3 p-6">
            <Image
              src={userImage || 'https://i.postimg.cc/wT791byT/2919906.png'}
              alt="Profile"
              className="w-56 h-56 rounded-full mb-4 transition-opacity duration-300 hover:opacity-80"
              width={224}
              height={224}
            />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{userEmail}</h2>
            <p className="text-4xl font-semibold text-gray-600">{userName}</p>
          </div>
          <div className="flex flex-col w-full md:w-2/3 p-6 space-y-6">
            <div className="flex items-center">
              <FaUser className="text-gray-600 mr-3" />
              <span className="text-2xl font-bold">Password:</span>
              <span className="ml-4 text-xl">{dummyData.password}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-gray-600 mr-3" />
              <span className="text-2xl font-bold">Phone:</span>
              <span className="ml-4 text-xl">{dummyData.phone}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-600 mr-3" />
              <span className="text-2xl font-bold">Address:</span>
              <span className="ml-4 text-xl">{`${dummyData.street}, ${dummyData.city}, ${dummyData.state}, ${dummyData.zipcode}, ${dummyData.country}`}</span>
            </div>
            <div className="flex items-center">
              <FaLinkedin className="text-gray-600 mr-3" />
              <span className="text-2xl font-bold">LinkedIn:</span>
              <span className="ml-4 text-xl">
                <a href={dummyData.linkedIn} className="text-blue-500 hover:underline">{dummyData.linkedIn}</a>
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold">Required Skills:</span>
              <span className="ml-4 text-xl">{dummyData.requiredSkills}</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold">Bio:</span>
              <span className="ml-4 text-xl">{dummyData.bio}</span>
            </div>
          </div>
          
        </div>
        
      ) : (
        <div className="text-center text-lg text-gray-700">Profile not available</div>
      )}
      {user && (
        <>
          <Link href={`/dashboard/clientProfile/updateClient/${userId}`}>
            <Button className="lg:ml-20 mt-6 transition-colors duration-300 bg-green-500 text-green-100 rounded hover:bg-green-600 hover:shadow-lg">
              Edit Profile
            </Button>
          </Link>
        
        </>
      )}
    </div>
    );
};

export default ProfilePage;



 