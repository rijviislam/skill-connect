"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchIcon } from "./SearchIcon";
import Swal from "sweetalert2";

export default function ClientProfile() {
  const reportReasons = [
    { key: "spam", label: "Spam or irrelevant content" },
    { key: "harassment", label: "Harassment or bullying" },
    { key: "fake_profile", label: "Fake profile" },
    { key: "inappropriate", label: "Inappropriate content" },
    { key: "other", label: "Other" },
  ];

  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [selectedReasons, setSelectedReasons] = useState({});

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

  useEffect(() => {
    fetchProfiles();
  }, []);

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
  


  return (
    <div className="mx-10">
      <h2 className="text-4xl font-bold bg-gradient-to-l from-[#ADD8E6] to-[#00008B] bg-clip-text text-transparent text-center">
        Client Profiles
      </h2>

      {/* SEARCH BAR */}
      <div className="flex justify-between items-center mt-10">
        <div className="lg:w-[400px] mt-5">
          <Input
            isClearable
            radius="lg"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for clients..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
      </div>

      {/* GRID CARD */}
      {loading ? (
        <div className="flex justify-center my-10">
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:my-10 md:my-5 my-5 place-items-center gap-5">
          {Array.isArray(filterData) && filterData.length > 0 ? (
            filterData.map((profile, idx) => (
              <Card
                className="py-4  lg:w-[450px] min-w-[350px] h-[450px]"
                key={idx}
              >
                <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
                  <Image
                    alt="Profile avatar"
                    className="object-cover w-[100px] h-[100px] rounded-full"
                    src={
                      profile.profile?.avatarUrl?.startsWith("http")
                        ? profile.profile?.avatarUrl
                        : "/images/default-avatar.png"
                    }
                    width={100}
                    height={100}
                  />

                  <div className="mt-3">
                    <h4 className="text-sm font-semibold">
                      {profile.username}
                    </h4>
                    <h5 className="text-sm">
                      {profile.profile?.bio || "Client"}
                    </h5>
                    <p>
                      <strong>Email:</strong> {profile.email || "N/A"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {profile.profile?.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Location:</strong>{" "}
                      {profile.profile?.address?.city},{" "}
                      {profile.profile?.address?.country || "N/A"}
                    </p>
                  </div>
                </CardBody>

                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
                  <p>
                    <strong>Services:</strong>{" "}
                    {profile.services.length > 0
                      ? profile.services.join(", ")
                      : "No services listed"}
                  </p>
                  <p>
                    <strong>Ratings:</strong>{" "}
                    {profile.ratings.averageRating || "0"} ⭐ (
                    {profile.ratings.totalRatings} reviews)
                  </p>
                  <p>
                    <strong>Payment Info:</strong>{" "}
                    {profile.paymentInfo.bankDetails || "N/A"}
                  </p>
                  <p>
                    <strong>Skills:</strong>{" "}
                    {profile.profile?.skills.length > 0
                      ? profile.profile?.skills.join(", ")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    {profile.profile?.socialLinks?.linkedin ? (
                      <a
                        href={profile.profile?.socialLinks?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Profile
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>

                  {/* Report User */}
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
                </CardHeader>
              </Card>
            ))
          ) : (
            <p>No clients found</p>
          )}
        </div>
      )}
    </div>
  );
}
