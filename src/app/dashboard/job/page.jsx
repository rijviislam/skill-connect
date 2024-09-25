"use client";

import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

export default function JobPost() {
  const categories = [
    { key: "web developer", label: "Web Developer" },
    { key: "frontend developer", label: "Frontend Developer" },
    { key: "backend developer", label: "Backend Developer" },
    { key: "wordpress developer", label: "WordPress Developer" },
    { key: "php developer", label: "PHP Developer" },
    { key: "laravel developer", label: "Laravel Developer" },
    { key: "ui designer", label: "UI Designer" },
    { key: "graphics designer", label: "Graphics Designer" },
  ];

  const budgets = [
    { key: "$10", label: "$10" },
    { key: "$20", label: "$20" },
    { key: "$30", label: "$30" },
    { key: "$40", label: "$40" },
    { key: "$50", label: "$50" },
    { key: "$60", label: "$60" },
    { key: "$70", label: "$70" },
    { key: "$80", label: "$80" },
    { key: "$90", label: "$90" },
    { key: "$100", label: "$100" },
    { key: "$110", label: "$110" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newPost = {
      title: data.text,
      description: data.description,
      deadline: data.deadline,
      category: data.category,
      budget: data.budget,
      requiredSkills: data.requiredSkills,
    };
    console.log(newPost);
  };

  return (
    <div className="mx-10 flex items-center flex-col my-10">
      <h2 className="text-4xl font-bold bg-gradient-to-l from-[#90EE90] to-[#2E8B57] bg-clip-text text-transparent text-center">
        Job Post
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-2/3 md:w-2/3 sm:w-2/3 flex flex-col gap-5 mt-10 items-end justify-end shadow-xl p-10 rounded-lg border-2 border-silver"
      >
        <div className="flex items-center justify-center w-full lg:w-full md:w-full sm:w-full gap-5 flex-col">
          <div className="flex w-full gap-5 lg:flex-row md:flex-col flex-col">
            {/* INPUT TEXT AND TEXTAREA  */}
            <div className="lg:w-1/2 flex items-center flex-col gap-5">
              <Input
                key="primary"
                type="text"
                color="primary"
                label="Title"
                placeholder="Post Title"
                defaultValue="Frontend Developer"
                className="max-w-[500px]"
                {...register("text", { required: true })} // Register title
              />
              {errors.text && <span>Title is required</span>}
              <Textarea
                label="Description"
                color="primary"
                placeholder="Enter your description"
                className="max-w-[500px]"
                {...register("description", { required: true })} // Register description
              />
              {errors.description && <span>Description is required</span>}
              <div className="flex w-full items-center justify-center flex-wrap md:flex-nowrap gap-4">
                <DatePicker
                  label="Project Deadline"
                  color="primary"
                  className="max-w-[500px]"
                  isRequired
                  onChange={(date) => setValue("deadline", date)} // Register deadline
                />
                {errors.deadline && <span>Deadline is required</span>}
              </div>
            </div>
            {/* INPUT SELECT CATEGORY AND BUDGET  */}
            <div className="lg:w-1/2 flex items-center flex-col gap-10">
              <Select
                label="Category"
                color="primary"
                placeholder="Select a Category"
                className="max-w-[500px]"
                {...register("category", { required: true })} // Register category
              >
                {categories.map((category) => (
                  <SelectItem key={category.key} value={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
              {errors.category && <span>Category is required</span>}
              
              <Select
                label="Budget"
                color="primary"
                placeholder="Select a Budget"
                className="max-w-[500px]"
                {...register("budget", { required: true })} // Register budget
              >
                {budgets.map((budget) => (
                  <SelectItem key={budget.key} value={budget.key}>{budget.label}</SelectItem>
                ))}
              </Select>
              {errors.budget && <span>Budget is required</span>}
              
              <Select
                label="Required Skills"
                color="primary"
                placeholder="Select Skills"
                selectionMode="multiple"
                className="max-w-[500px]"
                {...register("requiredSkills")} // Register required skills
              >
                {categories.map((category) => (
                  <SelectItem key={category.key} value={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-[100px] flex items-center justify-center bg-[#2E8B57] hover:bg-[#90EE90]"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
