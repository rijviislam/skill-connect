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
  const categories = [
    { key: "web developer", label: "Web Developer" },
    { key: "frontend developer", label: "Frontend Developer" },
    { key: "backend developer", label: "Backend Developer" },
    { key: "wordpress developer", label: "WordPress Developer" },
    { key: "php developer", label: "PHP Developer" },
    { key: "laravel developer", label: "Laravel Developer" },
    { key: "ui designer", label: "UI Designer" },
    { key: "graphics designer", label: "Graphics Designer" },
  ];
  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;
  const { isOpen, onOpenChange } = useDisclosure();

  const [profiles, setProfiles] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async (profession = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}/api/profiles?profession=${profession}`
      );
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [baseUrl]);

  // Handler for search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    fetchProfiles(event.target.value);
  };

  console.log(profiles);

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
            value={searchTerm} // Bind the searchTerm to input
            onChange={handleSearchChange} // Update searchTerm when input changes
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <Select
          items={categories}
          label="Filter by Categories"
          placeholder="Select an categories"
          className="max-w-xs"
        >
          {(categories) => <SelectItem>{categories.label}</SelectItem>}
        </Select>
      </div>

      {/* GRID CARD  */}

      {loading ? (
        <div className="flex justify-center my-10">
          <CircularProgress size="lg" aria-label="Loading..." />
        </div>
      ) : (
        // GRID CARD
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:my-10 md:my-5 my-5 place-items-center gap-5">
          {profiles?.map((profile, idx) => {
            return (
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
                    {" "}
                    <strong>Location:</strong> {profile.location}
                  </small>
                  <small>
                    <strong>Availability:</strong> {profile.availability}
                  </small>
                  <p className="text-xs">
                    A Full Stack Developer builds both frontend and backend of
                    web applications, handling user interfaces, server logic,
                    databases, and API integrations, ensuring the whole system
                    works smoothly.
                  </p>
                  <small className="text-xs flex items-center">
                    {" "}
                    <strong>Skills and Expertise:</strong>{" "}
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
            );
          })}
        </div>
      )}

      {/* MODAL  */}
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
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="primary">Hire</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

FreelancerProfile.jsx;
