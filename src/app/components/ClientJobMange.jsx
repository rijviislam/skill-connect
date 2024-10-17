"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import { Progress } from "@nextui-org/react";

const ClientJobMange = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const {
    data: jobPost = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["jobPost", userEmail],
    queryFn: async () => {
      const result = await axios.get(
        `/api/posted-job?email=${encodeURIComponent(userEmail)}`
      );

      if (result.status !== 200) {
        throw new Error("Network response was not ok");
      }

      return result.data;
    },
    enabled: !!userEmail, // Ensure the query runs only when userEmail is available
  });
  console.log(jobPost, "fooomm  ");
  return (
    <div>
      {jobPost &&
        jobPost.map(
          (job, index) =>
            job.hired && (
              <Card key={index} className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{job.title}</p>
                    <p className="text-sm">Freelancer: {job.freelancer}</p>
                    <p className="text-small text-default-500">
                      {job.description}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Progress
                    size="sm"
                    radius="sm"
                    classNames={{
                      base: "max-w-md",
                      track: "drop-shadow-md border border-default",
                      indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                      label: "tracking-wider font-medium text-default-600",
                      value: "text-foreground/60",
                    }}
                    label="Working Progress"
                    value={job.ongoingWork}
                    showValueLabel={true}
                  />
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button color="success">Message</Button>
                    {
                        job.ongoingWork == 100 ? <Button  color="success">Make Payment</Button> : <Button  color="success"disabled >Make Payment</Button>
                    }
                </CardFooter>
              </Card>
            )
        )}
    </div>
  );
};

export default ClientJobMange;
