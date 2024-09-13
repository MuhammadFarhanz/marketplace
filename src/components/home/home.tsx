import Head from "next/head";
import { api } from "~/utils/api";
import Select from "react-select";
import ProductCard from "~/components/product/product-card";
import Link from "next/link";
import { sortOptions } from "~/constants/sortOptions";
import Marquee from "react-fast-marquee";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDownIcon, DollarSign, Star } from "lucide-react";
import { useState } from "react";
import { FilterSidebar } from "./filter-sidebar";
import ProductList from "./product-list";
import Footer from "./footer";
import ProductLayout from "../product/product-layout";

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
      className="font-base border-y-2 border-y-black bg-white py-3 sm:py-5"
      direction="left"
    >
      {Array(10)
        .fill("xd")
        .map((x, id) => {
          return (
            <div className="flex items-center" key={id}>
              <span className="font-heading mx-10 text-xl sm:text-2xl lg:text-4xl">
                Neobrutalism components
              </span>
              <img
                className="w-[35px] sm:w-[45px]"
                src={"/assets/star3.svg"}
                alt="star"
              />
            </div>
          );
        })}
    </Marquee>
  );
};

const SortBy = () => {
  const [sortOption, setSortOption] = useState("custom");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-muted"
        >
          <span>
            {sortOption === "custom" ? "Custom" : sortOption.replace("-", ": ")}
          </span>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 rounded-md bg-background text-foreground shadow-lg">
        <DropdownMenuRadioGroup
          value={sortOption}
          onValueChange={setSortOption}
        >
          <DropdownMenuRadioItem value="custom">Custom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price-asc">
            Price: Low to High
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="price-desc">
            Price: High to Low
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="rating-desc">
            Rating: High to Low
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function ProductPage() {
  const { data: products, isLoading } = api.product.getAll.useQuery();

  return (
    <>
      <ProductLayout className="min-h-auto">
        <ProductList products={products} isLoading={isLoading} />
      </ProductLayout>
      <Footer />
    </>
  );
}

export default ProductPage;
