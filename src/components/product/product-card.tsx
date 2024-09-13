import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function ProductCard({ product }: any) {
  return (
    <div className="flex h-full w-56 max-w-xs flex-col rounded-sm border border-black bg-white ">
      <a
        className="relative flex h-32 overflow-hidden border-b border-black sm:h-56"
        href="#"
      >
        <img
          className="w-full transform  object-cover transition-transform duration-300 hover:scale-110"
          src={product?.image[0]?.url}
          alt="product image"
        />
      </a>
      <div className="space-y-10 p-2 py-3">
        <h5 className="truncate font-medium tracking-normal sm:text-lg">
          {product.name}
        </h5>

        <div className="flex">
          <Avatar className="h-6 w-6">
            <AvatarImage src={product?.author?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h5 className="font-custom ml-2 truncate tracking-tight underline sm:text-base">
            {product?.author?.name}
          </h5>
        </div>
      </div>
      <p
        className="flex h-14 flex-row items-center border-t border-black text-base text-black"
        //  className="m-1 flex max-w-sm items-center justify-center rounded-sm border-t bg-black px-2 py-[7px] text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:px-5 sm:py-2.5"
      >
        <p className="flex w-full pl-2">
          <span className="text-sm font-medium sm:text-lg">
            Rp{" "}
            {product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
        </p>
      </p>
    </div>
  );
}

export default ProductCard;
