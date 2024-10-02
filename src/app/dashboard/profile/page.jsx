"use client"

import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea, Slider } from "@nextui-org/react";
import Image from 'next/image';
import { useSession } from "next-auth/react"; 
import { BiShow, BiHide } from "react-icons/bi"; 


const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false); 

  //  profile data
  const [profileData, setProfileData] = useState({
    name: '',
    image: '',
    email: '',
    education: '',
    location: '',
    linkedin: '',
    skills: '',
    completionPercentage: 0
  });
  
  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
      if (status === "authenticated") {
        const initialData = {
          name: session.user.name || '',
          image: session.user.image || '',
          email: session.user.email || '',
          education: '', 
          location: '', 
          linkedin: '', 
          skills: '', 
        };
        setProfileData({
          ...initialData,
          completionPercentage: calculateCompletionPercentage(initialData)
      });
      }
    }
  }, [status, session]);

// 

 // Profile completeness calculation
 const calculateCompletionPercentage = (data) => {
  const fields = ["name", "image", "email", "location", "skills", "profession"];
  const completedFields = fields.filter(field => data[field] && data[field].trim() !== "");
  return Math.round((completedFields.length / fields.length) * 100);
};


  // Update backend
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      name: e.target.name.value,
      image: e.target.image.value,
      email: e.target.email.value,
      education: e.target.education.value,
      location: e.target.location.value,
      linkedin: e.target.linkedin.value,
      skills: e.target.skills.value,
    };
  
    console.log("Updated Profile Data:", updatedData); 
  
    setProfileData(updatedData);
    onOpenChange(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
//   

  if (loading) return <p>Loading...</p>; 

  return (
    <div>
      <div className="flex flex-col items-center p-4 text-black">
                {/* Profile Card */}
                <div className="bg-green-100 p-4 rounded-lg shadow-md w-80 text-center transition-transform transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-green-900 duration-300">
                    <Image
                        src={profileData.image || 'https://i.postimg.cc/wT791byT/2919906.png'} 
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto mb-4 transition-opacity duration-300 hover:opacity-80"
                        width={96}
                        height={96}
                    />
                    <h2 className="text-1xl font-extrabold  mb-2 transition-colors duration-300 hover:text-green-500">{profileData.name}</h2>
                    <p className="text-1xl font-extrabold text-gray-600 mb-2 transition-colors duration-300 hover:text-green-400">{profileData.email}</p>
                    
                   
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
                    <Button onPress={onOpen} className="mt-4 transition-colors duration-300 bg-green-500 text-green-100 rounded hover:bg-green-600 hover:shadow-lg">
                        Edit Profile
                    </Button>
                </div>
            </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="overflow-y-auto max-h-[80vh]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
              <ModalBody>
                <form onSubmit={handleUpdate}>
                  <Input
                    clearable 
                    label="Image URL" 
                    name="image" 
                    defaultValue={profileData.image} 
                    className="mb-4 transition-all duration-300 hover:bg-green-100"
                  />
                  <Input 
                    clearable 
                    label="Profile Name" 
                    name="name" 
                    defaultValue={profileData.name} 
                    className="mb-4 transition-all duration-300 hover:bg-green-100"
                  />
                  <Input 
                    clearable 
                    label="Email" 
                    name="email" 
                    defaultValue={profileData.email} 
                    className="mb-4 transition-all duration-300 hover:bg-green-100"
                  />
                  
                  
                  <div className="relative mb-4">
                    <Input
                      clearable
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"} 
                      className="transition-all duration-300 hover:bg-green-100"
                    />
                    <div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <BiHide size={24} /> : <BiShow size={24} />}
                    </div>
                  </div>
                  
                  <Input 
                    clearable 
                    label="Education" 
                    name="education" 
                    defaultValue={profileData.education} 
                    className="mb-4 transition-all duration-300 hover:bg-green-100"
                  />
                  <Input 
                    clearable 
                    label="Location" 
                    name="location" 
                    defaultValue={profileData.location} 
                    className="mb-4 transition-all duration-300 hover:bg-green-100"
                  />
                  <Input 
                    clearable 
                    label="LinkedIn ID Link" 
                    name="linkedin" 
                    defaultValue={profileData.linkedin}
                    className="mb-4 transition-all duration-300 hover:bg-green-100" 
                  />
                  <Textarea
                    label="Skills"
                    name="skills"
                    defaultValue={profileData.skills}
                    className="mb-4 transition-all duration-300 hover:bg-green-100"
                  />
                 
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button type="submit" className='bg-green-400'>
                      Update
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfilePage;
