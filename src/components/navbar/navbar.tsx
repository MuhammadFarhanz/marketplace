import Link from "next/link";
import SearchInput from "./searchInput";
import NavbarLinks from "./navbar-links";
import { MountainIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex h-20  w-full items-center border-b border-black ">
      <div className="container flex h-full w-full flex-row items-center space-x-12 pl-0 pr-0">
        <span className="hidden h-full items-center self-center whitespace-nowrap text-2xl font-bold hover:text-pink-400 dark:text-black sm:flex">
          <Link href="/" aria-current="page">
            <div className="flex items-center gap-2">
              <MountainIcon className="size-6" />
              <span className="text-lg font-semibold">Marketplace</span>
            </div>
          </Link>
        </span>

        <div className="flex-grow">
          <SearchInput />
        </div>

        <NavbarLinks />
      </div>
    </div>
  );
}
