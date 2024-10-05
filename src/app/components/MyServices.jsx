"use client";
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
import { useForm } from "react-hook-form";
import { IoIosCreate } from "react-icons/io";
export default function MyServices() {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const createdAt = new Date();
  };

  return (
    <div>
      <Button color="success" onPress={() => onOpenChange(true)}>
        Create a Service <IoIosCreate />
      </Button>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1"></div>
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
