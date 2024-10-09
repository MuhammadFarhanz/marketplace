import { api } from "~/utils/api";
import Select from "react-select";
import { sortOptions } from "~/constants/sortOptions";
import Marquee from "react-fast-marquee";
import ProductList from "./product-list";
import Footer from "./footer";
import ProductLayout from "../product/product-layout";
import { Separator } from "../ui/separator";

const SortBySelect = () => (
  <div className="absolute ml-auto w-60 bg-black">
    <Select
      options={sortOptions}
      placeholder="Sort by"
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: "1px solid black",
          boxShadow: "none",
          "&:hover": {
            border: "1px solid black",
          },
          transform: "translateX(-2px) translateY(-2px)",
          borderRadius: 0,
          backgroundColor: "#E9E9E9",
        }),
      }}
      isSearchable
      maxMenuHeight={5 * 40}
    />
  </div>
);

const Marque = () => {
  return (
    <Marquee
      className="font-base hidden border-y-2 border-y-black bg-black py-3 text-white sm:block sm:py-5"
      direction="left"
    >
      {Array(10)
        .fill("xd")
        .map((x, id) => {
          return (
            <div className="flex items-center" key={id}>
              <span className="font-heading mx-10 text-xl sm:text-2xl lg:text-4xl">
                Unbeatable Finds
              </span>
              <Star1Icon />
            </div>
          );
        })}
    </Marquee>
  );
};

function Star1Icon() {
  return (
    <svg
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12"
    >
      <path
        d="M37.1666 0.399963L37.1738 37.4635L51.3643 3.22402L37.1873 37.4691L63.4002 11.2663L37.1975 37.4793L71.4426 23.3023L37.2031 37.4928L74.2666 37.5L37.2031 37.5071L71.4426 51.6976L37.1975 37.5206L63.4002 63.7335L37.1873 37.5308L51.3643 71.7759L37.1738 37.5365L37.1666 74.6L37.1595 37.5365L22.969 71.7759L37.146 37.5308L10.933 63.7335L37.1358 37.5206L2.89071 51.6976L37.1301 37.5071L0.0666504 37.5L37.1301 37.4928L2.89071 23.3023L37.1358 37.4793L10.933 11.2663L37.146 37.4691L22.969 3.22402L37.1595 37.4635L37.1666 0.399963Z"
        stroke="#F4F4F0"
        //  stroke="#ffb2ef"
        stroke-width="2.47333"
      />
    </svg>
  );
}

const TopPicksSection = () => (
  <div className="hidden bg-[#F4F4F0] p-3 pt-10 sm:block">
    <div className="container p-0">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold tracking-wide text-black">
          Top picks
        </h1>
        <img
          className="w-[30px] sm:w-[30px]"
          src="/assets/icon_arrow.svg"
          alt="arrow icon"
        />
      </div>
      <Separator className="mt-3 bg-black" />
    </div>
  </div>
);

const HeroSection = () => (
  <div className="relative hidden h-[75vh] bg-[#F4F4F0] p-14 sm:block">
    <div className="absolute left-0 top-0 m-10 w-1/2 text-base font-medium">
      <img
        className="w-[35px] sm:w-[45px]"
        src="/assets/star3.svg"
        alt="star icon"
      />
    </div>
    <div className="absolute right-0 top-0 m-10">
      {new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Jakarta" })},
      Jakarta Indonesia
    </div>
    <div className="absolute bottom-0 left-0 p-10">
      <h1 className="text-8xl font-bold tracking-wide text-black">
        Discover. List. Trade.
      </h1>
      <h1 className="text-8xl font-bold tracking-wide text-black">
        Your Marketplace for Everything.
      </h1>
    </div>
  </div>
);

function ProductPage() {
  const { data: products, isLoading } = api.product.getAll.useQuery();

  return (
    <>
      <HeroSection />
      <div className="hidden sm:block">
        <Marque />
      </div>
      <TopPicksSection />
      <ProductLayout className="min-h-screen">
        <ProductList products={products} isLoading={isLoading} />
      </ProductLayout>
      <Footer />
    </>
  );
}

export default ProductPage;
