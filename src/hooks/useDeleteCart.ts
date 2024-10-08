import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

export const useDeleteCart = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return api.product.deleteCart.useMutation({
    onSuccess() {
      toast({
        title: "Product deleted succesfully",
      });
      queryClient.invalidateQueries(getQueryKey(api.product.getCart));
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    },
  });
};
