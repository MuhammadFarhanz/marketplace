import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

export const useCreateProduct = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return api.product.create.useMutation({
    onSuccess() {
      toast({
        title: "Product created succesfully",
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
