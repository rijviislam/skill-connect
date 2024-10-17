"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchIcon } from "./SearchIcon";

export default function FreelancerProfile() {
  const categories = [
    { key: "all", label: "All" },
    { key: "web developer", label: "Web Developer" },
    { key: "frontend developer", label: "Frontend Developer" },
    { key: "backend developer", label: "Backend Developer" },
    { key: "devops engineer", label: "DevOps Engineer" },
    { key: "php developer", label: "PHP Developer" },
    { key: "full stack developer", label: "Full Stack Developer" },
    { key: "ui/ux designer", label: "UI/UX Designer" },
    { key: "graphics designer", label: "Graphics Designer" },
  ];

  const [profiles, setProfiles] = useState([]);
  const { isOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProfile, setSelectedProfile] = useState({});
  const { data: session } = useSession();
  const currUserEmail = session?.user?.email;
  const userEmail = session?.user?.email;
  const [currUser, setCurrUser] = useState([]);
  const [review, setReview] = useState(0);
  console.log(selectedProfile);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/profiles");
      const data = await response.json();

      if (Array.isArray(data)) {
        setProfiles(data);
        setFilterData(data);
      } else {
        console.error("Expected an array but got:", data);
        setProfiles([]);
        setFilterData([]);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setProfiles([]);
      setFilterData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Search term change handler
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Category filter handler
  const handleFilter = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

  // Filter logic based on search term and category
  useEffect(() => {
    let filtered = profiles;

    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.skills?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (profile) =>
          profile.profession?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilterData(filtered);
  }, [searchTerm, selectedCategory, profiles]);

  const fetchUserByEmail = async () => {
    try {
      const response = await fetch(`/api/get-user?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setCurrUser(data); // Update the user state with new data
      } else {
        console.error("Failed to fetch user:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchUserByEmail();
  }, [userEmail]);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    reset();

    const newReview = {
      reviewerName: currUser?.username,
      reviewerImage: currUser?.profile?.avatarUrl,
      description: data.description,
      rating: review,
      createdAt: new Date().toISOString(),
    };

    const existingReviews = selectedProfile.reviewCollection || [];

    const updatedReviewCollection = [...existingReviews, newReview];

    const formData = {
      ...data,
      reviewCollection: updatedReviewCollection,
    };

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/add-review?id=${selectedProfile._id}`,
        formData
      );
      if (response.status === 200) {
        console.log("Review submitted successfully");

        setSelectedProfile((prev) => ({
          ...prev,
          reviewCollection: updatedReviewCollection,
        }));
      } else {
        console.error("Error submitting review:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="mx-10">
      <h2 className="text-4xl font-bold bg-gradient-to-l from-[#90EE90] to-[#2E8B57] bg-clip-text text-transparent text-center">
        Freelancer Profile Page
      </h2>

      {/* SEARCH BAR */}
      <div className="flex justify-between items-center mt-10">
        <div className="lg:w-[400px] mt-5 ">
          <Input
            isClearable
            radius="lg"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 " />
            }
          />
        </div>

        {/* CATEGORY FILTER */}
        <Select
          label="Filter by Categories"
          placeholder="Select a category"
          className="max-w-xs"
          onChange={(event) => handleFilter(event.target.value)}
        >
          {categories.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* GRID CARD */}
      {loading ? (
        <div className="flex justify-center my-10">
          <Spinner size="lg" color="success" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:my-10 md:my-5 my-5 place-items-center gap-5">
          {Array.isArray(filterData) && filterData.length > 0 ? (
            filterData.map((profile, idx) => (
              <Card
                className="py-4  lg:w-[450px] min-w-[350px] h-[350px] bg-[#F2EAFA]"
                key={idx}
              >
                <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5 ">
                  <Image
                    alt="Profile avatar"
                    className="object-cover w-[100px] h-[100px] rounded-full"
                    src={
                      profile.avatar?.url?.startsWith("http") ||
                      profile.profile?.avatarUrl?.startsWith("http")
                        ? profile.avatar?.url || profile.profile?.avatarUrl
                        : "/images/default-avatar.png"
                    }
                    width={100}
                    height={100}
                  />

                  <div className="mt-3">
                    <h4 className="text-sm font-semibold">
                      {profile.username}
                    </h4>
                    <h5 className="text-sm">{profile.role}</h5>
                  </div>
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
                  <p>
                    <strong>Email:</strong> {profile.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {profile.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong> {profile.city}, {profile.country}
                  </p>
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    {profile.linkedin ? (
                      <a href={profile.linkedin} target="_blank">
                        View Profile
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <div className="flex justify-end items-end w-full">
                    <Button
                      onPress={() => {
                        setSelectedProfile(profile);
                        onOpenChange(true);
                      }}
                    >
                      Details
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))
          ) : (
            <p>No freelancers found</p>
          )}
        </div>
      )}

      {/* MODAL */}
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {selectedProfile.username || "Profile Details"}
              </ModalHeader>
              <ModalBody>
                <div>
                  <p>
                    <strong> Email: {selectedProfile.email}</strong>
                  </p>
                  <p>
                    <strong> Phone: {selectedProfile.phone}</strong>
                  </p>

                  <p>
                    <strong>
                      {" "}
                      Location: {selectedProfile.city},{" "}
                      {selectedProfile.country}
                    </strong>
                  </p>
                </div>
                <p>
                  <strong>Skills:</strong>{" "}
                  {Array.isArray(selectedProfile.skills)
                    ? selectedProfile.skills.join(", ")
                    : selectedProfile.skills || "N/A"}
                </p>
                <p>
                  <strong>Bio:</strong>{" "}
                  {selectedProfile.bio || "No bio available"}
                </p>
                {selectedProfile?.hiredClients?.includes(currUserEmail) && (
                  <form
                    className="flex w-[360px] md:w-[500px] lg:w-full flex-col"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <input
                      className="my-2 bg-transparent border-b outline-none border-[#9353D3] w-full h-[50px] p-2 rounded-lg"
                      placeholder="description"
                      type="text"
                      {...register("description", { required: true })}
                    />
                    <Rating
                      style={{ maxWidth: 150 }}
                      value={review}
                      onChange={(value) => setReview(value)}
                    />
                    <input
                      type="submit"
                      placeholder="Add Review"
                      className="bg-[#9353D3] text-white p-3 font-semibold rounded-xl cursor-pointer mt-3 w-[100px] h-12"
                    />
                  </form>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary">Hire</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
