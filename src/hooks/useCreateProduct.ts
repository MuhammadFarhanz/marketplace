// import { api } from "~/utils/api";

// export const useCreateProduct = () => {
//   const { isSuccess, mutateAsync } = api.product.create.useMutation();

//   const createProduct = async (productData: any) => {
//     try {
//       await mutateAsync(productData);
//     } catch (error) {
//       console.error("Failed to create product:", error);
//     }
//   };

//   return { createProduct, isSuccess };
// };

import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

export const useCreateProduct = () => {
  const { toast } = useToast();

  return api.product.create.useMutation({
    onSuccess() {
      toast({
        title: "Product created succesfully",
      });
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    },
  });
};
