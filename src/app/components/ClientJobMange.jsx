"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Payment from "./Payment";
// MOVE THIS PL ON ENV FILE //
const stripePromise = loadStripe(
  "pk_test_51QCpuOGEX6Eqe35Hv4dantxhBHbgULI7BLvzdscxlq8EmRz4637jBLEf0uzU79yliwANHLBrBubzBWXckbMCZxaO003DhTl6n3"
);

const ClientJobMange = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const { isOpen, onOpenChange } = useDisclosure();

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
    enabled: !!userEmail, //
  });

  console.log(jobPost, "fooomm  ");

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {jobPost &&
        jobPost.map(
          (job, index) =>
            job.hired && (
              <Card
                key={index}
                className="max-w-[400px] border-2 border-violet-500 bg-slate-100 shadow-xl"
              >
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
                <CardFooter className=" gap-2">
                  <Button color="success">Message</Button>
                  {job.ongoingWork === 100 ? (
                    // <Button color="success"> Make Payment </Button>
                    <p>Rijvi</p>
                  ) : (
                    <Button
                      onPress={() => {
                        onOpenChange(true);
                      }}
                      color="success"
                    >
                      Make Payment
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
        )}

      <Modal
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="bg-purple-200"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Payment Form:
          </ModalHeader>
          <ModalBody>
            <Payment />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => onOpenChange(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ClientJobMange;
