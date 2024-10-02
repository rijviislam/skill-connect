"use client";

import { useRouter } from 'next/navigation';
import { Input, Button, Spacer, Image } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Loader from '../../../../app/loading'; // Adjust the import path as needed
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const res = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    setLoading(false); // Stop loading

    if (res?.error) {
      // Handle error display to the user
      console.log(res.error);
      alert("Sign-in failed: " + res.error); // Replace with your error handling
    } else {
      router.push('/'); 
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
          src="https://i.ibb.co/fpHk3kv/Login-amico.png"
          alt="NextUI Album Cover"
          className="w-[600px]"
        />
      </div>
      <div className="w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-4 text-green-700 text-center">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <Input
            color="success"
            type="email"
            name="email"
            label="Email"
            placeholder="skillconnect@gmail.com"
            className="w-full border-2 rounded-xl border-green-500 focus:border-green-600"
            required
          />
          <Spacer y={1.5} />
          <Input
            type="password"
            name="password"
            color="success"
            label="Password"
            placeholder="Enter your password"
            className="w-full border-2 rounded-xl border-green-500 focus:border-green-600"
            required
          />
          <Spacer y={1.5} />
          <Button
            type="submit"
            shadow
            color="success"
            auto
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Sign In
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
            Do not have an account? <Link ClassName='hover:text-green-600' href="/api/auth/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
