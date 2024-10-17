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
  console.log(user);

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
    setProfiles(profile); // Store the clicked Profile
    reset(profile); // Reset form fields with selected service data
    onOpenChange(true);
  };
  const fetchUserByEmail = async () => {
    try {
      const response = await fetch(`/api/get-user?email=${myEmail}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data); // Update the user state with new data
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
        `http://localhost:3000/api/put-user?id=${user._id}`,
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

        // Refetch the updated user data to update the UI
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
  const userId = user?._id;
  const userPhone = user?.phone;
  const isValidUrl = (url) => {
    try {
      new URL(url); // This will throw if the URL is invalid
      return true;
    } catch (_) {
      return false;
    }
  };

  // Dummy data
  const dummyData = {
    password: "********",
    phone: "123-456-7890",
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipcode: "12345",
    country: "USA",
    linkedIn: "https://linkedin.com/in/example",
    requiredSkills: "Next.js",
    bio: "Passionate web developer with experience in building dynamic web applications.",
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen p-4">
      {user ? (
        <div className="flex flex-col md:flex-row w-full max-w-5xl">
          <div className="flex flex-col items-center w-full md:w-1/3 p-6">
            <Image
              src={userImage || "https://i.postimg.cc/wT791byT/2919906.png"}
              alt="Profile"
              className="w-56 h-56 rounded-full mb-4 transition-opacity duration-300 hover:opacity-80"
              width={224}
              height={224}
            />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {userEmail}
            </h2>
            <p className="text-4xl font-semibold text-gray-600">{userName}</p>
          </div>
          <div className="flex flex-col w-full md:w-2/3 p-6 space-y-6">
            <div className="flex items-center">
              <FaUser className="text-gray-600 mr-3" />
              <span className="text-2xl font-bold">Password:</span>
              <span className="ml-4 text-xl">{user?.password}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-gray-600 mr-3" />
              <span className="text-2xl font-bold">Phone:</span>
              <span className="ml-4 text-xl">{userPhone}</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-gray-600 mr-3" />
              <span className="text-2xl font-bold">Address:</span>
              <span className="ml-4 text-xl">{`${user?.city} ${user?.country} ${user?.zipCode}, `}</span>
            </div>
            <div className="flex items-center">
              <FaLinkedin className="text-gray-600 mr-3" />
              <span className="text-2xl font-bold">LinkedIn:</span>
              <span className="ml-4 text-xl">
                <a
                  href={user?.linkedin}
                  className="text-blue-500 hover:underline"
                >
                  {user?.linkedin || ""}
                </a>
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold">Required Skills:</span>
              <span className="ml-4 text-xl">{user?.skills}</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold">Bio:</span>
              <span className="ml-4 text-xl">{user?.bio}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-700">
          Profile not available
        </div>
      )}
      {user && (
        <>
          <Button
            className="lg:ml-20 mt-6 transition-colors duration-300 bg-green-500 text-green-100 rounded hover:bg-green-600 hover:shadow-lg"
            onPress={() => handleEditClick(user)}
          >
            Edit Profile
          </Button>
        </>
      )}

      {/* MODAL  */}
      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-10">
                Edit Profile
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <div className="flex gap-5">
                    <Input
                      type="file"
                      variant="bordered"
                      label="Avatar"
                      placeholder="Enter your image"
                      {...register("avatar")}
                    />
                    <Input
                      type="text"
                      variant="bordered"
                      label="Username"
                      placeholder="Enter your username"
                      {...register("username")}
                    />
                  </div>

                  <div className="flex gap-5">
                    <Input
                      type="email"
                      variant="bordered"
                      label="Email"
                      placeholder="Enter your email"
                      {...register("email")}
                    />
                    <Input
                      type="password"
                      variant="bordered"
                      label="Password"
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                  </div>
                  <div className="flex gap-5">
                    <Input
                      type="number"
                      variant="bordered"
                      label="Phone Number"
                      placeholder="Enter your Phone number"
                      className="h-[60px]"
                      {...register("phone")}
                    />
                    <Input
                      type="text"
                      variant="bordered"
                      label="Street"
                      placeholder="Enter your Phone street"
                      className="h-[60px]"
                      {...register("street")}
                    />
                  </div>
                  <div className="flex gap-5">
                    <Input
                      type="text"
                      variant="bordered"
                      label="City"
                      placeholder="Enter your Phone city"
                      className="h-[60px]"
                      {...register("city")}
                    />
                    <Input
                      type="text"
                      variant="bordered"
                      label="State"
                      placeholder="Enter your Phone state"
                      className="h-[60px]"
                      {...register("state")}
                    />
                  </div>
                  <div className="flex gap-5">
                    <Input
                      type="number"
                      variant="bordered"
                      label="Zip code"
                      placeholder="Enter your zip code"
                      className="h-[60px]"
                      {...register("zipCode")}
                    />
                    <Input
                      type="text"
                      variant="bordered"
                      label="Country"
                      placeholder="Enter your country"
                      className="h-[60px]"
                      {...register("country")}
                    />
                  </div>
                  <div className="flex gap-5">
                    <Input
                      type="link"
                      variant="bordered"
                      label="Linkedin"
                      placeholder="Enter your linkedin profile"
                      className="h-[60px]"
                      {...register("linkedin")}
                    />
                    <Input
                      type="link"
                      variant="bordered"
                      label="Others social"
                      placeholder="Enter your others social"
                      className="h-[60px]"
                      {...register("linkedin")}
                    />
                  </div>
                  <Textarea
                    variant="faded"
                    label="Bio"
                    placeholder="Enter your bio"
                    className="max-w-full"
                    {...register("bio")}
                  />
                  <Textarea
                    variant="faded"
                    label="Skills"
                    placeholder="Enter your skills"
                    className="max-w-full"
                    {...register("skills")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Update Profile Info
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
