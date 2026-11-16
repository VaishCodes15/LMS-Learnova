import React from "react";
import logo from "../assets/lms-bgremove-navbarlogo.png"; 
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = true;
  return (
    <div className="h-16 dark:bg-[#f9f9f9] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 flex items-center px-5 md:px-22 justify-between">
      {/* desktop*/}
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Learnova Logo"
            className="h-35 w-auto object-contain"
          />
        </div>

        <div className="flex items-center gap-5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer"><Link to="my-learning">My Learning</Link></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer"><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Dashboard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          {/* {dark mode} */}
          <DarkMode/>
        </div>
      </div>

      {/* mobile device */}
      <div className="flex md:hidden items-center justify-between w-full">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Learnova Logo"
            className="h-35 w-auto object-contain"
          />
        </div>

        <div>
          <MobileNavbar/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200 bg-gray-50 cursor-pointer"
          variant="outline"
        >
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 flex flex-col justify-between bg-white dark:bg-[#f9f9f9]">
        <div>
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <SheetTitle className="flex items-center gap-2"> 
          <img
            src={logo}
            alt="Learnova Logo"
            className="h-30 w-auto object-contain"
          />
          </SheetTitle>
          <div className="pr-6">
              <DarkMode />
            </div>
        </SheetHeader>

        <Separator className="my-4" />
        <nav className="flex flex-col space-y-4">
          <span className="cursor-pointer">My Learning</span>
          <span className="cursor-pointer">Edit Profile</span>
          <span className="cursor-pointer">Log out</span>
        </nav>
         {role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button className="bg-black text-white cursor-pointer" type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
