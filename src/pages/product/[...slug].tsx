import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "~/components/home/footer";
import ProductDetails from "~/components/product/ProductDetails";
import { useGetProductById } from "~/hooks/useGetProductById";

const ProductView: NextPage = () => {
  const { data, error } = useGetProductById();
  const [mainImage, setMainImage] = useState<string | undefined>(
    data?.image[0]?.url
  );

  useEffect(() => {
    if (data && data.image.length > 0) {
      setMainImage(data.image[0]?.url);
    }
  }, [data]);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#E9E9E9]">
        Loading...
      </div>
    ); // Replace with your loading UI
  }

  const handleThumbnailClick = (thumbnailUrl: string) => {
    setMainImage(thumbnailUrl);
  };

  return (
    <>
      <Head>
        <title>View Product</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-custom flex min-h-screen flex-col">
        <div className="container m-4 mx-auto sm:mt-10">
          <ProductDetails
            product={data}
            mainImage={mainImage}
            onThumbnailClick={handleThumbnailClick}
          />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ProductView;
