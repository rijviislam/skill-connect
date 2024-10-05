"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosCreate } from "react-icons/io";
export default function MyServices() {
  const { data: session, status } = useSession();
  const { isOpen, onOpenChange } = useDisclosure();
  const category = [
    { key: "node.js", label: "Node.js" },
    { key: "mern stack", label: "MERN Stack" },
    { key: "Web development", label: "Web Developer" },
    { key: "backend developer", label: "Backend Developer" },
    { key: "devops engineer", label: "DevOps Engineer" },
    { key: "php developer", label: "PHP Developer" },
    { key: "full stack developer", label: "Full Stack Developer" },
    { key: "ui/ux designer", label: "UI/UX Designer" },
    { key: "graphics designer", label: "Graphics Designer" },
    { key: "react", label: "React" },
  ];
  const userEmail = session?.user?.email;
  console.log(userEmail);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;
    const createdAt = new Date();

    const postData = {
      ...data,
      createdAt,
      userEmail,
    };
    try {
      const response = await fetch(`${baseUrl}/api/my-services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Job posted successfully:", result);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/my-services-get");
        const data = await response.json();
        setMyServices(data);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // If session is still loading, wait
  //     if (status === "loading") {
  //       return; // Return early if session is still being fetched
  //     }

  //     // Check if session exists and contains email
  //     const userEmail = session?.user?.email;

  //     if (!userEmail) {
  //       console.error("User email not found");
  //       return;
  //     }

  //     try {
  //       const response = await fetch(`/api/my-services-get?email=${userEmail}`);
  //       const data = await response.json();
  //       setMyServices(data);
  //     } catch (error) {
  //       console.error("Error fetching job posts:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleDelete = (id) => {
  //   console.log("Deleted Id", id);

  //   // Step 1: Call your API to delete the post from the database with the id as a query parameter
  //   fetch(`/api/service-delete?id=${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to delete post");
  //       }
  //       // Step 2: Update the UI by removing the post from the state
  //       setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting post:", error);
  //     });
  // };

  const handleDelete = async (id) => {
    console.log("Deleted Id", id);

    try {
      // Step 1: Call your API to delete the post from the database
      const response = await fetch(`/api/service-delete?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Step 2: Update the UI by removing the post from the state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id)); // Assuming _id is the unique identifier in posts
      console.log("Post deleted and UI updated");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  console.log(myServices);
  return (
    <div>
      <Button color="success" onPress={() => onOpenChange(true)}>
        Create a Service <IoIosCreate />
      </Button>
      {/* GRID  */}
      <div className="my-5 h-[500px]">
        {loading ? (
          <div className="flex justify-center my-10">
            <Spinner size="lg" color="success" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-5 gap-3">
            {myServices?.map((service, idx) => (
              <Card className="py-4" key={idx}>
                <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5">
                  <h5 className="text-sm font-semibold">{service.title}</h5>
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
                  <div className="flex flex-col">
                    <small>
                      <strong>Delivery Time:</strong> {service.date}
                    </small>
                    <small>
                      <strong>Posted Time: </strong>
                      {new Date(service.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </small>
                  </div>
                  <small>
                    <strong>Price:</strong> {service.price}
                  </small>
                  <p className="text-xs">{service.description}</p>
                  <small className="text-xs flex items-center">
                    <strong>Skills:</strong>
                    <div className="pl-1 flex gap-1">
                      <p className="text-xs">{service.tags}</p>
                    </div>
                  </small>
                  <div className="mt-5 w-full flex justify-between">
                    <Button
                      size="md"
                      className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
                    >
                      Edit
                    </Button>
                    <Button
                      size="md"
                      className="bg-red-800 text-white hover:bg-[#b12d2d] "
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
      {/* MODAL  */}
      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Post Service
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <div className="flex gap-5">
                    <Input
                      type="text"
                      variant="bordered"
                      label="Title"
                      placeholder="Enter your title"
                      {...register("title")}
                    />
                    <Input
                      type="number"
                      variant="bordered"
                      label="Price"
                      placeholder="Enter your price"
                      {...register("price")}
                    />
                  </div>

                  <div className="flex gap-5">
                    {/* <DateInput
                      variant="bordered"
                      label={"Delivery Time"}
                      placeholderValue={new CalendarDate(1995, 11, 6)}
                      {...register("delivery")}
                    /> */}
                    <Input
                      type="date"
                      variant="bordered"
                      label="Date"
                      placeholder="Enter your Date"
                      {...register("date")}
                    />
                    <Input
                      type="number"
                      variant="bordered"
                      label="Revisions"
                      placeholder="Enter your revisions"
                      {...register("revisions")}
                    />
                  </div>
                  <div className="flex gap-5">
                    <Select
                      label="Tags"
                      placeholder="Select an tags"
                      selectionMode="multiple"
                      className="max-w-1/2"
                      {...register("tags")}
                    >
                      {category.map((animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
                      ))}
                    </Select>
                    <Input
                      type="file"
                      variant="bordered"
                      placeholder="Enter your image"
                      className="h-[60px]"
                      {...register("image")}
                    />
                  </div>
                  <Textarea
                    variant="faded"
                    label="Description"
                    placeholder="Enter your description"
                    className="max-w-full"
                    {...register("description")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Save
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
