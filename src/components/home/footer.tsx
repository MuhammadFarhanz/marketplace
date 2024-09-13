import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="mt-4 bg-black py-12 text-white">
      <div className="container grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="size-6" />
            <span className="text-lg font-semibold">Marketplace</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Marketplace Inc. All rights reserved.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-sm font-medium">Company</h3>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Contact
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            FAQs
          </Link>
        </div>
        <div className="grid gap-2">
          <h3 className="text-sm font-medium">Products</h3>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Electronics
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Home &amp; Garden
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Fashion
          </Link>
          <Link href="#" className="text-sm hover:underline" prefetch={false}>
            Sports
          </Link>
        </div>
        <div className="grid gap-2">
          <h3 className="text-sm font-medium">Newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </footer>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
