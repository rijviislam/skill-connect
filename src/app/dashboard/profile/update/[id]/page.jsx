"use client";

import Loading from '@/app/loading';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { BiShow, BiHide } from "react-icons/bi";
import Swal from 'sweetalert2';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(status === "loading");
  const [showPassword, setShowPassword] = useState(false);
  
  // State for error messages
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  const userImage = session?.user?.profile?.avatarUrl;
  const userEmail = session?.user?.email;
  const userName = session?.user?.username;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Reset errors
    setErrors({});
    const newErrors = {};

    // Validate required fields
    Object.keys(data).forEach((key) => {
      if (!data[key] && key !== 'email') {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    console.log("Form data before sending:", data);

    try {
      const response = await fetch('/api/put-user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log("API response:", result);

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Profile updated successfully.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: result.message || "Failed to update profile.",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again later.',
      });
    }
  };

  if (loading) {
    return <div><Loading/></div>;
  }

  return (
    <div>
      <div className="overflow-y-auto max-h-[80vh]">
        <div className="flex flex-col gap-1">Edit Profile</div>
        <form onSubmit={updateHandler}>
          {/* Avatar URL and Username */}
          <div className="lg:flex lg:gap-8">
            <Input
              clearable
              label="Avatar URL"
              name="avatarUrl"
              defaultValue={userImage}
              className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
              required
              status={errors.avatarUrl ? 'error' : undefined}
              helperText={errors.avatarUrl}
            />
            <Input
              clearable
              label="Username"
              name="username"
              defaultValue={userName}
              className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
              required
              status={errors.username ? 'error' : undefined}
              helperText={errors.username}
            />
          </div>

          {/* Email and Password */}
          <div className="lg:flex lg:gap-8">
            <Input
              clearable
              label="Email"
              name="email"
              defaultValue={userEmail}
              className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
              disabled
            />
            <div className="relative mb-4 lg:w-full">
              <Input
                clearable
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="transition-all duration-300 hover:bg-green-100"
                required
                status={errors.password ? 'error' : undefined}
                helperText={errors.password}
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiHide size={24} /> : <BiShow size={24} />}
              </div>
            </div>
          </div>

          {/* Phone and Street */}
          <div className="lg:flex lg:gap-8">
            <Input
              clearable
              label="Phone"
              name="phone"
              type="number"
              className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
              required
              status={errors.phone ? 'error' : undefined}
              helperText={errors.phone}
            />
            <Input
              clearable
              label="Street"
              name="street"
              className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
              required
              status={errors.street ? 'error' : undefined}
              helperText={errors.street}
            />
          </div>

          {/* City and State */}
          <div className="lg:flex lg:gap-8">
            <Input
              clearable
              label="City"
              name="city"
              className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
              required
              status={errors.city ? 'error' : undefined}
              helperText={errors.city}
            />
            <Input
              clearable
              label="State"
              name="state"
              className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
              required
              status={errors.state ? 'error' : undefined}
              helperText={errors.state}
            />
          </div>

          {/* Zip Code and Country */}
          <div className="lg:flex lg:gap-8">
            <Input
              clearable
              label="Zip Code"
              name="zipCode"
              className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
              required
              status={errors.zipCode ? 'error' : undefined}
              helperText={errors.zipCode}
            />
            <Input
              clearable
              label="Country"
              name="country"
              className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
              required
              status={errors.country ? 'error' : undefined}
              helperText={errors.country}
            />
          </div>

          {/* LinkedIn and Social Links */}
          <Input
            clearable
            label="LinkedIn Profile"
            name="linkedin"
            className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
            required
            status={errors.linkedin ? 'error' : undefined}
            helperText={errors.linkedin}
          />
          <Input
            clearable
            label="Other Social Links"
            name="socialLinks"
            className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
            required
            status={errors.socialLinks ? 'error' : undefined}
            helperText={errors.socialLinks}
          />

          {/* Skills and Bio */}
          <Textarea
            label="Skills"
            name="skills"
            className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
            required
            status={errors.skills ? 'error' : undefined}
            helperText={errors.skills}
          />
          <Textarea
            label="Bio"
            name="bio"
            className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
            required
            status={errors.bio ? 'error' : undefined}
            helperText={errors.bio}
          />

          {/* Services */}
          <Textarea
            label="Services"
            name="services"
            className="mb-4 transition-all duration-300 hover:bg-green-100 lg:w-full"
            required
            status={errors.services ? 'error' : undefined}
            helperText={errors.services}
          />

          {/* Buttons */}
          <div className="flex gap-4">
            <Link href={'/dashboard/profile'}>
              <Button color="danger" variant="light">
                Close
              </Button>
            </Link>
            <Button type="submit" className="bg-green-400">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
