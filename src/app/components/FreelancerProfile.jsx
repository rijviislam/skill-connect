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
import Swal from "sweetalert2";

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

  const reportReasons = [
    { key: "spam", label: "Spam or irrelevant content" },
    { key: "harassment", label: "Harassment or bullying" },
    { key: "fake_profile", label: "Fake profile" },
    { key: "inappropriate", label: "Inappropriate content" },
    { key: "other", label: "Other" },
  ];

  const [profiles, setProfiles] = useState([]);
  const { isOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedReasons, setSelectedReasons] = useState({});
  const [selectedProfile, setSelectedProfile] = useState({});
  const { data: session } = useSession();
  const currUserEmail = session?.user?.email;
  const userEmail = session?.user?.email;
  const [currUser, setCurrUser] = useState([]);
  const [review, setReview] = useState(0);
  const { register, handleSubmit, reset } = useForm();

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/profiles");
      const data = await response.json();
      setProfiles(Array.isArray(data) ? data : []);
      setFilterData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

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

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleFilter = (categoryKey) => setSelectedCategory(categoryKey);

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

  const handleReportUser = (profileId) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [profileId]: !prev[profileId],
    }));
  };

  const handleReasonChange = (profileId, reasonKey) => {
    setSelectedReasons((prev) => ({
      ...prev,
      [profileId]: reasonKey,
    }));
  };

  const submitReport = async (profileId) => {
    const reason = selectedReasons[profileId];
    if (!reason) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning!',
        text: 'Please select a reason for reporting.',
      });
      return;
    }
  
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: profileId,
          reason,
        }),
      });
  
      if (response.ok) {
       
        Swal.fire({
          icon: 'success',
          title: 'Reported!',
          text: 'User reported successfully.',
        });
  
        setDropdownVisible((prev) => ({
          ...prev,
          [profileId]: false,
        }));
      } else {
       
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error reporting user.',
        });
      }
    } catch (error) {
      console.error("Error reporting user:", error);
      
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error reporting user.',
      });
    }
  };
  

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
  console.log("CurrentUser", currUser);
  console.log("Current Profile", selectedProfile);

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
  console.log("CurrentUser", currUser);
  console.log("Current Profile", selectedProfile);

  return (
    <div className="mx-10">
      <h2 className="text-4xl font-bold bg-gradient-to-l from-[#90EE90] to-[#2E8B57] bg-clip-text text-transparent text-center">
        Freelancer Profiles
      </h2>

      <div className="flex justify-between items-center mt-10">
        <div className="lg:w-[400px] mt-5">
          <Input
            isClearable
            radius="lg"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>

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

      {loading ? (
        <div className="flex justify-center my-10">
          <Spinner size="lg" color="success" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:my-10 md:my-5 my-5 place-items-center gap-8">
          {filterData.length > 0 ? (
            filterData.map((profile) => (
              <Card
                className="py-4 w-full max-w-md min-w-[300px] h-auto"
                key={profile._id}
              >
                <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
                  <Image
                    alt="Profile avatar"
                    className="object-cover w-[100px] h-[100px] rounded-full"
                    src={
                      profile.profile?.avatarUrl?.startsWith("http")
                        ? profile.profile?.avatarUrl
                        : "https://i.postimg.cc/L56NR5qd/masi-mohammadi-Fg-GVblk-ZTy-A-unsplash.jpg"
                    }
                    width={100}
                    height={100}
                  />

                  <div className="mt-3">
                    <h4 className="text-sm font-semibold">
                      {profile.username}
                    </h4>
                    <h5 className="text-sm">{profile.role || "N/A"}</h5>
                    <p>
                      <strong>Email:</strong> {profile.email || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {profile.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Location:</strong> {profile.city},{" "}
                      {profile.country}
                    </p>
                  </div>
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
                  <p>
                    <strong>Skills:</strong> {profile.skills || "N/A"}
                  </p>
                  <p>
                    <strong>Bio:</strong> {profile.bio || "No bio available"}
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

                  {dropdownVisible[profile._id] && (
                    <Select
                      label="Select Report Reason"
                      placeholder="Select a reason"
                      onChange={(event) =>
                        handleReasonChange(profile._id, event.target.value)
                      }
                      className="mt-2"
                    >
                      {reportReasons.map((item) => (
                        <SelectItem key={item.key} value={item.key}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}

                  <div className="flex justify-between items-end w-full">
                    <Button
                      className="text-sm text-white bg-[#C20E4D] mt-3 hover:underline"
                      onClick={() => handleReportUser(profile._id)}
                    >
                      {dropdownVisible[profile._id] ? "Cancel" : "Report User"}
                    </Button>
                    {dropdownVisible[profile._id] && (
                      <Button
                        className="text-sm text-white mt-2 hover:underline bg-[#C20E4D]"
                        onClick={() => submitReport(profile._id)}
                      >
                        Submit Report
                      </Button>
                    )}
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
            <div>No profiles found.</div>
          )}
        </div>
      )}

      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Profile Details: {selectedProfile.username || "N/A"}
          </ModalHeader>
          <ModalBody>
            <p>
              <strong>Email:</strong> {selectedProfile.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {selectedProfile.phone || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {selectedProfile.city},{" "}
              {selectedProfile.country}
            </p>

            <p>
              <strong>Bio:</strong> {selectedProfile.bio || "N/A"}
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              {selectedProfile.linkedin ? (
                <a href={selectedProfile.linkedin} target="_blank">
                  View Profile
                </a>
              ) : (
                "N/A"
              )}
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
            <Button
              color="danger"
              variant="light"
              onPress={() => onOpenChange(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
