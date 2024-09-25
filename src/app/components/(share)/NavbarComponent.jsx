"use client"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";

// import {SearchIcon} from "@/SearchIcon";
import { SearchIcon } from './../SearchIcon';
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"

const NavbarComponent = () => {
  const session = useSession()
  // console.log(session)
 

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
        <Link href="/" className="text-[#2e8b57] sm:block font-bold text-2xl">SkillConnect</Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem 
          // isActive
          >
            <Link href="freelancerProfile"
            color="foreground"
            // aria-current="page" 
            // color="secondary"
            >
            Freelancers Profile
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link href="jobPost" color="foreground">
            Job Post
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="about">
            About 
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="solutions">
            Solutions 
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="dashboard">
            Dashboard 
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <NavbarItem >
            
            <Link href="/api/auth/signup">
            <Button color="primary" variant="ghost">
       Sign Up
      </Button>
            </Link>
           
          </NavbarItem>
        <Dropdown placement="bottom-end">
          {
            session?.status === "authenticated" ? <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={ session?.data?.user?.image }
            />
          </DropdownTrigger> : <NavbarItem >
            
            <Button onClick={() => signIn()} color="primary" variant="ghost">
       Sign In
      </Button>
           
          </NavbarItem>
    //       <NavbarItem >
    //         <Link href="/api/auth/signin">
    //       <Button color="primary" variant="ghost">
    //  Sign In
    // </Button>
    // </Link>
    //     </NavbarItem>
          }
          
          <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold"><span>{ session?.data?.user?.type }</span>: <span> {session?.data?.user?.email }</span></p>
            </DropdownItem>

            
            <DropdownItem href="dashboard" key="dashboard">Dashboard</DropdownItem>
            <DropdownItem href="freelancerProfile" key="freelancerProfile">Freelancers Profile</DropdownItem>
            <DropdownItem href="jobPost" key="jobPost">Jobs Post</DropdownItem>
            <DropdownItem href="about" key="about">About</DropdownItem>
            <DropdownItem href="solution" key="solution">Solutions</DropdownItem>
            <DropdownItem
             onClick={() => signOut()}
             color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </NavbarContent>
    </Navbar>
  );
}

export default NavbarComponent;
