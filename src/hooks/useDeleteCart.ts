import { api } from "~/utils/api";

export const useDeleteCart = () => {
  const mutation = api.product.deleteCart.useMutation();

  const deleteCart = async (id: any) => {
    console.log(id, "anjir");
    try {
      await mutation.mutateAsync({ productId: id });
      console.log(" deleted from the cart");
    } catch (error) {
      console.error("Failed to delete cart items:", error);
    }
  };

  return {
    deleteCart,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

// import { api } from '~/utils/api';

// export const useDeleteProduct = () => {
//   const createProductMutation = api.product.delete.useMutation();

//   const deleteProduct = async (id:any) => {
//     try {
//        await createProductMutation.mutateAsync({ id });

//     } catch (error) {
//       // Handle error if needed
//       console.error('Failed to delete product:', error);
//     }
//   };

//   return deleteProduct;
// };
