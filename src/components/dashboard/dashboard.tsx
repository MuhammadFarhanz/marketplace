import { Button } from "~/components/ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { api } from "~/utils/api";
import ProductList from "./product-list";
import { ProductPagination } from "./product-pagination";
import ProductSkeletonList from "./product-list-skeleton";
import AddProduct from "./add-product";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: sessionData, status } = useSession();
  const { data: products, refetch } = api.product.getAllProductById.useQuery();

  const [isOpen, setIsOpen] = useState(false);

  const nav = ["Home", "Products", "Checkout", "Settings"];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative flex min-h-screen overflow-visible">
        <AddProduct setIsOpen={setIsOpen} isOpen={isOpen} />

        <aside className="w-64 border-r border-black text-white">
          <nav className="flex h-full flex-grow flex-col justify-between ">
            <div>
              {nav.map((value) => {
                return (
                  <a
                    href="#"
                    className="flex items-center space-x-3 border-b border-black px-6 py-4 text-black hover:bg-[#ffb2ef]  hover:text-black"
                  >
                    <span>{value}</span>
                  </a>
                );
              })}
            </div>
            <div className="flex flex-row space-x-3  px-6 py-4 text-stone-600">
              <Avatar className="h-8 w-8 ">
                <AvatarImage src={sessionData?.user?.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{sessionData?.user?.name}</p>
            </div>
          </nav>
        </aside>
        <div className="flex flex-1 flex-col p-8">
          <header className="flex items-center justify-between pb-6">
            <h1 className="text-3xl font-medium">Products</h1>
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search"
                className="mr-4 rounded-sm border border-black"
              />

              <Button onClick={() => setIsOpen(true)}>New product</Button>
            </div>
          </header>

          <div className="flex flex-col">
            <div className="flex flex-col">
              {!products ? (
                <ProductSkeletonList count={5} />
              ) : (
                <>
                  <ProductList products={products} />
                  {products.length > 8 && <ProductPagination />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function MoreIcon({ className }: any) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
    </svg>
  );
}
