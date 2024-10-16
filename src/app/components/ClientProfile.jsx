"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Input,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SearchIcon } from "./SearchIcon";

export default function ClientProfile() {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Filter logic based on search term
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

  return (
    <div className="mx-10">
      <h2 className="text-4xl font-bold bg-gradient-to-l from-[#ADD8E6] to-[#00008B] bg-clip-text text-transparent text-center">
        Client Profile Page
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
              <Card className="py-4" key={idx}>
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
                      <strong>Location:</strong> {profile.profile?.address?.city}, {profile.profile?.address?.country || "N/A"}
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
                    <strong>Ratings:</strong> {profile.ratings.averageRating || "0"} ⭐ (
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
