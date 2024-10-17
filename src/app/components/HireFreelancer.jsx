"use client";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";

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
    const res = await axios.patch(
      `/dashboard/posted-job-client/api/${newData[0]._id}`,
      update
    );
    if (res.data.message) {
      alert(res.data.message);
      refetch();
    }
  };
  const newData = jobPost.filter((i) => i._id == params.id);
  console.log(newData);
  return (
    <div>
      <h1>Applied People here...</h1>
      {newData[0]?.hired ? (
        <p>go to management route</p>
      ) : (
        <Table aria-label="Example static collection table">
          <TableHeader className="text-center">
            <TableColumn>Profile</TableColumn>
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
