import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

export const useUpdateProduct = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return api.product.update.useMutation({
    onSuccess() {
      toast({
        title: "Product updated succesfully",
      });
      queryClient.invalidateQueries(getQueryKey(api.product.getAllProductById));
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    },
  });
};
