import { api } from "~/utils/api";

export const useAddToCart = () => {
  const add = api.product.addToCart.useMutation();

  const addToCart = async ({ productId }: any) => {
    console.log(productId);
    try {
      await add.mutateAsync({ productId });
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return addToCart;
};
