import { Link } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { FilterSidebar } from "~/components/home/filter-sidebar";
import Footer from "~/components/home/footer";
import ProductList from "~/components/home/product-list";
import ProductLayout from "~/components/product/product-layout";
import { useSearchProduct } from "~/hooks/useSearchProduct";

function index() {
  const router = useRouter();
  const { search } = router.query;

  const { products, isLoading, status } = useSearchProduct(search as string);

  return (
    <>
      <ProductLayout isFilterSidebarOn={true}>
        <ProductList products={products} isLoading={isLoading} />
      </ProductLayout>
      <Footer />
    </>
  );
}

export default index;
