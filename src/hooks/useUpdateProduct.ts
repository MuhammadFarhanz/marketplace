import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

export const useUpdateProduct = () => {
  const { toast } = useToast();

  return api.product.update.useMutation({
    onSuccess() {
      toast({
        title: "Product updated succesfully",
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
