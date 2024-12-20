"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaClipboardList,
  FaClock,
  FaDollarSign,
  FaTools,
} from "react-icons/fa";
import Loader from "../../../app/loading";

const JobPosts = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/get-job");
        const data = await response.json();
        setJobPosts(data);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedJob(null);
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jobPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(jobPosts.length / postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader />;
  }

  // Function to truncate the description
  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 15) {
      return {
        truncated: words.slice(0, 15).join(" ") + "...",
        full: description,
      };
    }
    return { truncated: description, full: description };
  };

  return (
    <div className="px-4">
      <h2 className="container mx-auto text-left text-3xl sm:text-4xl font-medium text-[#8A2BE2] mb-7 mt-8 flex items-center">
        Recently posted jobs
        <FaArrowRight className="ml-2 text-[#8A2BE2]" />
      </h2>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.length > 0 ? (
          currentPosts.map((job) => {
            const { truncated, full } = truncateDescription(job.description);

            return (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card className="bg-violet-50 shadow-md p-5 border-violet-500 border-2 hover:bg-violet-100 transition-all duration-300 h-[300px]">
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-xl sm:text-2xl font-bold leading-none text-black">
                          {job.title}
                        </h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="flex flex-col justify-between px-0 py-0 text-small text-default-400 overflow-hidden">
                    <div>
                      <p className="mb-2 flex items-center">
                        <FaDollarSign className="mr-2 text-green-600" />
                        <strong className="font-bold text-black">
                          Budget:
                        </strong>{" "}
                        {job.budget}
                      </p>
                      <p className="mb-2 flex items-center">
                        <FaClock className="mr-2 text-orange-600" />
                        <strong className="font-bold text-black">
                          Timeline:
                        </strong>{" "}
                        {job.timeline}
                      </p>
                      <p className="mb-2 flex items-center">
  <FaTools className="mr-2 text-purple-600" />
  <strong className="font-bold text-black">
    Skills:
  </strong>{" "}
  {Array.isArray(job.skills) ? job.skills.join(", ") : "N/A"}
</p>

                      <p className="mb-2 flex items-start">
                        <FaClipboardList className="mr-2 text-violet-600" />
                        <strong className="font-bold text-black mr-1">
                          Description:
                        </strong>{" "}
                        {truncated}
                        {/* {full !== truncated && (
                          <span
                            className="text-blue-500 cursor-pointer"
                            onClick={() => {
                              setSelectedJob(job);
                              handleOpenModal(job);
                            }}
                          >
                            {" "}
                            See More
                          </span>
                        )} */}
                      </p>
                    </div>
                    <hr className="my-2" />
                  </CardBody>
                  <CardFooter className="gap-3 flex justify-between items-center">
                    <span
                      className="text-default-600 font-bold cursor-pointer"
                      onClick={() => handleOpenModal(job)}
                    >
                      More info
                    </span>
                    <FaArrowRight className="text-default-600 hover:text-red-500 transition-colors cursor-pointer text-2xl" />
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <p>No job posts found</p>
        )}
      </div>

      {/* Pagination  */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-2 text-sm sm:text-base ${
              currentPage === index + 1
                ? "bg-violet-600 text-white"
                : "bg-white text-violet-600 border"
            }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={handleCloseModal} placement="center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Job Details: {selectedJob?.title || "N/A"}
          </ModalHeader>
          <ModalBody>
            <p>
              <strong>Description:</strong> {selectedJob?.description || "N/A"}
            </p>
            <p>
              <strong>Budget:</strong> {selectedJob?.budget || "N/A"}
            </p>
            <p>
              <strong>Timeline:</strong> {selectedJob?.timeline || "N/A"}
            </p>
            <p>
  <strong>Skills Required:</strong>{" "}
  {Array.isArray(selectedJob?.skills) ? selectedJob.skills.join(", ") : "N/A"}
</p>

          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default JobPosts;