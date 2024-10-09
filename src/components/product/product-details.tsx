import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAddToCart } from "~/hooks/useAddToCart";
import { api } from "~/utils/api";
import ProductLayout from "./product-layout";
import ProductList from "../home/product-list";
import { Separator } from "../ui/separator";

const ProductDetails = ({
  product,
  mainImage,
  onThumbnailClick,
}: {
  product: any;
  mainImage: string | undefined;
  onThumbnailClick: (thumbnailUrl: string) => void;
}) => {
  const { mutate } = useAddToCart();
  const { data, isLoading } = api.product.getRandomProducts.useQuery();

  const handleAddToCart = async () => {
    await mutate({ productId: product.id });
    toast.success("Added product to cart");
  };

  return (
    <>
      <div className="flex flex-col justify-between md:gap-10 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-6 lg:w-2/4">
          <img
            src={mainImage || ""}
            alt={product?.name}
            className="aspect-square h-full w-full object-cover"
          />
          <div className="flex h-24 flex-row justify-center sm:items-end">
            {product?.image.map((thumbnail: any, index: any) => (
              <img
                key={index}
                src={thumbnail.url}
                alt=""
                className="mr-3 h-14 w-14 cursor-pointer"
                onClick={() => onThumbnailClick(thumbnail.url)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 lg:w-2/4">
          <div className="flex-grow">
            <h1 className="mb-2 border-b border-black pb-2 text-2xl font-bold sm:text-3xl">
              {product.name}
            </h1>
            <h6 className="mb-4 mt-4 text-xl font-semibold sm:text-2xl">
              Rp.{" "}
              {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </h6>

            <div className="mb-2 flex flex-row">
              <p className="font-semibold">Condition:</p>
              <p className="ml-2">{product.condition}</p>
            </div>
            <p className="mb-2 flex flex-row text-gray-700">
              <span className="font-semibold">Location:</span>
              <span className="ml-2">{product.location}</span>
            </p>
            <div className="mb-2 whitespace-normal">
              <span className="mb-2 font-semibold">Detail:</span>
              <p className="whitespace-normal break-words text-gray-700">
                {product.description}
              </p>
            </div>
          </div>
          <div className="flex items-center border-0 border-t border-black pb-3 pt-3">
            <img
              src={product.author?.image || ""}
              alt="user-photo"
              className="h-10 rounded-full sm:h-14"
            />
            <div className="flex flex-col">
              <span className="ml-4 items-end">{product.author?.name}</span>
              <span className="ml-4 text-green-500">Online</span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-12 sm:justify-normal">
            <Link href={`/chat/?recipient=${product?.authorId}`}>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 rounded-sm border-black"
              >
                Chat
              </Button>
            </Link>
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="flex-1 rounded-sm"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <>
        <div className=" bg-[#F4F4F0] p-3 pt-10">
          <div className=" container  p-0 ">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold tracking-wide text-black ">
                Similiar listings
              </h1>
              <div>
                <img
                  className="w-[30px] sm:w-[30px]"
                  src={"/assets/icon_arrow.svg"}
                  alt="star"
                />
              </div>
            </div>
            <Separator className="mt-3 bg-black" />
          </div>
        </div>

        <ProductLayout className="z-0 min-h-0 " isFilterSidebarOn={false}>
          <ProductList products={data} isLoading={isLoading} />
        </ProductLayout>
      </>
    </>
  );
};

export default ProductDetails;
