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
import { useQuery } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { IoIosCreate } from "react-icons/io";
import Swal from "sweetalert2";

export default function MyServices() {
  const { data: session } = useSession();
  const { isOpen, onOpenChange } = useDisclosure();
  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const {
  //   data: services = [],
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["services"],
  //   queryFn: async () => {
  //     const result = await fetch("/api/my-services-get");

  //     if (!result.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await result.json();
  //     if (!data) {
  //       throw new Error("No data returned");
  //     }
  //     return data;
  //   },
  // });

  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["services", userEmail], // Add userEmail to the query key
    queryFn: async () => {
      const result = await fetch(
        `/api/my-services-get?email=${encodeURIComponent(userEmail)}`
      ); // Pass userEmail as a query parameter

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();

      if (!data) {
        throw new Error("No data returned");
      }

      return data;
    },
  });

  console.log(services);

  // POST SERVICE
  const onSubmit = async (data) => {
    const createdAt = new Date();
    const postData = { ...data, createdAt, userEmail, tags: data.tags || [] };

    try {
      const response = await fetch(`${baseUrl}/api/my-services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result) {
        Swal.fire({
          title: "Service Post Successfully!",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      }

      refetch();
      reset();
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  // DELETE SERVICE
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/service-delete?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      if (response.ok) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }

      // Refetch the services to update the UI
      refetch();
      console.log("Post deleted and UI updated");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  if (isError) return <h1>Error Occer</h1>;
  return (
    <div>
      <Button color="success" onPress={() => onOpenChange(true)}>
        Create a Service <IoIosCreate />
      </Button>
      {/* GRID */}
      <div className="my-5 h-[500px]">
        {isLoading ? (
          <div className="flex justify-center my-10">
            <Spinner size="lg" color="success" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-5 gap-3">
            {services?.map((service, idx) => (
              <Card className="py-4" key={service._id}>
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
                      className="bg-red-800 text-white hover:bg-[#b12d2d]"
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
      {/* MODAL */}
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
                    {/* <Select
                      label="Tags"
                      placeholder="Select tags"
                      selectionMode="multiple"
                      className="max-w-1/2"
                      {...register("tags")}
                    >
                      {category.map((cat) => (
                        <SelectItem key={cat.key}>{cat.label}</SelectItem>
                      ))}
                    </Select> */}
                    <Select
                      label="Tags"
                      placeholder="Select tags"
                      selectionMode="multiple"
                      className="max-w-1/2"
                      {...register("tags")}
                      // Ensure this select component correctly handles multiple selections
                    >
                      {category.map((cat) => (
                        <SelectItem key={cat.key} value={cat.label}>
                          {cat.label}
                        </SelectItem>
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
