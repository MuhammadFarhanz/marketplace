import { api } from "~/utils/api";

export const useCreateProduct = () => {
  const createProductMutation = api.product.create.useMutation();

  const createProduct = async (productData: any) => {
    console.log(productData);
    try {
      await createProductMutation.mutateAsync(productData);
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return createProduct;
};
