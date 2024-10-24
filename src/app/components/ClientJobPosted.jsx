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
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function ClientJobPosted() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const { isOpen, onOpenChange } = useDisclosure();
  const [selectedService, setSelectedService] = useState(null); // State to track selected service

  const availableTitles = [
    { key: "website development", label: "Website Development" },
    { key: "mobile app development", label: "Mobile App Development" },
    { key: "graphic design", label: "Graphic Design" },
    { key: "seo services", label: "SEO Services" },
    { key: "content writing", label: "Content Writing" },
    { key: "digital marketing", label: "Digital Marketing" },
    { key: "data analysis", label: "Data Analysis" },
    { key: "virtual assistant", label: "Virtual Assistant" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const handleEditClick = (service) => {
    setSelectedService(service); // Store the clicked service
    reset(service); // Reset form fields with selected service data
    onOpenChange(true); // Open the modal
  };

  const onSubmit = async (data) => {
    try {
      const { _id, ...updatedFields } = data; // Destructure and exclude _id
      const response = await axios.patch(
        `/api/update-job?id=${selectedService._id}`,
        updatedFields // Send the modified object without _id
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Service updated successfully",
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
        refetch(); // Refetch services to get the updated data
        onOpenChange(false); // Close the modal
      }
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service");
    }
    console.log(data);
  };

  //   // DELETE SERVICE
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/delete-job?id=${id}`, {
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

      refetch();
      console.log("Post deleted and UI updated");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (jobPost.length === 0) return <h1>No Job Available</h1>;
  if (isError) return <h1>Error....</h1>;

  return (
    <>
      <div>
        {isLoading ? (
          <div className="flex justify-center my-10">
            <Spinner size="lg" color="success" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-5 gap-3">
            {jobPost?.map((post) => (
              <Link
                key={post._id}
                href={`/dashboard/posted-job-client/${post._id}`}
              >
                <Card className="py-4 border-2 border-violet-600 bg-gray-200 w-[300px] h-[350px] lg:w-[350px] lg:h-[300px]">
                  <CardBody className="overflow-visible py-2 flex items-start flex-row gap-5  ">
                    <h5 className="text-2xl font-bold">{post.title}</h5>
                  </CardBody>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-1">
                    <div className="flex flex-col">
                      <small>
                        <strong>Timeline:</strong> {post.timeline}
                      </small>
                    </div>
                    <small>
                      <strong>Price:</strong> {post.budget}
                    </small>
                    <p className="text-xs">{post.description}</p>
                    <small className="text-xs flex items-center">
                      {/* <strong>Skills:</strong> {post.tags.join(", ")}  */}
                    </small>
                    <div className="mt-5 w-full flex justify-between">
                      <Button
                        size="md"
                        className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
                        onPress={() => handleEditClick(post)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="md"
                        className="bg-red-800 text-white hover:bg-[#b12d2d]"
                        onClick={() => handleDelete(post._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
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
                Edit Job Post
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
                      type="text"
                      variant="bordered"
                      label="Price"
                      placeholder="Enter your budget"
                      {...register("budget")}
                    />
                  </div>

                  <div className="flex gap-5">
                    <Select
                      label="Tags"
                      placeholder="Select tags"
                      selectionMode="multiple"
                      className="max-w-1/2"
                      {...register("tags")}
                    >
                      {availableTitles.map((cat) => (
                        <SelectItem key={cat.key} value={cat.label}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      type="text"
                      variant="bordered"
                      label="Timeline"
                      placeholder="Enter your timeline"
                      {...register("timeline")}
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
                    Save & Change
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
