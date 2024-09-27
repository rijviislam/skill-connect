"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button
} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";

const NavbarComponent = () => {
  const { data: session, status } = useSession();
  console.log(session)
  console.log(status)
  const isAuthenticated = status === "authenticated";

  const userImage = session?.user?.image;
    const userType = session?.user?.type;
  const userEmail = session?.user?.email;
  
    // if (status === "loading") {
    //   return <div>Loading...</div>;
    // }
 
  return (
    <Navbar isBordered className="bg-green-50">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4 ">
        <Link href="/" className="text-[#2e8b57] sm:block font-bold text-2xl">SkillConnect</Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem 
          // isActive
          >
            <Link href="dashboard"
            color="foreground"
            // aria-current="page" 
            // color="secondary"
            >
            Dashboard
            </Link>
          </NavbarItem>
         
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
      
     
      <NavbarContent as="div" className="items-center" justify="end">

        <Dropdown placement="bottom-end">
  {
    isAuthenticated ? (
      <>
      <DropdownTrigger>
             <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={ userImage }
            />
          </DropdownTrigger>
          </>
    ):(
      <>
              <NavbarItem>
                <Button onClick={() => signIn()} color="primary" variant="ghost">Sign In</Button>
              </NavbarItem>
              <NavbarItem>
                <Link href="/api/auth/signup">
                  <Button color="primary" variant="ghost">Sign Up</Button>
                </Link>
              </NavbarItem>
            </>
    )
  }
          
<DropdownMenu aria-label="Profile Actions" variant="flat">
<DropdownItem key="profile" className="h-14 gap-2">
  <p className="font-semibold"><span>{ userType }</span>: <span> { userEmail }</span></p>
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