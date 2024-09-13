import Link from "next/link";
import SearchInput from "./searchInput";
import NavbarLinks from "./navbar-links";

export default function Navbar() {
  return (
    <div className="flex h-20  w-full items-center border-b border-black ">
      <div className="container flex h-full w-full flex-row items-center space-x-12 pl-0 pr-0">
        <span className="hidden h-full items-center self-center whitespace-nowrap font-archivo text-2xl font-semibold dark:text-black sm:flex">
          <Link href="/" aria-current="page">
            Market
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
