import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useDeleteCart } from "~/hooks/useDeleteCart";
import { useGetCart } from "~/hooks/useGetCart";
import { Spinner } from "~/components/ui/spinner";
import React, { useEffect, useState } from "react";

const SKELETON_DELAY = 500;

const ProductCardSkeleton = () => (
  <div className="mb-2 flex h-32 animate-pulse flex-row rounded-sm bg-white">
    <div className="h-full min-w-32 bg-gray-300"></div>
    <div className="flex w-full flex-row justify-between p-4">
      <div className="flex flex-col justify-between">
        <div className="h-6 w-24 rounded bg-gray-300"></div>
        <div className="mt-2 h-4 w-12 rounded bg-gray-300"></div>
      </div>
      <div className="flex flex-col justify-between text-right">
        <div className="h-6 w-20 rounded bg-gray-300"></div>
        <div className="flex">
          <div className="mr-2 h-4 w-16 rounded bg-gray-300"></div>
          <div className="h-4 w-16 rounded bg-gray-300"></div>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard = ({ item, handleRemove }: any) => (
  <div
    key={item?.id}
    className="mb-2 flex h-32 flex-row rounded-sm border border-black bg-white"
  >
    <img
      className="h-full min-w-32 transform object-cover"
      src={item?.product?.image[0]?.url}
      alt="product image"
    />
    <div className="flex w-full flex-row justify-between p-4">
      <div className="flex flex-col justify-between">
        <Link
          href={{
            pathname: `/product/${item?.product?.name}`,
            query: { slug: `${item?.product?.name}`, id: item?.product?.id },
          }}
          className="text-xl font-bold underline underline-offset-1"
        >
          {item?.product?.name}
        </Link>
        <p>Qty: {item?.quantity}</p>
      </div>

      <div className="flex flex-col justify-between text-right">
        <p className="text-lg font-semibold">Rp.{item?.product?.price}</p>
        <div>
          <button className="mr-2 text-sm underline">Configure</button>
          <button
            className="text-sm underline"
            onClick={() => handleRemove(item?.product?.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
);

function Index() {
  const { cart, isLoading, error } = useGetCart();
  const { deleteCart } = useDeleteCart();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (cart?.length) {
        const timer = setTimeout(() => {
          setShowSkeleton(false);
        }, SKELETON_DELAY);

        return () => clearTimeout(timer);
      } else {
        setShowSkeleton(false);
      }
    }
  }, [isLoading, cart?.length]);

  const handleRemove = (productId: string) => {
    deleteCart(productId);
    setShowSkeleton(true);
  };

  const subtotal =
    cart?.reduce((acc, item) => acc + item.product.price * item.quantity, 0) ||
    0;
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="h-screen bg-[#F4F4F0] pt-10">
      <div className="container flex h-auto flex-row justify-center">
        <div className="mr-16 flex h-full w-1/2 flex-col">
          {showSkeleton
            ? Array.from({ length: cart?.length || 0 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : cart?.map((item: any) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  handleRemove={handleRemove}
                />
              ))}
        </div>

        <div className="h-60 w-[30%]">
          <div className="rounded-sm border border-black bg-white p-6 dark:bg-gray-950">
            <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>
            <div className="grid gap-4">
              <div className="flex justify-between">
                <p className="text-gray-500 dark:text-gray-400">Subtotal</p>
                {isLoading ? (
                  <Spinner size="small" />
                ) : (
                  <p className="font-semibold">Rp. {subtotal}</p>
                )}
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500 dark:text-gray-400">Shipping</p>
                {isLoading ? (
                  <Spinner size="small" />
                ) : (
                  <p className="font-semibold">Rp. {shipping}</p>
                )}
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500 dark:text-gray-400">Tax</p>
                {isLoading ? (
                  <Spinner size="small" />
                ) : (
                  <p className="font-semibold">Rp. {tax}</p>
                )}
              </div>
              <div className="mt-4 flex justify-between border-t pt-4">
                <p className="text-xl font-bold">Total</p>
                {isLoading ? (
                  <Spinner size="small" />
                ) : (
                  <p className="text-xl font-bold">Rp. {total}</p>
                )}
              </div>
            </div>
            <div className="mt-6 grid gap-2">
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
