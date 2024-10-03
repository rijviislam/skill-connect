"use client"

import { Button, Input, Textarea } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';

const ProfilePage = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(status === "loading");
    const [showPassword, setShowPassword] = useState(false);
    
  
    useEffect(() => {
      if (status !== "loading") {
        setLoading(false);
      }
    }, [status]);
  
    
    const userImage = session?.user?.image;
     
    const userEmail = session?.user?.email;
    const userName = session?.user?.name;
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };
  
  
  
  
    if (loading) return <p>Loading...</p>;
    return (
        <div>
        <div>
        <div className="overflow-y-auto max-h-[80vh]">
   <>
     <div className="flex flex-col gap-1">Edit Profile</div>
     <div>
       <>
         <div>
           <form
             onSubmit={(e) => {
               e.preventDefault();
               const formData = new FormData(e.target);
               const data = Object.fromEntries(formData.entries());
               console.log(data); // Logs form data to the console
             }}
           >
             <div className="lg:flex lg:gap-8">
               <Input
                 clearable
                 label="Avatar URL"
                 name="avatarUrl"
                 defaultValue={userImage}
                 className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
               />
               <Input
                 clearable
                 label="Name"
                 name="name"
                 defaultValue={userName}
                 className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
               />
             </div>
 
             <div className="lg:flex lg:gap-8">
               <Input
                 clearable
                 label="Email"
                 name="email"
                 defaultValue={userEmail}
                 className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
               />
               <div className="relative mb-4 lg:w-full">
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
             </div>
 
             <div className="lg:flex lg:gap-8">
               <Input
                 clearable
                 label="Phone"
                 name="phone"
                 type="number"
                 className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
               />
               <Input
                 clearable
                 label="Street"
                 name="street"
                 className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
               />
             </div>
 
             <div className="lg:flex lg:gap-8">
               <Input
                 clearable
                 label="City"
                 name="city"
                 className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
               />
               <Input
                 clearable
                 label="State"
                 name="state"
                 className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
               />
             </div>
 
             <div className="lg:flex lg:gap-8">
               <Input
                 clearable
                 label="Zip Code"
                 name="zipCode"
                 className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
               />
               <Input
                 clearable
                 label="Country"
                 name="country"
                 className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
               />
             </div>
 
             <Input
               clearable
               label="LinkedIn ID Link"
               name="linkedin"
               className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
             />
             <Textarea
               label="Required Skills"
               name="Required Skills "
               className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
             />
             <Textarea
               label="Bio"
               name="bio"
               className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
             />
 
             <div className="flex gap-4">
               
               <Button type="submit" className="bg-green-400">
                 Update
               </Button>
             </div>
           </form>
         </div>
       </>
     </div>
   </>
 </div>
 
 
 </div>
 
         </div>
    );
};

export default ProfilePage;