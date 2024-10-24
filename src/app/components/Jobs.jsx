"use client";
import { CardContext } from "@/ServicesContext/ServicesContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function Jobs() {
  const { isLoading, isError, refetch } = useContext(CardContext);
  const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpenChange } = useDisclosure();
  const [selectedJobId, setSelectedJobId] = useState(null);
  const currUser = session?.user;
  console.log(currUser);
  console.log(jobs);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("/api/get-job");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Apply Job post
  const onSubmit = async (data) => {
    // const applyAt = new Date();
    const jobId = selectedJobId;
    const user = session?.user;

    if (!jobId || !user) {
      console.error("Missing job ID or user information.");
      return;
    }

    const postData = {
      appliedPeople: [user],
    };

    try {
      const response = await axios.patch(
        `/api/update-job?id=${jobId}`,
        postData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Job applied successfully!",
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
        refetch();
        onOpenChange(false);
      } else {
        Swal.fire({
          title: "Failed to apply for the job!",
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      Swal.fire({
        title: "Failed to apply for the job!",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
    }
  };
  console.log(jobs);
  return (
    <div>
      <h1 className="text-4xl font-bold bg-violet-500 bg-clip-text text-transparent text-center mt-5">
        Jobs
      </h1>
      <div className="my-5 h-[500px]">
        {isLoading ? (
          <div className="flex justify-center my-10">
            <Spinner size="lg" color="success" />
          </div>
        ) : (

          <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-5 gap-3 mx-5">
            {jobs?.map((job) => (
              !job.hired && <Card
              className="py-4 border-2 border-violet-600  bg-slate-200 shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg animate__animated animate__fadeIn"
              key={job._id}
            >
              <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
                <h5 className="text-xl font-semibold">{job.title}</h5>
              </CardBody>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
                <div className="flex flex-col">
                  <small>
                    <strong> Timeline:</strong> {job.timeline}
                  </small>
                </div>
                <small>
                  <strong>Price:</strong> {job.budget}
                </small>

         

                      <small className="text-xs flex items-center">
                        <strong>Skills:</strong>
                        <div className="pl-1 flex gap-1">
                          <p className="text-xs">{job.skills.join(", ")}</p>
                        </div>
                      </small>
                      <p className="text-xs">
                        <strong>Description:</strong> {job.description}
                      </p>
                      <p className="text-sm">
                        <strong>Applied People : </strong>
                        {job?.appliedPeople?.length || 0}
                      </p>
                      <div className="mt-5 w-full flex justify-between">
                        {currUser?.role === "freelancer" && (
                          <Button
                            size="md"
                            className="bg-blue-500 text-white hover:bg-[#90EE90] hover:text-black"
                            onPress={() => {
                              setSelectedJobId(job._id);
                              onOpenChange(true);
                            }}
                          >
                            Apply
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                )
            )}
          </div>
        )}
      </div>

      <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Information
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <p>
                    Are You Eligible to Apply for This Job? Before proceeding,
                    please make sure you meet all the necessary qualifications
                    and requirements for this position. If you&apos;re confident
                    that you are eligible, click “Apply Now” to submit your
                    application. Otherwise, you can click “Go Back” to review
                    the job details.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Confirm to apply
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
