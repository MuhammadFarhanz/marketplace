import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
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

export type Product = {
  name: string;
  id: string;
  description: string;
  image: {
    id: string;
    url: string;
    productId: string;
  }[];
  price: number;
  condition: string;
  category: string;
  location: string;
};

type ProductCardProps = {
  product: Product;
};

const EditDialog: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem>
          <FilePenIcon className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <EditProductModal product={product} />
      </DialogContent>
    </Dialog>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const deleteProduct = useDeleteProduct();

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(product?.id);
      // setIsDeleteModalOpen(false);
      // refetch();
    } catch (error) {
      console.log(error);
    }
  };
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
        <div>{product?.name}</div>
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
            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
              <FilePenIcon className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-500 hover:bg-red-500/10">
              <TrashIcon
                className="mr-2 h-4 w-4"
                onClick={() => deleteProduct(product?.id)}
              />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="h-auto">
          <EditProductModal product={product} />
        </DialogContent>
      </Dialog>
    </TableRow>
  );
};

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
