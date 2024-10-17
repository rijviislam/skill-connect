"use client";


import { Card, CardBody, CardHeader, Input, Select, SelectItem, Spinner } from "@nextui-org/react";

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

import Image from "next/image";
import { useEffect, useState } from "react";
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

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
        alert("Please select a reason for reporting.");
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
            alert("User reported successfully.");
            setDropdownVisible((prev) => ({
                ...prev,
                [profileId]: false,
            }));
        } else {
            alert("Error reporting user.");
        }
    } catch (error) {
        console.error("Error reporting user:", error);
    }
  };


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
          {Array.isArray(filterData) && filterData.length > 0 ? (
            filterData.map((profile) => (
              <Card

                className="py-4 w-full max-w-md min-w-[300px] h-auto"
                key={profile._id}

                className="py-4  lg:w-[450px] min-w-[350px] h-[350px] "
                key={idx}

              >
                <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5 ">
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

                    <h4 className="text-sm font-semibold">{profile.username}</h4>
                    <h5 className="text-sm">{profile.role || "N/A"}</h5>
                    <p><strong>Email:</strong> {profile.email || "N/A"}</p>
                    <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
                    <p><strong>Location:</strong> {profile.city}, {profile.country}</p>
                  </div>
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
                  <p><strong>Skills:</strong> {profile.skills ? profile.skills : "N/A"}</p>
                  <p><strong>Bio:</strong> {profile.bio || "No bio available"}</p>
                  <p><strong>LinkedIn:</strong> {profile.linkedin ? (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a>
                  ) : "N/A"}</p>

                  {dropdownVisible[profile._id] && (
                    <Select
                      label="Select Report Reason"
                      placeholder="Select a reason"
                      onChange={(event) => handleReasonChange(profile._id, event.target.value)}
                      className="mt-2"
                    >
                      {reportReasons.map((item) => (
                        <SelectItem key={item.key} value={item.key}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}

                  <button
                    className="text-sm text-red-500 mt-3 hover:underline"
                    onClick={() => handleReportUser(profile._id)}
                  >
                    {dropdownVisible[profile._id] ? "Cancel" : "Report User"}
                  </button>

                  {dropdownVisible[profile._id] && (
                    <button
                      className="text-sm text-blue-500 mt-2 hover:underline"
                      onClick={() => submitReport(profile._id)}
                    >
                      Submit Report
                    </button>
                  )}

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
            <p>No profiles found.</p>
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
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                </p>
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
