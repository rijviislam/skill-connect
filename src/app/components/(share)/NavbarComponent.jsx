"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const NavbarComponent = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(status === "loading");

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  const isAuthenticated = status === "authenticated";
  const userImage = session?.user?.profile?.avatarUrl;

  const userType = session?.user?.role;
  const userEmail = session?.user?.email;
  console.log(session);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  return (
    <Navbar isBordered className="bg-gradient-to-r from-green-400 to-blue-300 ">
      <NavbarContent>
        <NavbarBrand className="mr-4 ">
          <Link href="/" className="text-[#2e8b57] sm:block font-bold text-2xl">
            SkillConnect
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="freelancerProfile">
              Freelancer profile
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="about">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="faq">
              FAQ
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="us">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          {isAuthenticated ? (
            <>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src={userImage || "https://i.ibb.co.com/jvrF6dJ/th.jpg"}
                />
              </DropdownTrigger>
            </>
          ) : (
            <>
              <NavbarItem>
                <Button
                  onClick={() => signIn()}
                  color="primary"
                  variant="ghost"
                >
                  Sign In
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Link href="/api/auth/signup">
                  <Button color="primary" variant="ghost">
                    Sign Up
                  </Button>
                </Link>
              </NavbarItem>
            </>
          )}

          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">
                <span>{userType}</span>: <span> {userEmail}</span>
              </p>
            </DropdownItem>

            <DropdownItem href="dashboard" key="dashboard">
              Dashboard
            </DropdownItem>

            <DropdownItem href="jobPost" key="jobPost">
              Jobs Post
            </DropdownItem>

            <DropdownItem href="solution" key="solution">
              Solutions
            </DropdownItem>
            <DropdownItem onClick={() => signOut()} color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponent;
