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
  const userImage = session?.user?.profile?.avatarUrl;
  const userType = session?.user?.role;
  const userEmail = session?.user?.email;
  const [loading, setLoading] = useState(status === "loading");
  const [currUser, setCurrUser] = useState([]);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  // Fetch profiles from API by email
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
      className="bg-gradient-to-r from-[#a383f2] via-[#9480fd] to-[#a983ea]"
    >
      <div className=" flex items-center gap-20">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4 ">
            <Link href="/" className="lg:-ml-30 lg:-ml-44 ">
              <Image src={logo} alt="Digital Web Design" />
            </Link>
          </NavbarBrand>
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
              <Link
                color="foreground"
                href="us"
                className="font-bold text-white"
              >
                Contact Us
              </Link>
            </NavbarItem>
          </NavbarContent>
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
                    className="transition-transform "
                    color="secondary"
                    name="Jason Hughes"
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
                    color="secondary"
                    variant="ghost"
                  >
                    Sign In
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Link href="/api/auth/signup">
                    <Button color="secondary" variant="ghost">
                      Sign Up
                    </Button>
                  </Link>
                </NavbarItem>
              </>
            )}

            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2 ">
                <p className="font-semibold">
                  <span>{userType}</span>: <span> {userEmail}</span>
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
