"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Image,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "./SearchIcon";

export default function FreelancerProfile() {
  const category = [
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

  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;
  const { isOpen, onOpenChange } = useDisclosure();
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/profiles`);
      const data = await response.json();
      setProfiles(data);
      setFilterData(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [baseUrl]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (categoryKey) => {
    setSelectedCategory(categoryKey);
  };

  // useEffect(() => {
  //   let filtered = profiles;

  //   if (searchTerm) {
  //     filtered = filtered.filter(
  //       (profile) =>
  //         profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         profile.profession.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   if (selectedCategory) {
  //     filtered = filtered.filter(
  //       (profile) =>
  //         profile.profession.toLowerCase() === selectedCategory.toLowerCase()
  //     );
  //   }

  //   setFilterData(filtered);
  // }, [searchTerm, selectedCategory, profiles]);

  useEffect(() => {
    let filtered = profiles;

    if (searchTerm) {
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          profile.profession.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (profile) =>
          profile.profession.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilterData(filtered);
  }, [searchTerm, selectedCategory, profiles]);

  return (
    <div className="mx-10">
      <h2 className="text-4xl font-bold bg-gradient-to-l from-[#90EE90] to-[#2E8B57] bg-clip-text text-transparent text-center">
        Freelancer Profile Page
      </h2>

      {/* SEARCH BAR */}
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

        {/* CATEGORY FILTER */}
        <Select
          label="Filter by Categories"
          placeholder="Select a category"
          className="max-w-xs"
          onChange={(event) => handleFilter(event.target.value)}
        >
          {category.map((item) => (
            <SelectItem key={item.key} value={item.key}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* GRID CARD */}
      {loading ? (
        <div className="flex justify-center my-10">
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:my-10 md:my-5 my-5 place-items-center gap-5">
          {filterData?.map((profile, idx) => (
            <Card className="py-4" key={idx}>
              <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
                <Image
                  alt="Card background"
                  className="object-cover w-[100px] h-[100px] rounded-full"
                  src="https://nextui.org/images/hero-card-complete.jpeg"
                  width={270}
                />
                <div className="mt-3">
                  <h4 className="text-sm">{profile.name}</h4>
                  <h5 className="text-sm font-semibold">
                    {profile.profession}
                  </h5>
                  <Link
                    href="#"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Portfolio
                  </Link>
                </div>
              </CardBody>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
                <small>
                  <strong>Location:</strong> {profile.location}
                </small>
                <small>
                  <strong>Availability:</strong> {profile.availability}
                </small>
                <p className="text-xs">
                  A Full Stack Developer builds both frontend and backend of web
                  applications, handling user interfaces, server logic,
                  databases, and API integrations, ensuring the whole system
                  works smoothly.
                </p>
                <small className="text-xs flex items-center">
                  <strong>Skills and Expertise:</strong>
                  <div className="pl-1 flex gap-1">
                    {profile?.skills?.map((skill, index) => (
                      <p key={index} className="text-sm">
                        {skill}
                      </p>
                    ))}
                  </div>
                </small>
                <div className="mt-5 w-full">
                  <Button
                    size="md"
                    onPress={() => onOpenChange(true)}
                    className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
                  >
                    Details
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* MODAL */}
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
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
