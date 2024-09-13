import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const ProductSkeletonCard: React.FC = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="h-12 w-12 animate-pulse rounded bg-gray-300 object-cover" />
      </TableCell>
      <TableCell>
        <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-300"></div>
        <div className="h-3 w-36 animate-pulse rounded bg-gray-200"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-8 animate-pulse rounded bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-12 animate-pulse rounded bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-6 w-16 animate-pulse rounded bg-gray-300"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 w-6 animate-pulse rounded-full bg-gray-300"></div>
      </TableCell>
    </TableRow>
  );
};

const ProductSkeletonList: React.FC<{ count: number }> = ({ count }) => {
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
        {Array.from({ length: count }).map((_, index) => (
          <ProductSkeletonCard key={index} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductSkeletonList;
