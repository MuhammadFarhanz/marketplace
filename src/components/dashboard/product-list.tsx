import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Dialog } from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useDeleteProduct } from "~/hooks/useDeleteProduct";
import EditProductModal from "./edit-product";
import { ProductFormValues } from "./form/utils";

type Props = {
  product: ProductFormValues;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useDeleteProduct();

  return (
    <TableRow>
      <TableCell>
        <img
          src={product?.image[0]?.url}
          alt="Small Bets"
          className="h-12 w-12 rounded object-cover"
        />
      </TableCell>
      <TableCell className="">
        <div className="text-lg font-medium">{product?.name}</div>
        <a href="#" className="text-sm text-gray-500">
          marketplace.com/product/{product.name}
        </a>
      </TableCell>
      <TableCell>1</TableCell>
      <TableCell>Rp.{0}</TableCell>
      <TableCell>
        Rp{new Intl.NumberFormat("id-ID").format(product.price)}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">Published</Badge>
      </TableCell>
      <TableCell className="">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full p-2 hover:bg-gray-200">
            <MoreIcon className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 rounded-sm border border-black p-0">
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <FilePenIcon className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => mutate({ id: product.id })}
              className="text-red-500 hover:bg-red-500/10"
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <EditProductModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          product={product}
        />
      </Dialog>
    </TableRow>
  );
};

const ProductList: React.FC<any> = ({ products }) => {
  return (
    <Table className="table-auto">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Image</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.slice(0, 10)?.map((product: any) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductList;

function MoreIcon({ className }: any) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
    </svg>
  );
}

function FilePenIcon(props: any) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
