import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div className="sticky bottom-0 left-0 -z-10 p-3 ">
      <footer className="relative -z-10 mt-4 h-full w-full overflow-hidden rounded-lg bg-black py-12 text-white sm:h-80">
        <Star1Icon />

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
              <Button type="submit" className="bg-[#ffb2ef] text-black ">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </footer>
    </div>
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

function Star1Icon() {
  return (
    <svg
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-28 -left-28 hidden h-80 w-80 sm:block"
    >
      <path
        d="M37.1666 0.399963L37.1738 37.4635L51.3643 3.22402L37.1873 37.4691L63.4002 11.2663L37.1975 37.4793L71.4426 23.3023L37.2031 37.4928L74.2666 37.5L37.2031 37.5071L71.4426 51.6976L37.1975 37.5206L63.4002 63.7335L37.1873 37.5308L51.3643 71.7759L37.1738 37.5365L37.1666 74.6L37.1595 37.5365L22.969 71.7759L37.146 37.5308L10.933 63.7335L37.1358 37.5206L2.89071 51.6976L37.1301 37.5071L0.0666504 37.5L37.1301 37.4928L2.89071 23.3023L37.1358 37.4793L10.933 11.2663L37.146 37.4691L22.969 3.22402L37.1595 37.4635L37.1666 0.399963Z"
        stroke="#F4F4F0"
        stroke-width="2.47333"
      />
    </svg>
  );
}
