import Link from "next/link";
import SearchInput from "./searchInput";
import NavbarLinks from "./navbar-links";
import { MountainIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex h-14 w-full items-center border-b border-black bg-[#F4F4F0] px-3 sm:h-20 sm:px-0 ">
      <div className="container flex h-full w-full flex-row items-center justify-between p-10 pl-0 pr-0 sm:justify-normal sm:space-x-12 sm:p-0">
        <span className="flex h-full items-center self-center whitespace-nowrap text-2xl font-bold hover:text-pink-400 dark:text-black sm:flex">
          <Link href="/" aria-current="page">
            <div className="bg flex items-center gap-2">
              <MountainIcon className="size-6" />
              <span className="text-lg font-semibold">Marketplace</span>
            </div>
          </Link>
        </span>

        <div className="hidden flex-grow sm:block">
          <SearchInput />
        </div>

        <NavbarLinks />
      </div>
    </div>
  );
}
