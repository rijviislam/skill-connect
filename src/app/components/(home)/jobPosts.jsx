"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { FaArrowRight, FaClipboardList, FaDollarSign, FaClock, FaTools } from 'react-icons/fa';
import Loader from '../../../app/loading'; // Adjust the import path as needed

const JobPosts = () => {      

    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading
    const [isOpen, setIsOpen] = useState(false); // Modal open/close state
    const [selectedJob, setSelectedJob] = useState(null); // State for selected job

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch('/api/get-job'); 
                const data = await response.json();
                setJobPosts(data);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    // Function to open the modal and set the selected job post
    const handleOpenModal = (job) => {
        setSelectedJob(job);
        setIsOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedJob(null);
    };

    // If loading, show the loader
    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <h2 className="container mx-auto text-left text-4xl font-medium text-[#2e8b57] mb-7 mt-8 flex items-center">
                Recently posted jobs
                <FaArrowRight className="ml-2" />
            </h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-5">
                {jobPosts.length > 0 ? (
                    jobPosts.map((job) => (
                        <div key={job._id}>
                            <Card className="bg-blue-50 h-[350px] shadow-md border-blue-500 border-2 hover:bg-blue-100 p-4 transition-all duration-300">
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-2xl font-bold leading-none text-black">{job.title}</h4>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-0 py-0 text-small text-default-400 overflow-hidden" style={{ height: '150px' }}>
                                    <p className="mb-2 flex items-center"><FaClipboardList className="mr-2 text-blue-600" /> <strong className="font-bold text-black">Description:</strong> {job.description}</p>
                                    <p className="mb-2 flex items-center"><FaDollarSign className="mr-2 text-green-600" /> <strong className="font-bold text-black">Budget:</strong> {job.budget}</p>
                                    <p className="mb-2 flex items-center"><FaClock className="mr-2 text-orange-600" /> <strong className="font-bold text-black">Timeline:</strong> {job.timeline}</p>
                                    <p className="mb-2 flex items-center"><FaTools className="mr-2 text-purple-600" /> <strong className="font-bold text-black">Skills:</strong> {job.skills.join(', ')}</p>
                                    <hr className="my-2" />
                                </CardBody>
                                <CardFooter className="gap-3 flex justify-between items-center">
                                    <span className="text-default-600 font-bold cursor-pointer" onClick={() => handleOpenModal(job)}>
                                        More info
                                    </span>
                                    <FaArrowRight className="text-default-600 hover:text-red-500 transition-colors cursor-pointer text-2xl" />
                                </CardFooter>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>No job posts found</p>
                )}
            </div>

            {/* Modal for job details */}
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
                            <strong>Skills Required:</strong> {selectedJob?.skills?.join(', ') || "N/A"}
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
