"use client";

import { Input, Button, Image, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loader from '../../../../app/loading'; // Adjust the import path as needed
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Swal from 'sweetalert2'

import { Button, Image, Input, Spacer } from "@nextui-org/react";

export default function SignUpPage() {
  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      type: e.target.type.value,
      image: e.target.image.value,
    };
    console.log(newUser);
    const resp = await fetch(`${baseUrl}/api/auth/signup/register-user`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(resp);
  };

  // https://i.ibb.co.com/pbgqN4W/Login-Security.png

  return (
    <div className="container mx-auto flex justify-center items-center gap-10 h-screen">
      <div className="">
        <Image
          isBlurred
          src="https://i.ibb.co.com/8jJYbVw/Young-Man-Register-Domain-Name.png"
          alt="NextUI Album Cover"
          className="w-full"
        />
      </div>
      <div className="w-full">
        <h3>Sign Up</h3> {/* Replaced Text component with h3 */}
        <form onSubmit={handleSubmitForm}>
          <Input
            key="primary"
            type="name"
            name="name"
            color="primary"
            label="Name"
            placeholder="Enter Your name"
            className="max-w-[500px]"
            required
            // {...register("name")}
          />
          {/* {errors.name && <span>Title is required</span>} */}

          <Spacer y={1.5} />
          <Input
            key="primary"
            color="primary"
            type="email"
            name="email"
            label="Email"
            placeholder="skillconnect@gmail.com"
            className="max-w-[500px]"
            required
            // {...register("email")}
          />
          {/* {errors.email && <span>Title is required</span>} */}

          <Spacer y={1.5} />
          <Input
            key="primary"
            type="password"
            name="password"
            color="primary"
            label="Password"
            placeholder="Enter your password"
            className="max-w-[500px]"
            required
            // {...register("password")}
          />
          {/* {errors.password && <span>Title is required</span>} */}

          <Spacer y={1.5} />
          <Input
            key="primary"
            type="text"
            name="type"
            color="primary"
            label="Type"
            placeholder="Enter your Type"
            className="max-w-[500px]"
            required
            // {...register("password")}
          />
     
          {/* {errors.file && <span>Title is required</span>} */}
          <Spacer y={1.5} />
          <Input
            key="primary"
            type="text"
            name="image"
            color="primary"
            label="Image link"
            placeholder="Enter your Image link"
            className="max-w-[500px]"
            required
          />
          <Spacer y={1.5} />
          <Button type="submit" shadow color="primary" auto>
            Sign Up
          </Button>
        </form>
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    const newUser = {
      username: e.target.name.value,
      email: e.target.email.value,
      passwordHash: e.target.password.value,
      role: e.target.role.value,
      image: e.target.image.value,
    };
    console.log(newUser)

    try {
      const resp = await fetch('/api/auth/signup/register-user', {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resp.ok) {
        router.push('/api/auth/signin'); 
        // show sweetalart when successfully registered
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are registered successfully",
          showConfirmButton: false,
          timer: 1500,
        });  
      } else {
        // Swal.fire({
        //   position: "top-end",
        //   icon: "error",
        //   title: "Register error",
        // }); 
        console.log("Register error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  // If loading, show the loader
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 px-4 py-10">
      <div className="flex-shrink-0">
        <Image
          isBlurred
          src="https://i.ibb.co/W3wPyqm/Sign-up-amico.png"
          alt="NextUI Album Cover"
          className="w-[600px]"
        />
      </div>
      <div className="w-full max-w-md">
        <h3 className="text-3xl font-semibold mb-4 text-green-600 text-center">Sign Up</h3>
        <form onSubmit={handleSubmitForm}>
          <div className="mb-4">
            <Input
              type="text"
              name="image"
              label="Image link"
              placeholder="Enter your Image link"
              required
              className="w-full border-2 border-green-500 rounded-xl focus:border-green-700 hover:border-green-600 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              name="name"
              label="Name"
              placeholder="Enter Your name"
              required
              className="w-full border-2 border-green-500 rounded-xl focus:border-green-700 hover:border-green-600 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="skillconnect@gmail.com"
              required
              className="w-full border-2 border-green-500 rounded-xl focus:border-green-700 hover:border-green-600 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              required
              className="w-full border-2 border-green-500 rounded-xl focus:border-green-700 hover:border-green-600 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Role
            </label>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="freelancer"
                  required
                  className="form-radio text-green-500 rounded-xl focus:ring-green-700 hover:bg-green-200"
                />
                <span className="ml-2">Freelancer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="client"
                  required
                  className="form-radio text-green-500 rounded-xl focus:ring-green-700 hover:bg-green-200"
                />
                <span className="ml-2">Client</span>
              </label>
            </div>
          </div>
          <Button
            type="submit"
            shadow
            color="success"
            auto
            className="w-full bg-green-500 rounded-xl hover:bg-green-600 text-white transition duration-200"
          >
            Sign Up
          </Button>
        </form>
        <Spacer y={4} />
        <hr/>
        <Spacer y={4} />
        <div className='flex justify-center items-center gap-2'>
        <Button
         type="submit"
         shadow
         color="success"
         auto
         className="px-2 bg-green-500 hover:bg-green-600 text-white"
                  
        onClick={() => signIn("google", { callbackUrl: 'http://localhost:3000' })}>
          <FcGoogle />
        </Button>
        <Spacer y={1.5} />
        <Button
         type="submit"
         shadow
         color="success"
         auto
         className="px-2 bg-green-500 hover:bg-green-600 text-white"
                  
        onClick={() => signIn("github", { callbackUrl: 'http://localhost:3000' })}>
          <FaGithub />
         </Button>
         </div>
        <Spacer y={1.5} />
        <div>
          <p className="text-center text-gray-600">
          Already have an account? <Link className='hover:text-green-600' href="/api/auth/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
