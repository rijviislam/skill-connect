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
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../../Image/C-removebg-preview.png";

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

  return (
    <Navbar isBordered className="bg-gradient-to-l from-[#90EE90] to-[#2E8B57]">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4 ">
          <Link href="/" className="w-48 h-48 mb-12">
            <Image src={logo} alt="Digital Web Design" className="" />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="freelancerProfile">
              Freelancer profiles
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="clientProfile">
              Client profiles
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="jobs">
              Jobs
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

      <NavbarContent as="div" className="items-center" justify="end">
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
                  src={userImage}
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
            <DropdownItem href="freelancerProfile" key="freelancerProfile">
              Freelancers Profile
            </DropdownItem>
            <DropdownItem href="jobPost" key="job">
              Jobs Post
            </DropdownItem>
            <DropdownItem href="about" key="about">
              About
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
