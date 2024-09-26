"use client"

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { FaArrowRight, FaClipboardList, FaDollarSign, FaClock, FaTools } from 'react-icons/fa'; // Importing necessary icons

const JobPosts = () => {
    const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;      

    const [jobPosts, setJobPosts] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/get-job`); 
                const data = await response.json();
                setJobPosts(data);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <h1 className="col-span-full text-center text-5xl font-semibold  text-[#2e8b57] mb-4 mt-8">Recently posted jobs</h1>
            <hr className=" col-span-full text-center border-t-2 border-[#2e8b57] mb-8 mx-auto w-2/12 md:w-1/3" />
            {jobPosts.length > 0 ? (
                jobPosts.map((job) => (
                    <div key={job._id} className="transition-transform transform hover:scale-105">
                        <Card className="bg-green-50 max-w-[600px]   shadow-md border-green-500 border-2 hover:bg-green-100 p-4"> {/* Reduced padding */}
                            <CardHeader className="justify-between">
                                <div className="flex gap-5">
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-2xl font-bold leading-none text-black">{job.title}</h4>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="px-0 py-0 text-small text-default-400"> {/* Removed padding */}
                                <p className="mb-2"><FaClipboardList className="mr-2" /> <strong className="font-bold text-black">Description:</strong> {job.description}</p>
                                <p className="flex items-center  mb-2"><FaDollarSign className="mr-2" /> <strong className="font-bold text-black">Budget:</strong> {job.budget}</p>
                                <p className="flex items-center mb-2"><FaClock className="mr-2" /> <strong className="font-bold text-black">Timeline:</strong> {job.timeline}</p>
                                <p className="flex items-center mb-2"><FaTools className="mr-2" /> <strong className="font-bold text-black">Skills:</strong> {job.skills.join(', ')}</p>
                                <hr className="my-2" />
                            </CardBody>
                            <CardFooter className="gap-3 flex justify-between items-center"> {/* Adjusted layout */}
                                <span className="text-default-600 font-bold">more info</span>
                                <FaArrowRight className="text-default-600 hover:text-red-500 transition-colors cursor-pointer text-2xl" /> {/* Increased size of the arrow */}
                            </CardFooter>
                        </Card>
                    </div>
                ))
            ) : (
                <p>No job posts found</p>
            )}
        </div>
    );
};

export default JobPosts;
