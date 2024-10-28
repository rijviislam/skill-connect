"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "../loading";
import { SearchIcon } from "./SearchIcon";

export default function ClientProfile() {
  const { isOpen, onOpenChange } = useDisclosure();
  const [selectedProfile, setSelectedProfile] = useState({});
  const { data: session } = useSession();
  const [review, setReview] = useState(0);
  const [currUser, setCurrUser] = useState([]);
  const currUserEmail = session?.user?.email;
  const userEmail = session?.user?.email;
  const { register, handleSubmit, reset } = useForm();
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedReasons, setSelectedReasons] = useState({});
  const reportReasons = [
    { key: "spam", label: "Spam or irrelevant content" },
    { key: "harassment", label: "Harassment or bullying" },
    { key: "fake_profile", label: "Fake profile" },
    { key: "inappropriate", label: "Inappropriate content" },
    { key: "other", label: "Other" },
  ];

  // Fetch profiles from API
  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/clientProfile");
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
  console.log("CurrentUser", currUser);

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Fetch profiles from API by email
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

  // Search term change handler
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Search logic based on search term
  useEffect(() => {
    let filtered = profiles;

    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.profile?.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterData(filtered);
  }, [searchTerm, profiles]);

  // Handle report user
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
        icon: "warning",
        title: "Warning!",
        text: "Please select a reason for reporting.",
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
          icon: "success",
          title: "Reported!",
          text: "User reported successfully.",
        });

        setDropdownVisible((prev) => ({
          ...prev,
          [profileId]: false,
        }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Error reporting user.",
        });
      }
    } catch (error) {
      console.error("Error reporting user:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Error reporting user.",
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
        `/api/add-review?id=${selectedProfile._id}`,
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
  console.log(selectedProfile);

  return (
    <div className="mx-10">
    <h2 className="text-3xl text-center font-bold text-violet-500 mt-10">
      Freelancer profiles
    </h2>

    <div className="flex justify-between items-center mt-10 mx-5">
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

      
    </div>

    {loading ? (
      
      <Loading />
    ) : (
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:my-10 md:my-5 my-5 place-items-center gap-8">
        {filterData.length > 0 ? (
          filterData.map((profile) => (
            <Card
              className="py-4 w-[300px] h-[550px] lg:w-[400px] lg:h-[450px] bg-violet-100 border-2 border-violet-400"
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
              <div className="  px-4 flex-col items-start gap-1">
                <div className="">
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

                </div>
              </div>
               <CardFooter>
              <div className="flex justify-between items-end mb-8 w-full">
                  <Button
                    className="text-sm text-white bg-[#a362e4] mt-3 hover:underline"
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
                
                </CardFooter>
                {dropdownVisible[profile._id] && (
                  <Select
                    label="Select Report Reason"
                    placeholder="Select a reason"
                    onChange={(event) =>
                      handleReasonChange(profile._id, event.target.value)
                    }
                    className="mt-1"
                  >
                    {reportReasons.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
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
          <div className="b h-[100px]">
            <Marquee pauseOnHover={true} className="flex gap-5">
              {selectedProfile?.reviewCollection?.map((rev) => (
                <div
                  key={rev._id}
                  className="w-[250px] mx-5 flex flex-col items-center"
                >
                  <Image
                    src={rev.reviewerImage}
                    alt="Reviewer Image"
                    width={50}
                    height={50}
                    className="w-10 h-10  rounded-full"
                  />
                  <strong>{rev.reviewerName}</strong>
                  <p>{rev.description}</p>
                </div>
              ))}
            </Marquee>
          </div>

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
