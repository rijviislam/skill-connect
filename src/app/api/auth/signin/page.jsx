"use client";
import { Button, Image, Input, Spacer } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import Loader from "../../../../app/loading";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      passwordHash: e.target.password.value,
    });
    setLoading(false);

    if (res?.error) {
      console.error(res.error);
      Swal.fire({
        icon: "error",
        title: "Sign-in failed",
        text: res.error,
      });
    } else {
      router.push("/");
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    console.log(provider);
    const res = await signIn(provider, {
      redirect: true,
      callbackUrl: "/dashboard/profile",
    });
    setLoading(false);

    if (res?.error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: res.error,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You are logged in successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 px-4 py-10">
      <div className="flex-shrink-0">
        <Image
          isBlurred
          src="https://i.postimg.cc/hv7qR5yB/Forgot-password-rafiki.png"
          alt="NextUI Album Cover"
          className="w-[600px]"
        />
      </div>
      <div className="w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-4 text-violet-500 text-center">
          Sign In
        </h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="skillconnect@gmail.com"
            className="w-full border-2 rounded-xl border-violet-500 bg-violet-100 text-violet-700 focus:border-violet-600 focus:bg-violet-200"
            required
          />
          <Spacer y={1.5} />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            className="w-full border-2 rounded-xl border-violet-500 bg-violet-100 text-violet-700 focus:border-violet-600 focus:bg-violet-200"
            required
          />
          <Spacer y={1.5} />
          <Button
            type="submit"
            shadow
            auto
            className="w-full bg-violet-500 hover:bg-violet-600 text-white"
          >
            Sign In
          </Button>
        </form>
        <Spacer y={4} />
        <hr />
        <Spacer y={4} />
        <div className="flex justify-center items-center gap-2">
          <Button
            type="submit"
            shadow
            auto
            className="px-2 bg-violet-500 hover:bg-violet-600 text-white"
            onClick={() => handleSocialLogin("google")}
          >
            <FcGoogle />
          </Button>

          <Spacer y={1.5} />

          <Button
            type="submit"
            shadow
            auto
            className="px-2 bg-violet-500 hover:bg-violet-600 text-white"
            onClick={() => handleSocialLogin("github")}
          >
            <FaGithub />
          </Button>
        </div>
        <Spacer y={1.5} />
        <div>
          <p className="text-center text-gray-600">
            Do not have an account?{" "}
            <Link className="hover:text-violet-600" href="/api/auth/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
