"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaLinkedin, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [user, setUser] = useState([]);
  const [profiles, setProfiles] = useState(null);
  const { isOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const myEmail = session?.user?.email;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/get-user");
      const data = await response.json();
      setUser(data);
    };
    fetchUsers();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleEditClick = (profile) => {
    setProfiles(profile);
    reset(profile);
    onOpenChange(true);
  };

  const fetchUserByEmail = async () => {
    try {
      const response = await fetch(`/api/get-user?email=${myEmail}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const { _id, ...updatedFields } = data;
      const response = await axios.patch(
        `/api/put-user?id=${user._id}`,
        updatedFields
      );

      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        fetchUserByEmail();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const userImage = user?.profile?.avatarUrl;
  const userEmail = user?.email;
  const userName = user?.username;
  const userPhone = user?.phone;

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {user ? (
        <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg p-6 space-y-6 md:space-y-0">
          <div className="flex flex-col items-center w-full md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-300">
            <Image
              src={
                isValidUrl(userImage)
                  ? userImage
                  : "https://i.postimg.cc/wT791byT/2919906.png"
              }
              alt="Profile"
              className="w-32 h-32 md:w-56 md:h-56 rounded-full mb-4 transition-transform duration-300 hover:scale-105 border-4 border-gradient-to-r from-purple-800 to-pink-500"
              width={224}
              height={224}
            />
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
              {userEmail}
            </h2>
            <p className="text-2xl md:text-4xl font-semibold text-violet-600">
              {userName}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-2/3 p-6 space-y-4">
            <div className="flex items-center border-b border-gray-300 pb-2">
              <FaPhone className="text-gray-600 mr-3" />
              <span className="text-lg md:text-2xl font-bold">Phone:</span>
              <span className="ml-4 text-md md:text-xl">{userPhone}</span>
            </div>
            <div className="flex items-center border-b border-gray-300 pb-2">
              <FaMapMarkerAlt className="text-gray-600 mr-3" />
              <span className="text-lg md:text-2xl font-bold">Address:</span>
              <span className="ml-4 text-md md:text-xl">{`${user?.city} ${user?.country} ${user?.zipCode}`}</span>
            </div>
            <div className="flex items-center border-b border-gray-300 pb-2">
              <FaLinkedin className="text-gray-600 mr-3" />
              <div className="lg:flex">
              <div className="text-lg md:text-2xl font-bold">LinkedIn:</div>
              <div className="-ml-8  lg:ml-4 text-sm  md:text-xl">
                <a
                  href={user.linkedin}
                  className="text-blue-500 hover:underline"
                >
                  {user.linkedin}
                </a>
              </div>
              </div>
            </div>
            <div className="flex items-center border-b border-gray-300 pb-2">
              <span className="text-lg md:text-2xl font-bold">skills:</span>
              <span className="ml-4 text-md md:text-xl">{user.skills}</span>
            </div>
            <div className="flex items-center border-b border-gray-300 pb-2">
              <span className="text-lg md:text-2xl font-bold">Bio:</span>
              <span className="ml-4 text-md md:text-xl">{user.bio}</span>
            </div>
          </div>
          <Button
            className="mt-4 md:mt-0 transition-colors duration-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded hover:shadow-lg hover:scale-105"
            onPress={() => handleEditClick(user)}
          >
            Edit Profile
          </Button>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-700">
          Profile not available
        </div>
      )}

<Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1 mt-10 text-center">
          Edit Profile
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody className="max-h-[70vh] overflow-y-auto"> {/* Added max height and overflow */}
            <div className="flex flex-col md:flex-row gap-5">
              <Input
                type="file"
                variant="bordered"
                label="Avatar"
                placeholder="Enter your image"
                {...register("avatar")}
                className="border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
              />
              <Input
                type="text"
                variant="bordered"
                label="Username"
                placeholder="Enter your username"
                {...register("username")}
                className="border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <Input
                type="email"
                variant="bordered"
                label="Email"
                placeholder="Enter your email"
                {...register("email")}
                className="border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
              />
              <Input
                type="password"
                variant="bordered"
                label="Password"
                placeholder="Enter your password"
                {...register("passwordHash")}
                className="border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <Input
                type="number"
                variant="bordered"
                label="Phone Number"
                placeholder="Enter your phone number"
                className="h-[60px] border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
                {...register("phone")}
              />
              <Input
                type="text"
                variant="bordered"
                label="Street"
                placeholder="Enter your street"
                className="h-[60px] border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
                {...register("street")}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <Input
                type="text"
                variant="bordered"
                label="City"
                placeholder="Enter your city"
                className="h-[60px] border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
                {...register("city")}
              />
              <Input
                type="text"
                variant="bordered"
                label="State"
                placeholder="Enter your state"
                className="h-[60px] border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
                {...register("state")}
              />
              <Input
                type="number"
                variant="bordered"
                label="Zip Code"
                placeholder="Enter your zip code"
                className="h-[60px] border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
                {...register("zipCode")}
              />
              <Input
                type="text"
                variant="bordered"
                label="Country"
                placeholder="Enter your country"
                className="h-[60px] border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
                {...register("country")}
              />
              <Input
                type="text"
                variant="bordered"
                label="linkedin"
                placeholder="Enter your linkedin Link"
                className="h-[60px] border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
                {...register("linkedin")}
              />
            </div>

            <Textarea
              label="skills"
              placeholder="skills"
              {...register("skills")}
              className="border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
            />
            <Textarea
              label="Bio"
              placeholder="Bio"
              {...register("bio")}
              className="border-2 border-gray-300 rounded-md hover:border-purple-500 transition-all duration-200 w-full"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg"
              onPress={onClose}
            >
              Close
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg"
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </>
    )}
  </ModalContent>
</Modal>


    </div>
  );
};

export default ProfilePage;
