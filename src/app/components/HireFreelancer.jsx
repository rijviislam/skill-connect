"use client";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { FaBriefcase, FaDollarSign, FaClock, FaTools, FaUser } from "react-icons/fa"; // Importing icons from react-icons

const HireFreelancer = ({ params }) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const {
    data: jobPost = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["jobPost", params.id],
    queryFn: async () => {
      const result = await axios.get(`/api/posted-job?email=${userEmail}`);

      if (result.status !== 200) {
        throw new Error("Network response was not ok");
      }

      return result.data;
    },
    enabled: !!userEmail, // Ensure the query runs only when userEmail is available
  });

  const handleHire = async (email) => {
    const update = {
      hired: true,
      freelancer: email,
      ongoingWork: 1,
    };
    try {
      const res = await axios.patch(`/dashboard/posted-job-client/api/${newData[0]._id}`, update);
      if (res.data.message) {
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          refetch(); // Refresh the data after hiring
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an issue hiring the freelancer.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const newData = jobPost.filter((i) => i._id == params.id);

  return (
    <div className="p-6 bg-gradient-to-r from-violet-50 via-gree-200 to-violet-300 border-2 border-violet-400 shadow-lg rounded-lg">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Job Information</h1>

      {/* Job Information */}
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
          <FaBriefcase className="mr-2 text-blue-600" /> 
          Title: <span className="ml-2 font-normal">{newData[0]?.title}</span>
        </p>
        <p className="text-xl font-semibold text-gray-700 mb-2 flex items-center">
          <FaTools className="mr-2 text-purple-600" />
          Skills Required: <span className="ml-2 font-normal">{newData[0]?.skills?.join(', ')}</span>
        </p>
        
      </div>

      {/* Applied People */}
      <h2 className="text-2xl font-bold mt-6 text-gray-800">Applied People</h2>

      {newData[0]?.hired ? (
        <div className="mt-4 p-4 border-2 border-violet-500 rounded-lg bg-violet-50">
          <p className="mb-4 text-lg font-semibold text-violet-700">
            You have already hired <span className="font-bold">{newData[0]?.freelancer}</span>. Proceed to management.
          </p>
          <Button 
            onClick={() => router.push('/dashboard/manageJobs')}
            color="primary"
            auto
          >
            Go to Manage jobs
          </Button>
        </div>
      ) : (
        <Table aria-label="Applicants" css={{ mt: "$10" }}>
          <TableHeader className="text-center">
            <TableColumn>Freelancer Email</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {newData[0]?.appliedPeople?.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleHire(job.email)} color="success">
                    Hire
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default HireFreelancer;
