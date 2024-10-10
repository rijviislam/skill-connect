"use client";
import { CardContext } from "@/ServicesContext/ServicesContext";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import { useSession } from "next-auth/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { IoIosCreate } from "react-icons/io";
import Swal from "sweetalert2";
import ServicesCard from "./ServicesCard";

export default function MyServices() {
  const { refetch, isLoading, isError } = useContext(CardContext);
  const { data: session } = useSession();
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // POST SERVICE
  const onSubmit = async (data) => {
    const createdAt = new Date();
    const postData = { ...data, createdAt, userEmail, tags: data.tags || [] };

    try {
      const response = await fetch("/api/my-services", {
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

      refetch();
      console.log("Post deleted and UI updated");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error Occer...</h1>;
  return (
    <div>
      <Button color="success" onPress={() => onOpenChange(true)}>
        Create a Service <IoIosCreate />
      </Button>
      {/* GRID */}

      <ServicesCard handleDelete={handleDelete} />
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
                    <Select
                      label="Tags"
                      placeholder="Select tags"
                      selectionMode="multiple"
                      className="max-w-1/2"
                      {...register("tags")}
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
