import { api } from '~/utils/api';

export const useDeleteProduct = () => {
  const createProductMutation = api.product.delete.useMutation();

  const deleteProduct = async (id:any) => {
    try {
       await createProductMutation.mutateAsync({ id });
    
    } catch (error) {
      // Handle error if needed
      console.error('Failed to delete product:', error);
    }
  };

  return deleteProduct;
};
