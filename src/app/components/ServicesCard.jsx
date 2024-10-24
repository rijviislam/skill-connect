import { CardContext } from "@/ServicesContext/ServicesContext";
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
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Loading from "../loading";

export default function ServicesCard({ handleDelete }) {
  const { services, refetch, isLoading, isError } = useContext(CardContext);
  const { isOpen, onOpenChange } = useDisclosure();
  const [selectedService, setSelectedService] = useState(null); // State to track selected service
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleEditClick = (service) => {
    setSelectedService(service); // Store the clicked service
    reset(service); // Reset form fields with selected service data
    onOpenChange(true); // Open the modal
  };
  // Submit handler for updating the service

  const onSubmit = async (data) => {
    try {
      const { _id, ...updatedFields } = data; // Destructure and exclude _id
      const response = await axios.patch(
        `http://localhost:3000/api/update-service?id=${selectedService._id}`,
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
  };
  if (isLoading) return <h1><Loading/></h1>;
  if (isError) return <h1>Error...</h1>;

  return (
    <div>
      <div className="my-5 h-[500px]">
        {isLoading ? (
          <div className="flex justify-center my-10">
            <Spinner size="lg" color="success" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-5 gap-3">
            {services?.map((service) => (
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
                    {/* <div className="pl-1 flex gap-1">
                      <p className="text-xs">{service.tags.join(", ")}</p>
                    </div> */}
                    <div className="pl-1 flex gap-1">
                      <p className="text-xs">{service.tags}</p>
                    </div>
                  </small>
                  <div className="mt-5 w-full flex justify-between">
                    <Button
                      size="md"
                      className="bg-[#2E8B57] text-white hover:bg-[#90EE90] hover:text-black"
                      onPress={() => handleEditClick(service)}
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
                Edit Service
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
                    Save & Change
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
