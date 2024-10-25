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
import logo from "../../../Image/Skill-removebg-preview.png";

const NavbarComponent = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const userEmail = session?.user?.email;
  const [loading, setLoading] = useState(status === "loading");
  const [currUser, setCurrUser] = useState([]);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  const fetchUserByEmail = async () => {
    try {
      const response = await fetch(`/api/get-user?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setCurrUser(data);
      } else {
        console.error("Failed to fetch user:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUserByEmail();
  }, [userEmail]);

  return (
    <Navbar
      isBordered
      className="bg-gradient-to-r from-[#a383f2] via-[#9480fd] to-[#a983ea] mx-auto px-6 lg:px-16" // Equal margins on both sides
    >
      <div className="flex items-center justify-between w-full">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <Image
              src={logo}
              alt="Digital Web Design"
              className="w-56 md:w-24 lg:w-72 lg:-ml-16"
            />
          </Link>
        </NavbarBrand>

        {/* Navigation Links for Desktop */}
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link
              color="foreground"
              href="freelancerProfile"
              className="font-bold text-white"
            >
              Freelancer profiles
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="clientProfile"
              className="font-bold text-white"
            >
              Client profiles
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="jobs"
              className="font-bold text-white"
            >
              Jobs
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="about"
              className="font-bold text-white"
            >
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="faq"
              className="font-bold text-white"
            >
              FAQ
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="us" className="font-bold text-white">
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent
          as="div"
          className="items-center lg:w-[500px] pr-[200px] m-0 p-0"
          justify="end"
        >
          <Dropdown placement="bottom-end">
            {isAuthenticated ? (
              <>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    size="sm"
                    src={currUser?.profile?.avatarUrl}
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
                  <span>{session?.user?.role}</span>: <span>{userEmail}</span>
                </p>
              </DropdownItem>

              <DropdownItem href="dashboard" key="dashboard">
                Dashboard
              </DropdownItem>

              <DropdownItem
                className="lg:hidden"
                href="freelancerProfiles"
                key="Freelancer profiles"
              >
                Freelancer profiles
              </DropdownItem>
              <DropdownItem
                className="lg:hidden"
                href="clientProfiles"
                key="Client profiles"
              >
                Client profiles
              </DropdownItem>
              <DropdownItem className="lg:hidden" href="jobs" key="Jobs">
                Jobs
              </DropdownItem>
              <DropdownItem className="lg:hidden" href="faq" key="FAQ">
                FAQ
              </DropdownItem>
              <DropdownItem className="lg:hidden" href="us" key="Contact Us">
                Contact Us
              </DropdownItem>
              <DropdownItem className="lg:hidden" href="about" key="About">
                About
              </DropdownItem>

              <DropdownItem onClick={() => signOut()} color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
