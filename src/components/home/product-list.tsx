import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const SkeletonCard = () => (
  <div className="w-48 max-w-sm overflow-hidden rounded-sm bg-background bg-white">
    <div className="relative flex h-44 overflow-hidden">
      <Skeleton className="h-full w-full object-cover" />
    </div>
    <div className="space-y-4 p-2 py-3">
      <Skeleton className="h-6 w-full" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </div>
    <div className="flex h-14 items-center px-2">
      <Skeleton className="h-6 w-3/4" />
    </div>
  </div>
);

const NoProductFound = () => (
  <h1 className="grid grid-cols-1 gap-3 text-3xl font-bold text-black">
    no product found
  </h1>
);

const ProductList = ({
  products,
  isLoading,
}: {
  products: any;
  isLoading: boolean;
}) => {
  const [showSkeletons, setShowSkeletons] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowSkeletons(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (showSkeletons) {
    return (
      <>
        {Array.from({ length: products?.length }).map((_, index) => (
          <SkeletonCard />
        ))}
      </>
    );
  }

  if (products?.length === 0) {
    return <NoProductFound />;
  }

  return (
    <>
      {products?.map((product: any) => (
        <Link
          prefetch={false}
          className="w-48 rounded-sm text-black duration-200 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          key={product.id}
          href={{
            pathname: `/product/${product.name}`,
            query: { slug: `${product.name}`, id: product.id },
          }}
        >
          <div className="w-48 max-w-sm overflow-hidden rounded-sm border border-black bg-background bg-white">
            <img
              src={product?.image[0]?.url}
              alt={product.name}
              className="h-44 w-full object-cover"
              style={{ aspectRatio: "400/300", objectFit: "cover" }}
            />
            <div className="space-y-4 p-[7px] py-2">
              <h5 className="truncate font-medium">{product.name}</h5>
              <div className="flex items-center space-x-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={product?.author?.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h5 className="font-custom ml-2 truncate tracking-tight underline sm:text-sm">
                  {product?.author?.name}
                </h5>
              </div>
            </div>
            <div className="flex h-12 items-center border-t border-black px-2">
              <span className="text-sm font-medium sm:text-base">
                Rp{" "}
                {product?.price
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
    // <main>
    //   <div className="container mx-auto">
    //     <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    //       {products.map((product: any) => (
    //         <Link
    //           prefetch={false}
    //           className="w-48 rounded-sm text-black duration-200 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
    //           key={product.id}
    //           href={{
    //             pathname: `/product/${product.name}`,
    //             query: { slug: `${product.name}`, id: product.id },
    //           }}
    //         >
    //           <div className="w-48 max-w-sm overflow-hidden rounded-sm border border-black bg-background bg-white">
    //             <img
    //               src={product?.image[0]?.url}
    //               alt={product.name}
    //               className="h-44 w-full object-cover"
    //               style={{ aspectRatio: "400/300", objectFit: "cover" }}
    //             />
    //             <div className="space-y-4 p-2 py-3">
    //               <h5 className="truncate font-medium tracking-normal sm:text-lg">
    //                 {product.name}
    //               </h5>
    //               <div className="flex items-center space-x-2">
    //                 <Avatar className="h-6 w-6">
    //                   <AvatarImage src={product?.author?.image} />
    //                   <AvatarFallback>CN</AvatarFallback>
    //                 </Avatar>
    //                 <h5 className="font-custom ml-2 truncate tracking-tight underline sm:text-base">
    //                   {product?.author?.name}
    //                 </h5>
    //               </div>
    //             </div>
    //             <div className="flex h-14 items-center border-t border-black px-2">
    //               <span className="text-sm font-medium sm:text-lg">
    //                 Rp{" "}
    //                 {product?.price
    //                   ?.toString()
    //                   .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    //               </span>
    //             </div>
    //           </div>
    //         </Link>
    //       ))}
    //     </div>
    //   </div>
    // </main>
  );
};

export default ProductList;
