"use client";
import Loading from "@/app/loading";
import { Button, Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

const OngoingWork = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const {
    data: ongoing = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["ongoingWork", userEmail],
    queryFn: async () => {
      const result = await axios.get(
        `/dashboard/ongoing/api?email=${encodeURIComponent(userEmail)}`
      );

      if (result.status !== 200) {
        throw new Error("Network response was not ok");
      }

      return result.data.res;
    },
    enabled: !!userEmail, // Ensure the query runs only when userEmail is available
  });
  const handleUpdateProgress = async (id)=>{
    const update = {id};
    console.log(update)
    const res = await axios.patch(`/dashboard/ongoing/updateProgress`,update);
    if(isLoading) return <Loading/>
    if(res.data.status){
        refetch();
    }
  }
  return (
    <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      {ongoing.map((project, index) => (
        <Card key={index} className="py-4 bg-violet-100">
          <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
            <h5 className="text-sm font-semibold">{project.title}</h5>
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
            <div className="flex flex-col">
              <small>
                <strong>Timeline:</strong> {project.timeline}
              </small>
            </div>
            <small>
              <strong>Price:</strong> {project.budget}
            </small>
            <p className="text-xs">{project.description}</p>
            <small className="text-xs flex items-center"></small>
            <Progress
                    size="sm"
                    radius="sm"
                    classNames={{
                      base: "max-w-md ",
                      track: "drop-shadow-md border border-default",
                      indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                      label: "tracking-wider font-medium text-default-600",
                      value: "text-foreground/60",
                    }}
                    label="Working Progress"
                    value={project.ongoingWork}
                    showValueLabel={true}
                  />
            <div className="mt-5 w-full flex justify-between">
              <Button
              onClick={()=>handleUpdateProgress(project._id)}
                size="md"
                className="bg-[#8350d5] text-white hover:bg-[#663ba6] hover:text-black"
              >
                Update work 10%
              </Button>
              <Link href={`/dashboard/manageJobs/${project._id}`}>
              <Button
                size="md"
                className="bg-red-800 text-white hover:bg-[#b12d2d]"
              >
                Message
              </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default OngoingWork;
