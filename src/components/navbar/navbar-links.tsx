import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Bell, LogOutIcon, Mail, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";

const DropdownContent = ({ sessionData }: any) => (
  <>
    <div className="px-4 py-3 text-sm text-gray-900">
      <div>{sessionData.user.name}</div>
      <div className="truncate font-medium">{sessionData.user.email}</div>
    </div>
    <DropdownMenuSeparator />
    <ul
      className="text-sm text-gray-700"
      aria-labelledby="dropdownInformationButton"
    >
      <li>
        <Link
          href="/dashboard"
          className="block px-4 py-2 hover:bg-black hover:text-white"
        >
          Dashboard
        </Link>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-black hover:text-white">
          Settings
        </a>
      </li>
      <li>
        <a href="#" className="block px-4 py-2 hover:bg-black hover:text-white">
          Earnings
        </a>
      </li>
    </ul>
    <DropdownMenuSeparator />
    <button
      onClick={() => signOut()}
      className="flex w-full flex-row px-4 py-4 text-sm hover:bg-black hover:text-white"
    >
      <LogOutIcon className="h-5 w-5" />
      <p className="ml-2">Sign out</p>
    </button>
  </>
);

const AuthenticatedLinks = () => (
  <>
    <NavigationMenuItem>
      <Link
        href="/cart"
        className="flex h-10 w-8 cursor-pointer items-center justify-center hover:text-pink-500 sm:w-10"
      >
        <ShoppingCart className="h-7 w-7" strokeWidth={1.5} />
      </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link
        href="#"
        className="flex h-10 w-8 cursor-pointer items-center justify-center hover:text-pink-500 sm:w-10"
      >
        <Bell className="h-7 w-7" strokeWidth={1.5} />
      </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Link
        href="/chat"
        className="mr-4 flex h-10 w-8 cursor-pointer items-center justify-center hover:text-pink-500 sm:w-10"
      >
        <Mail className="h-7 w-7" strokeWidth={1.5} />
      </Link>
    </NavigationMenuItem>
  </>
);

const SignInButton = () => (
  <NavigationMenuItem>
    <Button onClick={() => signIn()}>
      <span className="text-lg font-semibold">sign in</span>
    </Button>
  </NavigationMenuItem>
);

const ProfileDropdown = ({ sessionData }: any) => (
  <NavigationMenuItem className="flex items-center">
    <NavigationMenuTrigger>
      <Separator orientation="vertical" />
      <div className="ml-4 flex h-10 w-8 cursor-pointer items-center justify-center sm:w-10">
        <Avatar className="h-8 w-8">
          <AvatarImage src={sessionData?.user?.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </NavigationMenuTrigger>
    <NavigationMenuContent className="rounded-sm p-0 shadow-none">
      <DropdownContent sessionData={sessionData} />
    </NavigationMenuContent>
  </NavigationMenuItem>
);

const NavbarSkeleton = () => (
  <div className="flex h-full items-center space-x-2">
    <div className="h-6 w-24 rounded bg-gray-300">
      <Skeleton className="h-full w-full" />
    </div>

    <div className="flex items-center space-x-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-6 w-20" />
    </div>
  </div>
);

const NavbarLinks = () => {
  const { data: sessionData, status } = useSession();

  if (status === "loading") {
    return <NavbarSkeleton />;
  }

  return (
    <div className="flex h-full items-center">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row items-center space-x-1 p-0 font-medium">
          {status == "authenticated" ? (
            <>
              <AuthenticatedLinks />
              <ProfileDropdown sessionData={sessionData} />
            </>
          ) : (
            <SignInButton />
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavbarLinks;
