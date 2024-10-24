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
import { HiMenu } from "react-icons/hi"; 
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
      <div className="flex items-center justify-between w-full">
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Link href="/" className="-ml-30 lg:-ml-44 ">
              <Image src={logo} alt="Digital Web Design" width={300} height={60} className="object-contain" /> 
            </Link>
          </NavbarBrand>
        </NavbarContent>

     
        <NavbarContent className="hidden sm:flex gap-5">
          {["freelancerProfile", "clientProfile", "jobs", "about", "faq", "us"].map((route) => (
            <NavbarItem key={route}>
              <Link
                color="foreground"
                href={route}
                className="font-bold text-white"
              >
                {route.charAt(0).toUpperCase() + route.slice(1).replace(/([A-Z])/g, ' $1')}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

     

        
        <NavbarContent
          as="div"
          className="items-center w-[500px] pr-[200px] m-0 p-0"
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
                    name="Jason Hughes"
                    size="sm"
                    src={currUser?.profile?.avatarUrl}
                  />
                </DropdownTrigger>
              </>
            ) : (
              <>
                <NavbarItem>
                  <Button onClick={() => signIn()} color="primary" variant="ghost">
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

            <DropdownMenu aria-label="Profile Actions , Navigation Links" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">
                  <span>{session?.user?.role}</span>: <span> {userEmail}</span>
                </p>
              </DropdownItem>

              <DropdownItem href="dashboard" key="dashboard">
                Dashboard
              </DropdownItem>

              {["freelancerProfile", "clientProfile", "jobs", "about", "faq", "us"].map((route) => (
                <DropdownItem key={route}>
                  <Link href={route}>
                    {route.charAt(0).toUpperCase() + route.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Link>
                </DropdownItem>
              ))}

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
